## FinAPI - API Financeira 🚀 💸

### Requisitos

 - [x] Deve ser possível criar uma conta
 - [x] Deve ser possível buscar o extrato bancário do cliente
 - [x] Deve ser possível realizar um depósito
 - [x] Deve ser possível realizar um saque
 - [x] Deve ser possível buscar o extrato bancário do cliente por data
 - [x] Deve ser possível atualizar dados da conta do cliente
 - [x] Deve ser possível obter dados da conta do cliente
 - [x] Deve ser possível deletar uma conta
 - [x] Deve ser possível retonar o balance;

### Regras de negócio

 - [x] Não deve ser possível cadastrar uma conta com CPF já existente
 - [x] Não deve ser possível fazer depósito em uma conta não existente
 - [x] Não deve ser possível buscar extrato em uma conta não existente
 - [x] Não deve ser possível fazer saque em uma conta não existente
 - [x] Não deve ser possível excluir uma conta não existente
 - [x] Não deve ser possível fazer saque quando o saldo for insuficiente
 
 
 ### Descrição do projeto.
 
 ##### Aplicação de finanças desenvolvida  com o para praticar os conceitos dos métodos HTTP de NodeJS utilizando Express, da qual não foi utilizada de nenhum banco de dados no momento, os usuários e suas respectivas movimentações de finança estão sendo armazenadas em arrays em tempo de execução.
 
 ###Instalação
 
 ```
 $ yarn install
 
 or
 
$ npm install

```

### Para startar a Aplcação.

 ```
 $ yarn dev
 
 or
 
$ npm run dev

```

###Rotas

|Rota  | Método HTTP | Parâmetros | Descrição
|:---|:---:|:---:|:---:|
|`/account` | GET | Header com `CPF `| Cria uma nova conta para o usuário.
|`/statement` | GET | Header com `CPF ` | Lista a movimentação nas constas do usuário.
|`/deposit` | POST | Header com `CPF `  e Body com `description` e `amount`| Cria um novo objeto referente à um depósito nos Statements do Usuário.
|`/withdraw` | POST | Header com `CPF `  e Body com `description` e `amount`| Cria um novo objeto referente à um saque nos Statements do Usuário.
|`/statement/data` | GET | Header com `CPF `  e  com `Date`  nos query params | Lista a movimentação de saques e depósitos de uma data um usuário em uma data específica.
|`/account` | PUT | Header com `CPF `  e  body com `Name`  | Altera o nome de um determinado usuário.
|`/account` | GET | Header com `CPF ` | Lista um usuário específico.
|`/account` | DELETE | Header com `CPF ` | Deleta um usuário específico.



