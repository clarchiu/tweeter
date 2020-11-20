/*
 * Utility functions for the client
 */

/**
 * Returns a string of the amount of time (to the closest unit 
 * i.e. year, month, day etc) that has elapsed since the passed 
 * in date until the present
 * @param {Date} date 
 */
const getTimeSince = (date) => {
  const ONE_MINUTE = 1000 * 60;
  const ONE_DAY    = ONE_MINUTE * 60 * 24;

  const diff       = Date.now() - date;
  const diffMin    = Math.round(diff / ONE_MINUTE);
  const diffHours  = Math.floor(diffMin / 60);
  const diffDays   = Math.round(diff / ONE_DAY);
  const diffMonths = Math.floor(diffDays / 31);
  const diffYears  = Math.floor(diffDays / 365);

  return diffMin    < 60 ? `${diffMin} minutes` : 
        (diffHours  < 24 ? `${diffHours} hours` :
        (diffDays   < 31 ? `${diffDays} days` :
        (diffMonths < 12 ? `${diffMonths} months` : `${diffYears} years`)));
};