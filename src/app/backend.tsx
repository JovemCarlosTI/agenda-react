const BACK_END_URI = 'http://localhost:8080'

export interface ICalendar {
    id: number;
    name: string;
    color: string;
}

export interface IEvent {
    id: number;
    date: string;
    time?: string;
    desc: string;
    calendarId: number;
}

export function getCalendarsEndpoint(): Promise<ICalendar[]> {
    return fetch(`${BACK_END_URI}/calendars`).then(res => {
        if (res.status === 200) {
            return res.json()
        }
    })
}

export function getEventsEndpoint(from: string, to: string): Promise<IEvent[]> {
    return fetch(`${BACK_END_URI}/events?date_gte=${from}&date_lte=${to}&_sort=date,time`).then(res => {
        if (res.status === 200) {
            return res.json()
        }
    })
}