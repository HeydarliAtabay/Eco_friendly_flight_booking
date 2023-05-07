import { FlightClass } from "../helpers";
import { Selected_class } from "./interfaces.ts/interfaces";

export const FlightClass_To_SelectedClass = (flightClass: FlightClass) => {
  if (flightClass === FlightClass.FIRST_CLASS) return Selected_class.first;
  if (flightClass === FlightClass.BUSINESS_CLASS)
    return Selected_class.business;
  return Selected_class.econom;
};
