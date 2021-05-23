export default function howMuchTimeHasPassed(date) {
  const now = new Date().getTime();

  const differentTime = now - new Date(date);
  const countYears = Math.floor(differentTime / (1000 * 60 * 60 * 24 * 365));

  let countMonth = differentTime % (1000 * 60 * 60 * 24 * 365);
  countMonth = Math.floor(countMonth / (1000 * 60 * 60 * 24 * 30));
  
  let countDays = differentTime % (1000 * 60 * 60 * 24 * 30);
  countDays = Math.floor(countDays / (1000 * 60 * 60 * 24));

  let countHours = differentTime % (1000 * 60 * 60 * 24);
  countHours = Math.floor(countHours / (1000 * 60 * 60));
    
  let countMinutes = differentTime % (1000 * 60 * 60);
  countMinutes = Math.floor(countMinutes / (1000 * 60));

  //------------------------------------------

  let years = '';
  let months = '';
  let days = '';
  let hours = '';
  let minutes = '';

  if (countYears) {
    if (countYears === 1) {
      years = 'one year';
    }
    else {
      years = `${countYears} years`;
    }
  }

  if (countMonth) {
    if (countMonth === 1) {
      months = ' one month';
    }
    else {
      months = ` ${countMonth} monthes`;
    }
  }

  if (countDays) {
    if (countDays === 1) {
      days = ' one day';
    }
    else {
      days = ` ${countDays} days`;
    }
  }

  if (countHours) {
    if (countHours === 1) {
      hours = ' one hour';
    }
    else {
      hours = ` ${countHours} hours`;
    }
  }

  if (countMinutes) {
    if (countMinutes === 1) {
      minutes = ' one minute';
    }
    else {
      minutes = ` ${countMinutes} minutes`;
    }
  }

  //------------------------------------------

  if (countYears) {
    return `${years} ${months} ${days} ago`;
  }

  if (countMonth) {
    return `${months} ${days} ago`;
  }

  if (countDays) {
    return `${days} ${hours} ago`;
  }

  if (countHours) {
    return `${hours} ${minutes} ago`;
  }

  if (countMinutes) {
    return `${minutes} ago`;
  }

  return 'less than a minute ago';
}