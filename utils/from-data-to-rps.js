function fromDataToRps(reservations) {
  let output = "";

  for (const group of reservations) {
    output += `+${group.group}\n`;
    for (const reservation of group.reservations) {
      const parts = [
        "1",
        `P=${reservation.people}`,
        `D=${reservation.dayTime}`,
        `N=${reservation.name}`,
        `T=${reservation.table}`
      ];

      if (reservation.pizzas.length !== 0) {
        let pizzas = [];

        for (const pizza of reservation.pizzas) {
          pizzas.push(`${pizza.name} x${pizza.quantity}`);
        }

        parts.push(`Z=${pizzas}`);
      }

      output += parts.join(",") + "//\n";
    }
  }

  return output;
}

module.exports = fromDataToRps;