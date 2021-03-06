import { WeekFromTo } from "BulletNote/types";


class WeekDatesHandler {
  static checkTwoDatesIsSame(date1: Date, date2: Date) {
    const date1Time = new Date(date1).getTime();
    const date2Time = new Date(date2).getTime();
    if(date1Time === date2Time) {
      return true;
    }
    return false;
  }
  
  static getDateTime(date: Date): number {
    const dateStr = this.convertDateToString(date);
    const res = new Date(dateStr).getTime();
    return res;
  }

  static checkNextDatesIsBigger(prev: Date, next: Date) {
    const prevTime = this.getDateTime(prev);
    const nextTime = this.getDateTime(next);
    
    if(nextTime > prevTime) {
      return true;
    }
    return false;
  }

  static getThisWeekSunday(today: Date) {
    const todayDay = today.getDay();
    const thisWeekSunday = new Date(today.setDate(today.getDate() - todayDay));  
    return thisWeekSunday;
  }

  static getTodayThisWeekSunday() {
    const today = new Date();
    const res = this.getThisWeekSunday(today);
    return res;
  }

  static getThisWeekOtherDayFromSunday(thisWeekSunday: Date, next: number) {
    const _thisWeekSunday = new Date(thisWeekSunday);
    const otherDay = new Date(
      _thisWeekSunday.setDate(_thisWeekSunday.getDate() + next)
    );  
    return otherDay;
  }

  static getThisWeekSaturdayFromSunday(thisWeekSunday: Date) {
    const thisWeekSaturday = this.getThisWeekOtherDayFromSunday(thisWeekSunday, 6);  
    return thisWeekSaturday;
  }

  static getTodayThisWeekFromTo(today: Date | string): WeekFromTo {
    const weekFrom = this.getThisWeekSunday(new Date(today));
    const weekTo = this.getThisWeekSaturdayFromSunday(weekFrom);
    const res = {
      weekFrom,
      weekTo,
    };

    return res;
  }

  static checkTodayIsInThisWeek(thisWeekFromTo: WeekFromTo, today: Date) {
    const weekFromTime = new Date(thisWeekFromTo.weekFrom).getTime();
    const weekToTime = new Date(thisWeekFromTo.weekTo).getTime();
    const todayTime = today.getTime();

    if(todayTime >= weekFromTime && todayTime <= weekToTime) {
      return true;
    }
    return false;
  }

  static convertDateToString(date: Date) {
    const res = `${date.getMonth() + 1}/${date.getDate()}`;
    return res;
  }
  
  static convertDateToHourMin(date: Date) {
    let res = '';
    const hours = date.getHours();
    const mins = date.getMinutes();

    if(hours === 0 && mins === 0) {
      return res;
    }
    res = `${date.getHours()}:${date.getMinutes()}`;
    return res;
  }

  static convertWeekFromToToString(weekFromTo: WeekFromTo, joinStr='~') {
    const fromStr = this.convertDateToString(weekFromTo.weekFrom);
    const toStr = this.convertDateToString(weekFromTo.weekTo);
    const res = `${fromStr}${joinStr}${toStr}`;

    return res;
  }
}

export default WeekDatesHandler;