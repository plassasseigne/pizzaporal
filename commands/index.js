const checkReservation = require("./check-reservation");
const getPizza = require("./get-pizza");

module.exports = (program) => {
  checkReservation(program);
  getPizza(program);
}