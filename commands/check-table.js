const formattingText = require("../utils/formatting-text");
const colors = require("colors");
const parseReservations = require("../utils/parser");
const convertDay = require("../utils/convert-day");

/**
 * Returns the details of a table with its reserved slots.
 *
 * @param {string} args.table - The number of the table to check.
 * 
 * @example
 * node bin/cli.js checktable 9
 */
function checkTable(program) {
  program
    .command("checktable", "Returns the details of a table with its reserved slots")
    .argument("<table>", "The number of the table")
    .action(({ logger, args }) => {
      const reservations = parseReservations();
      const table = args.table;
      const results = [];

      for (const group of reservations) {
        for (const reservation of group.reservations) {
          if (reservation.table.includes(table)) {
            results.push(reservation);
          }
        }
      }

      let reservationsFound = "";
      
      for (const reservation of results) {
        let [ day, time ] = reservation.dayTime.split(" ");
        day = convertDay(day);

        reservationsFound += colors.white(`- ${colors.green(day)} at ${colors.green(time)} for ${colors.green(reservation.name)}. \n`)
      }

      // TODO : sort in order the days of the week

      if (results.length === 0) {
        logger.error(
          formattingText(
            colors.red(`No reservations associated with the ${colors.bold("TABLE " + table)}.`) + "\n"
          )
        )
      } else {
        logger.info(
          formattingText(
            `The reserved slots for the ${colors.bold.yellow("TABLE " + table)} :` + "\n" +
            reservationsFound
          )
        )
      }
    })
} 

module.exports = checkTable;