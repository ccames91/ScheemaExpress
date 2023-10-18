require("dotenv").config();
const express = require('express');
const routes = require('./fantastic-umbrella/Develop/routes'); // Check the path
const sequelize = require('./fantastic-umbrella/Develop/config/connection'); // Check the path

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
