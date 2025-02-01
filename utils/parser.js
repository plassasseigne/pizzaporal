const fs = require("fs");
const path = require("path");

/**
 * Get the content of the reservation file from the data folder located
 * at ./data/reservation.rps
 *
 * @returns {string} The raw content of the reservation file
 */
function parseGetFile() {
  const filePath = path.join(__dirname, "..", "data", "reservation.rps");
  let rawData;

  try {
    rawData = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`\n[ERROR] Unable to open reservation file at ${filePath}.`);
    console.error(`[DETAILS] ${error.message}`);

    process.exit(1);
  }

  return rawData;
}

/**
 * Parse the raw text of reservations and return an array of objects
 *
 * @returns {string[]} An array of every reservations grouped
 */
function parseReservations() {
  const rawData = parseGetFile();
  const lines = rawData.split(/\r?\n/);
  const results = [];
  let currentGroup = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("+GRP")) {
      const groupId = trimmed.slice(1);
      currentGroup = {
        group: groupId,
        reservations: [],
      };
      results.push(currentGroup);
    } else {
      let reservationLine = trimmed;

      if (reservationLine.startsWith("1,")) {
        reservationLine = reservationLine.substring(2);
      }

      if (reservationLine.endsWith("//")) {
        reservationLine = reservationLine.slice(0, -2);
      }

      const dataObj = {};

      let zMatch = null;
      const zRegex = /Z=([^,]+(?:,[^,]+)*)/;

      zMatch = zRegex.exec(reservationLine);

      if (zMatch) {
        dataObj.z = zMatch[1];
        reservationLine = reservationLine.replace(zMatch[0], "");

        if (reservationLine.endsWith(",")) {
          reservationLine = reservationLine.slice(0, -1);
        }
      }

      const parts = reservationLine.split(",");

      for (const part of parts) {
        const match = part.match(/^([PDNT])=(.*)$/);

        if (match) {
          dataObj[match[1]] = match[2];
        }
      }

      const reservationObj = {
        people: parseInt(dataObj.P, 10) || null,
        dayTime: dataObj.D || null,
        name: dataObj.N || null,
        table: dataObj.T || null,
        pizzas: [],
      };

      if (dataObj.z) {
        const rawPizzas = dataObj.z.split(",");
        reservationObj.pizzas = rawPizzas.map((pizza) => {
          const [pizzaName, qtyStr] = pizza.trim().split(/\s+x/);

          return {
            name: pizzaName.trim(),
            quantity: parseInt(qtyStr, 10),
          };
        });
      }

      if (currentGroup) {
        currentGroup.reservations.push(reservationObj);
      }
    }
  }

  return results;
}

module.exports = {
  parseReservations,
};
