const checkReservation = require("./check-reservation");
const getPizza = require("./get-pizza");
const addReservation = require("./add-reservation");

module.exports = (program) => {
  checkReservation(program);
  getPizza(program);
  addReservation(program);
}