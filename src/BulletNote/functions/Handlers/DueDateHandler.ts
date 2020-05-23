import checkDateIsValid from "lib/checkDateIsValid";

export const dueDateJoinStr = '-';
export const dueDateRegExp = new RegExp(`#due(${dueDateJoinStr}\\d{1,2})+`, 'g');

class DueDateHandler {
  static getDueDateTagFromTagList(tags: string[]) {
    const res = tags.find(t => t.match(dueDateRegExp));
    return res;
  }

  static getYearMonthDateStr({
    year, month, date
  }: {
    year: string
    month: string
    date: string
  }) {
    const res = `${year}/${month}/${date}`;
    return res;
  }

  static getHoursMinsStr({
    hours, mins
  }: {
    hours: string
    mins: string
  }) {
    if(!hours || !mins) {
      return '';
    }
    const res = `${hours}:${mins}`;
    return res;
  }

  static handleDueDateTagStr(dueDateTagStr: string) {
    const year = String((new Date()).getFullYear());
    const splitStr = dueDateTagStr.split(dueDateJoinStr);

    const month = splitStr[1];
    const date = splitStr[2];
    const hours = splitStr[3];
    const mins = splitStr[4];

    const ymd = this.getYearMonthDateStr({
      year, month, date
    });
    const hm = this.getHoursMinsStr({
      hours, mins
    });

    const dateStr = `${ymd} ${hm}`;

    return dateStr;
  }

  static convertTagsToDate(tags: string[]): Date | undefined {
    let res = undefined;
    const tagStr = this.getDueDateTagFromTagList(tags);

    if(!tagStr) {
      return res;
    } else {
      const dateStr = this.handleDueDateTagStr(tagStr);
      const dateObj = new Date(dateStr);
      const dateIsValid = checkDateIsValid(dateObj);
      if(dateIsValid) {
        res = dateObj;
      }
      return res;
    }
  }
}

export default DueDateHandler;