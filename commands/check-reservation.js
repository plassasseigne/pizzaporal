const { parseReservations } = require("../utils/parser");
const colors = require("colors");
const formattingText = require("../utils/formatting-text");

function checkReservation(program) {
  program
    .command("checkreservation", "Returns the table(s) associated with the name of the reservation")
    .argument("<name>", "Name of the reservation")
    .action(({ logger, args }) => {
      const reservations = parseReservations();
      const name = args.name;
      const results = [];

      for (const group of reservations) {
        for (const reservation of group.reservations) {
          if (reservation.name === name) {
            results.push(reservation);
          }
        }
      }

      let reservationsFound = "";
      
      for (const reservation of results) {
        reservationsFound += colors.white(`- ${colors.green(reservation.table)} for ${colors.green(reservation.people)} people, ${colors.green(reservation.dayTime)} \n`);
      }

      if (results.length === 0) {
        logger.error(
          formattingText(
            colors.red(`No reservations associated with the name ${colors.bold(name)}.`) + "\n"
          )
        );
      } else {
        logger.info(
          formattingText(
            `Reservations found for ${colors.yellow.bold(name)} :` + "\n" +
            reservationsFound
          )
        );
      }
    })
}

module.exports = checkReservation;