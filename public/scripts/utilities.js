/*
 * Utility functions for the client
 */

/**
 * Returns a string of the amount of time (to the closest unit
 * i.e. year, month, day etc) that has elapsed between date and the present
 * @param {Date} date
 */
const getTimeSince = (date) => {
  const diffMS     = Date.now() - date;
  const diffSec    = Math.floor(diffMS / 1000);
  const diffMin    = Math.floor(diffSec / 60);
  const diffHours  = Math.floor(diffMin / 60);
  const diffDays   = Math.round(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 31);
  const diffYears  = Math.floor(diffDays / 365);

  return diffSec    < 60 ? `${diffSec} second(s)` :
        (diffMin    < 60 ? `${diffMin} minute` :
        (diffHours  < 24 ? `${diffHours} hour` :
        (diffDays   < 31 ? `${diffDays} day` :
        (diffMonths < 12 ? `${diffMonths} month` : `${diffYears} year`))))
          + "(s)";
};