import { timeUnit } from "@shared/types/TimeUnit";

interface IDateProvider {
  compare(startDate: Date, endDate: Date, unit: timeUnit): number;
  convertToUtc(date: Date): string;
  now(): Date;
  add(date: Date, quantity: number, unit: timeUnit): Date;
  sub(date: Date, quantity: number, unit: timeUnit): Date;
  isBefore(startDate: Date, endDate: Date): boolean;
  convertToTimezone(date: Date, timezone: string): Date;
  convertToFormat(date: Date, format: string): string;
}

export { IDateProvider };
