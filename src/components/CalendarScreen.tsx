import { useEffect, useState } from "react";

import { ICalendar, IEvent, getCalendarsEndpoint, getEventsEndpoint } from "../app/backend";
import { DAYS_OF_WEEK } from "../utils/dateFunctions";

import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';

// React-router-dom
import { useParams } from "react-router";

// Components
import { CalendarsView } from "./CalendarsView";
import { CalendarHeader } from "./CalendarHeader";

// Interfaces
import { Calendar, ICalendarCell, IEventWithCalendar } from "./Calendar";


export function CalendarScreen() {

    const {month} = useParams<{month: string}>();
    
    const [events, setEvents] = useState<IEvent[] >([]);
    const [calendars, setCalendars] = useState<ICalendar[]>([]);
    const [selectedCalendars, setSelectedCalendars] = useState<boolean[]>([]);

    const weeks = generateCalendar((month + "-01"), events, calendars, selectedCalendars);

    // Primeiro e último dia para filtro de busca
    const firstDate = weeks[0][0].date;
    const lastDate = weeks[weeks.length - 1][6].date;

    useEffect(() => {
        Promise.all([
            getCalendarsEndpoint(),
            getEventsEndpoint(firstDate, lastDate)
        ]).then(([calendars, events]) => {
            setSelectedCalendars(calendars.map((c, i) => {
                // Permite que permaneça marcado/desmarcado na mudança de mês
                if (selectedCalendars[i] === undefined) {
                    return true;
                } else {
                    return selectedCalendars[i];
                }
            }));
            setCalendars(calendars);
            setEvents(events);
        })
    }, [firstDate, lastDate])

    function toggleCalendar(i: number) {
        const newSelectedCalendars = [...selectedCalendars];
        newSelectedCalendars[i] = !newSelectedCalendars[i];
        setSelectedCalendars(newSelectedCalendars);
    }

    return (
        <Box display="flex" height="100%" alignItems="stretch">
            <Box borderRight="1px solid rgb(224, 224, 224)" width="16em" padding="8px 16px">
                <h2>Agenda React</h2>
                <Button variant="contained" color="primary">
                    + Novo Evento
                </Button>
                <CalendarsView calendars={calendars} toggleCalendar={toggleCalendar} selectedCalendars={selectedCalendars} />

            </Box>

            <Box flex="1" display="flex" flexDirection="column">
                <CalendarHeader month={month} />
                <Calendar weeks={weeks}/>
            </Box>
        </Box>
    );
}

function generateCalendar(date: string, allEvents: IEvent[], calendars: ICalendar[], selectedCalendars: boolean[]): ICalendarCell[][] {
    const weeks: ICalendarCell[][] = [];
    const jsDate = new Date(`${date}T12:00:00`);
    const currentMonth = jsDate.getMonth();

    const currentDay = new Date(jsDate.valueOf());
    currentDay.setDate(1);
    const dayOfWeek = currentDay.getDay();

    // Reajusta para o primeiro dia do calendário
    currentDay.setDate(1 - dayOfWeek);

    do {
        const week: ICalendarCell[] = [];
        for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
            const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, '0');
            const dayStr = (currentDay.getDate()).toString().padStart(2, '0')
            const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`
            
            const events: IEventWithCalendar[] = []
            for (const event of allEvents) {
                if (event.date === isoDate) {
                    const calIndex = calendars.findIndex(cal => cal.id === event.calendarId);
                    if (selectedCalendars[calIndex]) {
                        events.push({...event, calendar: calendars[calIndex]})
                    }
                }
            }

            week.push({ dayOfMonth: currentDay.getDate(), date: isoDate, events});
            currentDay.setDate(currentDay.getDate() + 1);
        }
        weeks.push(week);
        
    } while (currentDay.getMonth() === currentMonth)

    return weeks;
}