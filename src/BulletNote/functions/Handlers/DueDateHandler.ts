import checkDateIsValid from "lib/checkDateIsValid";
import { MessageItem, TagItem } from "BulletNote/types";
import WeekDatesHandler from "../WeekDatesHandler";
import TagHandlers from "./TagHandlers";

export const dueDateJoinStr = '-';
export const dueDateRegExp = new RegExp(`#due(${dueDateJoinStr}\\d{1,2})+`, 'g');

export const secsPerDay = 60 * 60 * 24;
export const secsPerHour = 60 * 60;
export const secsPerMin = 60;

export interface DueDateRemainTimes {
  days: number
  hours: number
  mins: number
  secs: number
}

class DueDateHandler {
  static dueDateOverDue = '已逾期'

  static addZeroToNumber(num: number) {
    const res = num < 10 ? `0${num}` : `${num}`;
    return res;
  }

  static getDueDateTagFromTagList(tags: string[]) {
    const res = tags.find(t => t.match(dueDateRegExp));
    return res;
  }

  static getYearMonthDateStr({
    year, month, date
  }: {
    year: number
    month: number
    date: number
  }) {
    const res = `${year}/${month}/${date}`;
    return res;
  }
  static getHoursMinsStr({
    hours, mins
  }: {
    hours: number
    mins: number 
  }) {
    if(typeof hours !== 'number' || typeof mins !== 'number') {
      return '';
    }
    const res = `${this.addZeroToNumber(hours)}:${this.addZeroToNumber(mins)}`;
    return res;
  }

  static handleDueDateTagStr(dueDateTagStr: string) {
    const year = Number((new Date()).getFullYear());
    const splitStr = dueDateTagStr
      .split(dueDateJoinStr)
      .map(s => Number(s));

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
  static getMessageItemDueDate(tagList: MessageItem['message']['tagList']) {
    const tags = tagList.map(t => t.name);
    const res = this.convertTagsToDate(tags);
    return res;
  }

  static calRemainTimes(dueDate: Date): DueDateRemainTimes | null {
    const times = dueDate.getTime() - (new Date()).getTime();
    const totalSecs = ~~(times / 1000);
    let remainSecs = totalSecs;

    if(times < 0) {
      return null;
    }
    else {
      const days = ~~(remainSecs / secsPerDay);
      remainSecs -= days * secsPerDay;

      const hours = ~~(remainSecs / secsPerHour);
      remainSecs -= hours * secsPerHour;

      const mins = ~~(remainSecs / 60);
      remainSecs -= mins * secsPerMin;

      const res = {
        days, hours, mins, secs: remainSecs
      };
      return res;
    }
  }
  static handleRemainTimesToStr(dueDateRemainTimes: DueDateRemainTimes | null) {
    let res = '';
    if(dueDateRemainTimes === null) {
      res = this.dueDateOverDue; 
    }
    else {
      const {
        days,
        hours,
        mins,
        secs
      } = dueDateRemainTimes;
      res = `
      ${days}d: 
      ${hours}h: 
      ${mins}m
      `;
    }
    return res;
  }
  static getDueDateRemainTimeStr(dueDate: Date) {
    const dueDateRemainTimes = this.calRemainTimes(dueDate);
    const res = this.handleRemainTimesToStr(dueDateRemainTimes);
    return res;
  }

  static checkMessageItemHaveDueDateAndIsInRange(
    tagList: MessageItem['message']['tagList'],
    isShowOverDueMessages: boolean,
  ) {
    let res = false;

    const dueDate = this.getMessageItemDueDate(tagList);
    if(dueDate) {
      const remainTimes = this.calRemainTimes(dueDate);
      if(remainTimes || isShowOverDueMessages) {
        res = true;
      }
    }
    
    return res;
  }

  static makeThisWeekEndDueDateTag(): TagItem {
    const today = new Date();
    const sunday = WeekDatesHandler.getThisWeekSunday(today);
    const saturday = WeekDatesHandler.getThisWeekSaturdayFromSunday(sunday);
    saturday.setHours(23, 59);
    
    const saturdayLastStr = `due-${saturday.getMonth() + 1}-${saturday.getDate()}-${saturday.getHours()}-${saturday.getMinutes()}`;
    const tagStr = TagHandlers.makeTagStr(saturdayLastStr);

    const res: TagItem = {
      id: tagStr,
      name: tagStr,
    };
    return res;
  }

  static getTagListWithoutDueDateTag(tagList: MessageItem['message']['tagList']): MessageItem['message']['tagList'] {
    let res: MessageItem['message']['tagList'] = tagList;
    res = res.filter(t => !t.name.match(dueDateRegExp));
    return res;
  }
}

export default DueDateHandler;