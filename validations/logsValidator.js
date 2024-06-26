const validateLog = (log) => {
  const {
    captainName,
    title,
    post,
    mistakesWereMadeToday,
    daysSinceLastCrisis,
  } = log;

  // Logging the input to debug
  console.log('Validating log:', log);

  if (
    !captainName ||
    !title ||
    !post ||
    typeof mistakesWereMadeToday !== 'boolean' ||
    typeof daysSinceLastCrisis !== 'number' ||
    daysSinceLastCrisis < 0
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
