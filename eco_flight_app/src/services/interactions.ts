import { FlightClass } from "../helpers";
import { Selected_class } from "./interfaces.ts/interfaces";

export const FlightClass_To_SelectedClass = (flightClass: FlightClass) => {
  if (flightClass === FlightClass.FIRST_CLASS) return Selected_class.first;
  if (flightClass === FlightClass.BUSINESS_CLASS)
    return Selected_class.business;
  return Selected_class.econom;
};

export const SelectedClass_To_FlightClass = (flightClass: Selected_class) => {
  if (flightClass === Selected_class.first) return FlightClass.FIRST_CLASS;
  if (flightClass === Selected_class.business)
    return FlightClass.BUSINESS_CLASS;
  return FlightClass.ECONOMY_CLASS;
};
