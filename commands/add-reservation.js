const { select, input, confirm } = require('@inquirer/prompts');
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const formattingText = require("../utils/formatting-text");
const convertDay = require('../utils/convert-day');

/**
 * Adds a new reservation to the reservations file.
 *
 * @param {string} args.name - The reservation name.
 * 
 * @example
 * node bin/cli.js addreservation "Doe"
 */
function addReservation(program) {
  program
    .command("addreservation", "Add a new reservation to the reservations file.")
    .argument("<name>", "The reservation name.")
    .action(async ({ logger, args }) => {
      const filePath = path.join(__dirname, "..", "data", "reservation.rps");
      const name = args.name;
      let table = Math.floor(Math.random() * 10);

      if (table === 0) {
        table++;
        table = "TABLE0" + table;
      } else if (table !== 10) {
        table = "TABLE0" + table;
      } else {
        table = "TABLE" + table;
      }

      let orderedPizzas = [];

      const people = await input({
        message: "Number of people :",
        validate: (value) => !isNaN(value) && value > 0 && value < 25 || "Please enter a valid number, between 1 and 25."
      });

      const day = await select({
        message: "Select the desired day :",
        choices: [
          { name: "Monday", value: "L" },
          { name: "Tuesday", value: "M" },
          { name: "Wednesday", value: "ME" },
          { name: "Thursday", value: "J" },
          { name: "Friday", value: "V" },
          { name: "Saturday", value: "S" },
          { name: "Sunday", value: "D" }
        ]
      });

      const hour = await input({
        message: "Choose the desired schedule between 19:00 and 23:00 :",
        validate: (value) => {
          const match = value.match(/\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/);
          if (!match) return "Please enter a valid schedule (HH:MM).";
          const [hours] = value.split(':');

          if (hours < 19 || hours > 23) return "The pizzeria is open from 19:00 to 23:00.";
          return true;
        }
      });

      const commandPizza = await confirm({
        message: "Do you want to command pizza now ?",
        default: false
      });

      if (commandPizza) {
        let addMorePizza = true;
  
        while(addMorePizza) {
          const pizza = await select({
            message: "Choose a pizza :",
            choices: [
              { name: "Hawaïenne", value: "Hawaïenne" },
              { name: "Végétarienne", value: "Végétarienne" },
              { name: "Napolitaine", value: "Napolitaine" },
              { name: "Calzone", value: "Calzone" },
              { name: "QuatreFromages", value: "QuatreFromages" },
              { name: "Pepperoni", value: "Pepperoni" },
              { name: "Margherita", value: "Margherita" },
              { name: "Diavola", value: "Diavola" },
            ]
          });
  
          const quantity = await input({
            message: "How many of that pizza do you want ?",
            validate: (value) => !isNaN(value) && value > 0 || "Please enter a valid number."
          })
  
          orderedPizzas.push({ name: pizza, quantity });

          addMorePizza = await confirm({
            message: "Do you want to add more pizzas ?",
            default: false
          });
        }
      }

      let reservation = `1,P=${people},D=${day} ${hour},N=${name},T=${table}`;
      if (orderedPizzas.length !== 0) {
        reservation += ",Z=" + orderedPizzas.map(i => `${i.name} x${i.quantity}`).join(", ") + "//";
      }

      let pizzaList = "";

      for (const item of orderedPizzas) {
        pizzaList += `  • ${colors.bold.green(item.name + " x" + item.quantity)} \n`;
      }
      
      try {
        fs.appendFileSync(filePath, "\n" + reservation, "utf8");

        logger.info(
          formattingText(
            colors.yellow("Your reservation has been successfully registered : \n \n") +
            colors.white(
              `- Reservation name : ${colors.bold.green(name)} \n` +
              `- People planned : ${colors.bold.green(people)} \n` +
              `- Date : ${colors.bold.green(convertDay(day))} ${colors.bold.green(hour)} \n` +
              `- Assigned table : ${colors.bold.green(table)} \n`
            ) +
            colors.white(orderedPizzas.length !== 0 ? `- Ordered pizzas : \n${pizzaList}` : "")
          )
        );
      } catch (error) {
        logger.error(`\n[ERROR] Unable to add your reservation.`);
        logger.error(`[DETAILS] ${error.message}`);
      }
    });
}

module.exports = addReservation;