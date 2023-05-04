export type User = {
    id: number
    username: string
    name: string
    surname: string
    phone_number: string
}


export type SearchBody = {
    departure_date: string,
    arrival_date?: string,
    arrival_airport: string,
    departure_airport: string,
}



export type Flight = {
    id: number,
    departure_airport: number,
    arrival_airport: number,
    departure_date: string,
    departure_time: string,
    arrival_date: string,
    arrival_time: string,
    econom_price: number,
    business_price: number,
    first_class_price: number,
    airline: number,
    flight_number: string,
}

export type Airport = {
    id: number,
    code: string,
    name: string,
    city: string,
    country: string
}

export type SearchFlightResultSingle = {

    id: number,
    departure_airport: number,
    arrival_airport: number,
    departure_date: string,
    departure_time: string,
    arrival_date: string,
    arrival_time: string,
    econom_price: number,
    business_price: number,
    first_class_price: number,
    airline: number,
    flight_number: string,
    departure_airport_name: string,
    departure_airport_code: string,
    departure_airport_country: string,
    departure_airport_city: string,
    arrival_airport_name: string,
    arrival_airport_code: string,
    arrival_airport_country: string,
    arrival_airport_city: string

}

export type FlighSearchFullResult = {
    Departure: SearchFlightResultSingle[],
    Return?: SearchFlightResultSingle[]
}


export type SelectedFlight = {
    user_id: number,
    flight_id: number,
    seat: string | null,
    payment_status: 'PAID' | 'UNPAID',
    checkin_status: 'NOT' | 'PENDING' | 'DONE',
}

export enum Payment_Status {
    paid = "PAID",
    unpaid = "UNPAID",
}

export enum Checkin_Status {
    not = "NOT",
    pending = "PENDING",
    done = "DONE"
}

export enum Move_Modal {
    back = Number(-1),
    forward = 1
}


export type bookedFlight = {
    id: number,
    user_id: number,
    flight_id: number,
    seat: string | null,
    payment_status: 'PAID' | 'UNPAID',
    checkin_status: 'NOT' | 'PENDING' | 'DONE',
}

export type BookedFlightInfo = {
    id: number,
    user_id: number,
    flight_id: number,
    seat: string | null,
    payment_status: 'PAID' | 'UNPAID',
    checkin_status: 'NOT' | 'PENDING' | 'DONE',
    flight_info: Flight,
    departureAirport: Airport,
    arrivalAirport: Airport
}

