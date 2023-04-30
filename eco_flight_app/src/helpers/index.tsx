export enum Flight_Mode {
  ONE_WAY = "ONE_WAY",
  RETURN = "RETURN",
}

export interface CalendarProps {
  minDate?: Date;
  initialDate?: Date;
  selectedDate?: Date;
}
