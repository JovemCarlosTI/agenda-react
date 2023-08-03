const BACK_END_URI = "http://localhost:8080";

export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEvent extends IEditingEvent {
  id: number;
}

export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export function getCalendarsEndpoint(): Promise<ICalendar[]> {
  return fetch(`${BACK_END_URI}/calendars`).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
  });
}

export function getEventsEndpoint(from: string, to: string): Promise<IEvent[]> {
  return fetch(`${BACK_END_URI}/events?date_gte=${from}&date_lte=${to}&_sort=date,time`).then(
    (res) => {
      if (res.status === 200) {
        return res.json();
      }
    }
  );
}

export function createEventEndpoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`${BACK_END_URI}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
  });
}

export function updateEventEndpoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`${BACK_END_URI}/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
  });
}

export function deleteEventEndpoint(eventId: number): Promise<void> {
  return fetch(`${BACK_END_URI}/events/${eventId}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
  });
}
