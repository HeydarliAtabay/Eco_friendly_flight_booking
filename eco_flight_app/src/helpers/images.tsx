export const RYANAIR = require("../../assets/airlineLogos/ryanair.png");
export const WIZZAIR = require("../../assets/airlineLogos/wizzair.png");
export const ECO = require("../../assets/eco-friendly.png");
export const NOFLIGHT = require("../../assets/no-flight.png");
export const SEAT = require("../../assets/seat.png");
export const HANDBAGGAGE = require("../../assets/bag.png");
export const BAGGAGE = require("../../assets/suitcase.png");
export const MONEY_REFUND = require("../../assets/money_refund.png");
export const AIRPLANEFORSEARCH = require("../../assets/airplane_search.png")
export const FLIGTHICON = require("../../assets/flight.png")
export const ECOPLANETREE = require("../../assets/ecoAir_image.jpg")
export const FLIGHTBLACK = require("../../assets/flightIconBlack.png")

export function getLogoFromAirlineName(airlineName: string) {
  if (airlineName.toLowerCase() === "ryanair") return RYANAIR;
  if (airlineName.toLowerCase() === "wizzair") return WIZZAIR;
}

export function getLogoFromAirlineId(airlineId: number) {
  if (airlineId === 1)
    return "https://api-ninjas.com/images/airline_logos/ryanair.jpg";
  if (airlineId === 2)
    return "https://api-ninjas.com/images/airline_logos/wizz_air.jpg";
  if (airlineId === 3)
    return "https://api-ninjas.com/images/airline_logos/turkish_airlines.jpg";
  if (airlineId === 4)
    return "https://api-ninjas.com/images/airline_logos/lufthansa.jpg";
  if (airlineId === 5)
    return "https://api-ninjas.com/images/airline_logos/easyjet.jpg";
  if (airlineId === 6)
    return "https://api-ninjas.com/images/airline_logos/qatar_airways.jpg";
}
