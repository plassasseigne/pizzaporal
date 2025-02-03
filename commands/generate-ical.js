const formattingText = require("../utils/formatting-text");
const getNextOccurrence = require("../utils/get-next-occurrence");
const parseReservations = require("../utils/parser");
const { createEvents } = require("ics");
const fs = require("fs");
const colors = require("colors");

function generateICal(program) {
  program
    .command("generateical", "Generates an icalendar file from the name of one or more reservations.")
    .argument("<name>", "Name of the reservation")
    .option("--output [output]", "Output path for icalendar file.")
    .action(({ logger, args, options }) => {
      const reservations = parseReservations();
      const clientReservations = [];

      for (const group of reservations) {
        for (const reservation of group.reservations) {
          if (reservation.name === args.name) {
            clientReservations.push(reservation);
          }
        }
      }

      if (clientReservations.length === 0) {
        logger.error(
          formattingText(
            colors.red(`No reservations associated with the name ${colors.bold(args.name)}.`) + "\n"
          )
        );
        return;
      }

      const eventsWithDates = clientReservations.map((reservation) => {
        const [ day, time ] = reservation.dayTime.split(" ");

        const startDate = getNextOccurrence(day, time);
        const startArray = [
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          startDate.getDate(),
          startDate.getHours(),
          startDate.getMinutes(),
        ];

        const event = {
          start: startArray,
          duration: { hours: 2 },
          title: `Pizzaporal reservation - Table ${reservation.table}`,
          description: `Reservation for ${reservation.people} people with the name ${reservation.name}.`,
          location: "Pizzaporal"
        };

        return { event, startDate };
      });

      eventsWithDates.sort((a, b) => a.startDate - b.startDate);
      const events = eventsWithDates.map(item => item.event);

      createEvents(events, (error, value) => {
        if (error) {
          logger.error(
            formattingText(
              colors.red(`An error was encountered while creating the iCal file: ${error.message} \n`)
            )
          );
          return;
        }

        const outputPath = options.output || "../reservation.ics";
        try {
          fs.writeFileSync(outputPath, value, "utf8");
          logger.info(
            formattingText(
              colors.yellow(`ICal file created at : ${colors.bold(outputPath)} \n`)
            )
          );
        } catch (err) {
          logger.error(
            formattingText(
              colors.red(`An error was encountered while creating the iCal file: \n${err.message} \n`)
            )
          );
        }
    });
  })
}

module.exports = generateICal;
