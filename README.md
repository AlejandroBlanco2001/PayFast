# PayFast-Backend
Project backend for PayFast, the final project for Diseño de Software II made with Typescript, NodeJS and Express

# ¿How to run the project?

## Prerequisites
- MySQL database
- Backend section

## Steps

### Install dependencies
1. Inside each service run `npm install`

### Database configuration
2. Get inside each service and change the connection string in the .env file
    `mysql://root:password@host:port/database?schema=database`
3. Run in the cmd `npx prisma migrate dev`


