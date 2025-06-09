function getDateTimeNow() {
  return new Date().toISOString();
}

/**
 * Only the string values '1' and '0' are allowed; others will return undefined
 * @param {*} key
 * @returns boolean
 */
function getBooleanFromQueryParam(key) {
  const map = { 1: true, 0: false };
  return map[key];
}

export { getDateTimeNow, getBooleanFromQueryParam };
