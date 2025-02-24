const colors = require("colors");

/**
 * Formats the given text with decorative borders and a title.
 *
 * @param {string} text - The text to be formatted.
 * @returns {string} - The formatted text with decorative borders and a title.
 */
function formattingText(text) {
  return "\n" +
    colors.yellow("──────────────────── [ " + colors.bold("Pizzaporal 🍕") + " ] ────────────────────") + "\n" +
    "\n" +
    text +
    "\n" +
    colors.yellow("───────────────────────────────────────────────────────────") + "\n"
}

module.exports = formattingText;