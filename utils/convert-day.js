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