const colors = require("colors");

function formattingText(text) {
  return "\n" +
    colors.yellow("──────────────────── [ " + colors.bold("Pizzaporal 🍕") + " ] ────────────────────") + "\n" +
    "\n" +
    text +
    "\n" +
    colors.yellow("───────────────────────────────────────────────────────────") + "\n"
}

module.exports = formattingText;