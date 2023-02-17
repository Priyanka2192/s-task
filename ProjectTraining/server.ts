const app = require("./app");
// port
const PORT = process.env.PORT || 8080;
const moduleA = require('package1');
console.log(moduleA);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});