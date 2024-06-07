import moment from 'moment-timezone';
  
  // Email validation regex pattern
export let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



export const TimezoneList = () => {
   const tzNames = moment.tz.names();
  return tzNames ? tzNames : [];
 };

