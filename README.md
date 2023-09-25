# vigi-node

## Set up the database configurations. 

Change the db user name and password to your mysql when initializing Sequelize in index.js

Change the config/config.json file and add in your mysql username and password.

## Once mysql is set up, you can run the application with:

npx sequelize-cli db:create

npx sequelize-cli db:migrate

node index.js
