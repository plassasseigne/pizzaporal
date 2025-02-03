const checkReservation = require("./check-reservation");
const getPizza = require("./get-pizza");
const addReservation = require("./add-reservation");
const generateICal = require("./generate-ical");

module.exports = (program) => {
  checkReservation(program);
  getPizza(program);
  addReservation(program);
  generateICal(program);
}