const app = require('./app');

const accounts = require("./routes/accounts");

app.use("/accounts", accounts);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;