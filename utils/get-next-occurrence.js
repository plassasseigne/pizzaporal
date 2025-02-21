// mapping the day letter with the ical day format
const dayMapping = {
  L: 1,
  M: 2,
  ME: 3,
  J: 4,
  V: 5,
  S: 6,
  D: 0,
};

/**
 * Get the date of the next day corresponding to the given letter and time.
 * 
 * @param {string} dayCode Reservation day
 * @param {string} time Reservation time in format "HH:MM"
 * @returns {Date} The occurrence date of the reservation day
 */
function getNextOccurrence(dayCode, time) {
  const targetDow = dayMapping[dayCode];
  const now = new Date();
  const [hour, minute] = time.split(":").map(Number);
  let targetDate = new Date(now);

  targetDate.setHours(hour, minute, 0, 0);

  let diff = targetDow - now.getDay();
  if (diff < 0 || (diff === 0 && targetDate <= now)) {
    diff += 7;
  }

  targetDate.setDate(now.getDate() + diff);

  return targetDate;
}

module.exports = getNextOccurrence;