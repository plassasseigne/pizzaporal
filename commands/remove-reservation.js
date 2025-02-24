const { select, confirm } = require('@inquirer/prompts');
const fs = require("fs");
const parseReservations = require("../utils/parser");
const fromDataToRps = require("../utils/from-data-to-rps");
const formattingText = require("../utils/formatting-text");
const colors = require("colors");
const path = require("path");

/**
 * Removes a reservation from the reservation file.
 * 
 * @example
 * node bin/cli.js removereservation
 */
function removeReservation(program) {
  program
    .command("removereservation", "Remove a reservation from the reservatiion file.")
    .action(async ({ logger }) => {
      const filePath = path.join(__dirname, "..", "data", "reservation.rps");
      const reservations = parseReservations();

      const allReservations = [];
      for (let g = 0; g < reservations.length; g++) {
        for (let r = 0; r < reservations[g].reservations.length; r++) {
          const current = reservations[g].reservations[r];
          allReservations.push({
            groupId: g,
            reservationId: r,
            name: current.name,
            dayTime: current.dayTime,
            table: current.table,
            people: current.people,
            pizzas: current.pizzas
          });
        }
      }

      const reservationChoices = allReservations.map((reservation, i) => {
        return {
          name: `${reservation.name}, ${reservation.dayTime}, ${reservation.table}, ${reservation.people} people`,
          value: i
        }
      })

      const reservationSelect = await select({
        message: "Which reservation do you want to delete ?",
        choices: reservationChoices
      });

      const selectedIndex = Number(reservationSelect);
      const { groupId, reservationId } = allReservations[selectedIndex];

      const removeConfirm = await confirm({
        message: "Are you sure you want to delete the reservation ?",
        default: false
      });

      if (removeConfirm) {
        try {
          reservations[groupId].reservations.splice(reservationId, 1);

          const updatedContent = fromDataToRps(reservations);
          fs.writeFileSync(filePath, updatedContent, "utf-8");

          const removedReservation = allReservations[selectedIndex];

          logger.info(
            formattingText(
              colors.yellow(`The reservation ${colors.bold(removedReservation.name)}, for ${colors.bold(removedReservation.dayTime)} and with ${colors.bold(removedReservation.people)} people has been removed.`) + "\n"
            )
          )
        } catch(error) {
          console.log(error);
        }
      } else {
        logger.info(
          formattingText(
            colors.yellow("The deletion was canceled.") + "\n"
          )
        )
      }
    })
}

module.exports = removeReservation;