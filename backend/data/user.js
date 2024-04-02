const bcrypt = require("bcryptjs");

const user = [
  {
    name: "Admin",
    email: "example@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = user;
