/**
 * Module that initializes and registers all command handlers.
 * 
 * @requires ./check-reservation
 * @requires ./get-pizza
 * @requires ./add-reservation
 * @requires ./generate-ical
 * @requires ./check-table
 * @requires ./remove-reservation
 */
const checkReservation = require("./check-reservation");
const getPizza = require("./get-pizza");
const addReservation = require("./add-reservation");
const generateICal = require("./generate-ical");
const checkTable = require("./check-table");
const removeReservation = require("./remove-reservation");

module.exports = (program) => {
  checkReservation(program);
  getPizza(program);
  addReservation(program);
  removeReservation(program);
  generateICal(program);
  checkTable(program);
}