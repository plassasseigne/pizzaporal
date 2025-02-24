/**
 * Converts a day of the week between its full name and its abbreviated form.
 * 
 * @param {string} day - The day to convert. Can be a full name (e.g., "Monday") or an abbreviation (e.g., "L").
 * @returns {string} - The converted day. If the input is a full name, returns the abbreviation. If the input is an abbreviation, returns the full name.
 */
function convertDay(day) {
  const days = {
    "L": "Monday",
    "M": "Tuesday",
    "ME": "Wednesday",
    "J": "Thursday",
    "V": "Friday",
    "S": "Saturday",
    "D": "Sunday"
  }

  for (const [key, value] of Object.entries(days)) {
    if (day === value) {
      return key;
    } else if (day === key) {
      return value;
    }
  }  
}

module.exports = convertDay;