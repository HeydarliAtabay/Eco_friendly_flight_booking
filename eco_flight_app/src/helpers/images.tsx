export const RYANAIR = require("../../assets/airlineLogos/ryanair.png")
export const WIZZAIR = require("../../assets/airlineLogos/wizzair.png")
export const ECO = require('../../assets/eco-friendly.png')



export function getLogoFromAirlineName(airlineName: string) {
    if (airlineName.toLowerCase() === 'ryanair') return RYANAIR
    if (airlineName.toLowerCase() === 'wizzair') return WIZZAIR
}