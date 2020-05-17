function checkDateIsValid(date: Date) {
  const time = date.getTime();
  if(isNaN(time)) {
    return false;
  }
  return true;
}

export default checkDateIsValid;
