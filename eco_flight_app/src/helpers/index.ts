export enum Flight_Mode {
  ONE_WAY = "ONE_WAY",
  RETURN = "RETURN",
}

export interface CalendarProps {
  minDate?: Date;
  initialDate?: Date;
  selectedDate?: Date;
  departureAirport?: string;
  arrivalAirport?: string;
}

export interface Airport {
  id: number;
  code: string;
  name: string;
  city: string;
  country: string;
}

export enum FlightClass {
  FIRST_CLASS,
  BUSINESS_CLASS,
  ECONOMY_CLASS,
}
