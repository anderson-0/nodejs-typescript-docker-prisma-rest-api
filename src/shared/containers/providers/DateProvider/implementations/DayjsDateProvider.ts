import { timeUnit } from "@shared/types/TimeUnit";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { IDateProvider } from "../models/IDateProvider";

dayjs.extend(utc);
dayjs.extend(timezone);

class DayjsDateProvider implements IDateProvider {
  add(date: Date, quantity: number, unit: timeUnit) {
    const newDate = dayjs(date).add(quantity, unit);
    return newDate.toDate();
  }

  sub(date: Date, quantity: number, unit: timeUnit) {
    const newDate = dayjs(date).subtract(quantity, unit);
    return newDate.toDate();
  }

  now(): Date {
    return dayjs().toDate();
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compare(startDate: Date, endDate: Date, unit: timeUnit): number {
    const startDateUtc = this.convertToUtc(startDate);
    const endDateUtc = this.convertToUtc(endDate);
    return dayjs(endDateUtc).diff(startDateUtc, unit);
  }

  isBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate);
  }

  convertToTimezone(date: Date, tz: string): Date {
    return dayjs.tz(date, tz).toDate();
  }

  convertToFormat(date: Date, format: string): string {
    return dayjs(date).format(format);
  }
}

export { DayjsDateProvider };
