// validations/logsValidator.js
const validateLog = (log) => {
  const {
    captainName,
    title,
    post,
    mistakesWereMadeToday,
    daysSinceLastCrisis,
  } = log;

  // Convert daysSinceLastCrisis to a number
  const daysSinceLastCrisisNum = Number(daysSinceLastCrisis);

  // Logging the input to debug
  console.log('Validating log:', log);

  // Check if the conversion was successful and the number is non-negative
  if (
    !captainName ||
    !title ||
    !post ||
    typeof mistakesWereMadeToday !== 'boolean' ||
    isNaN(daysSinceLastCrisisNum) || // Check if it's a valid number
    daysSinceLastCrisisNum < 0
  ) {
    console.log('Validation failed: missing or incorrect type');
    return false;
  }
  if (
    typeof captainName !== 'string' ||
    typeof title !== 'string' ||
    typeof post !== 'string'
  ) {
    console.log('Validation failed: incorrect type for text fields');
    return false;
  }
  console.log('Validation passed');
  return true;
};

module.exports = validateLog;
