# Banking Application

### Application can be accessed at the end point:
banking-0ec5a987413c7f7f.elb.us-west-1.amazonaws.com/

## Feature set

1.Create a User
> A customer can register into the system by signing up into the application

2.Create an Account
>A registered user can create checkings and savings account.

3.Enable Transactions between accounts
> A registered user having an account can create transaction between the accounts.

4. Enable recurring Payments to external accounts
> Users with accounts can setup recurring bill payments or transfers.

5. Refund Amounts when needed
> Only a Admin user can refund amount to any users.

6.Search transactions that occured over a given period of time.
> Customers who have made transactions from their accounts can search for transactions based on transaction type.

7.Close Existing Accounts
> A user can close any of his accounts at any time.


## Design Decisions

1. We selected MySQL Relational Database to store user information and data about transactions because ot the advantages we get from relation databases i.e. transactions.

2. We are maintaing relationships using foreign keys between the tables to avoid redundancy of data. 

3. We are using routing of APIs so that multiple requests related to similar topic are routed properly.

4. We are using connection pooling for database connections to connect to database.

## Architecture Diagram

![Architecture Diagram](https://github.com/gopinathsjsu/team-project-codeaholics/blob/master/Banking%20Architecture%20Diagram.jpg)

## Database Schema Diagram
![Database Schema Diagram](https://github.com/gopinathsjsu/team-project-codeaholics/blob/master/Database%20Schema%20Diagram.png)
