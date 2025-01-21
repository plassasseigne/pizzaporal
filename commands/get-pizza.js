const { parseReservations } = require("../utils/parser");
const colors = require("colors");
const formattingText = require("../utils/formatting-text");
const convertDay = require("../utils/convert-day");

function getPizza(program) {
  program
    .command("getpizza", "Returns pizzas ordered during the week or on a specific day")
    .argument("[day]", "The specific day of the week")
    .action(({ logger, args }) => {
      const reservations = parseReservations();
      const day = args.day;
      let pizzaList = [];

      if (day) {
        const convertedDay = convertDay(day);

        if (convertedDay) {
          for (const group of reservations) {
            for (const reservation of group.reservations) {
              if (reservation.pizzas.length !== 0 && reservation.dayTime.startsWith(convertedDay)) {
                reservation.pizzas.forEach((pizza) => {
                  pizzaList.push(pizza);
                })
              }
            }
          }
        } else {
          logger.error(
            formattingText(
              colors.red(`${colors.bold(day)} is an invalid day. Please use a valid day : \nMonday, Tuedsay, Wednesday, Thurday, Friday, Saturday, Sunday\n`)
            )
          );
          return;
        }
      } else {
        for (const group of reservations) {
          for (const reservation of group.reservations) {
            if (reservation.pizzas.length !== 0) {
              reservation.pizzas.forEach((pizza) => {
                pizzaList.push(pizza);
              })
            }
          }
        }
      }

      if (pizzaList.length !== 0) {
        const newPizzaList = pizzaList.reduce((accumulator, current) => {
          const isInList = accumulator.find(item => item.pizza === current.pizza);
        
          if (isInList) {
            isInList.quantity += current.quantity;
          } else {
            accumulator.push({ ...current });
          }
        
          return accumulator;
        }, []);

        let finalList = "";

        for (const pizza of newPizzaList) {
          finalList += colors.white(`- ${colors.bold(pizza.pizza)} | ${colors.green(pizza.quantity)} ordered \n`);
        }

        logger.info(
          formattingText(
            day ?
              `Pizzas ordered this ${colors.yellow.bold(day)} :` + "\n" + finalList
              : `Pizzas ordered this week :`  + "\n" + finalList
          )
        );
      } else {
        logger.info(
          formattingText(
            `No pizzas ordered this week.\n`
          )
        )
      }
    })
}

module.exports = getPizza;