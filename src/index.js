const { request } = require("express");
const express = require("express");
const { v4: uuidv4  } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

function checkIfExistsCustomer(req, res, next) {
	const { cpf } = req.headers;

	const customer = customers.find((customer) => customer.cpf === cpf);

	if (!customer) {
		res.status(400).json({
			error: "Customer does not exists!"
		});
	}

	req.customer = customer;
	next();
}


const getBalance = (statement) => {
	const total = statement.reduce((total, operation) => {
		if(operation.type === "credit") {
			return total + operation.amount;
		} else {
			return total - operation.amount;
		}
	}, 0);

	return total;
};

app.post("/account", (req, res) => {
	const { cpf, name } = req.body;
	const id = uuidv4();

	const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

	if (customerAlreadyExists) {
		res.status(400).json({
			error: "Customer already exists!"
		});
	}

	customers.push({
		cpf,
		name,
		id,
		statement: []
	});

	return res.status(201).json(customers);
});


app.get("/statement", checkIfExistsCustomer, (req, res) => {
	const { customer } = req;
	return res.status(200).json(customer.statement);
});

app.post("/deposit", checkIfExistsCustomer, (req, res) => {
	const { customer } = req;
	const { amount, description} = req.body;

	const statementOperation = {
		id: uuidv4(),
		description: description,
		amount : amount,
		created_at: new Date(),
		type: "credit" 
	};

	customer.statement.push(statementOperation);

	return res.status(201).json(customer.statement);
});


app.post("/withdraw", checkIfExistsCustomer, (req, res) => {
	const { customer } = req;
	const { description, amount } = req.body;

	const balance = getBalance(customer.statement);

	if (balance < amount) {
		return res.status(400).json({
			error: "Customer has not enough funds!"
		});
	} 

	const statementOperation = {
		id: uuidv4(),
		description: description,
		amount : amount,
		created_at: new Date(),
		type: "debit" 
	};

	customer.statement.push(statementOperation);


	return res.status(201).json(statementOperation);
});

app.get("/statement/data", checkIfExistsCustomer, (req, res) => {
	const { customer } = req;
	const { date } = req.query;

	const dateFormated = new Date(date + " 00:00") ;
  
	const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === dateFormated.toDateString());

	return res.status(200).json(statement);
});


app.put("/account", checkIfExistsCustomer, (req, res) => {
	const { name } = req.body;
	const { customer } = req;
	
	customer.name = name;

	return res.status(201).send();
});

app.get("/account", checkIfExistsCustomer, (req, res) => {
	const { customer } = req;

	return res.status(200).send(customer);
});

app.delete("/account", checkIfExistsCustomer, (req, res) => {
	const { customer } = req;

	customers.splice(customer, 1);

	return res.status(200).json(customers);
});

app.get("/balance", checkIfExistsCustomer, (req, res) => {
	const { customer } = req;

	const balance = getBalance(customer.statement);

	return res.status(200).json({
		Balance: balance
	});
});

app.listen(3333);
