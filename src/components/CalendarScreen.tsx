import { useEffect, useState } from "react";

import { ICalendar, IEvent, getCalendarsEndpoint, getEventsEndpoint } from "../app/backend";
import { formatMonth, DAYS_OF_WEEK, addMonths } from "../utils/dateFunctions";

// Material UI
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Avatar from '@material-ui/core/Avatar';

// React-router-dom
import { useParams } from "react-router";
import { Link } from "react-router-dom";


const useStyles = makeStyles({
    table: {
        borderTop: "1px solid rgb(224, 224, 224)",
        minHeight: "100%",
        tableLayout: "fixed",
      "& td ~ td, & th ~ th": {
        borderLeft: "1px solid rgb(224, 224, 224)"
      },
      "& td": {
        verticalAlign: "top",
        overflowX: "hidden",
        padding: "8px 4px"
      }
    },
    dayOfMonth: {
        fontWeight: 500,
        marginBottom: "4px",
    },
    event: {
        display: "flex",
        alignItems: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        margin: "4px 0",
        whiteSpace: "nowrap",
    },
    eventBackground: {
        display: "inline-block",
        color: "white",
        padding: "4px",
        borderRadius: "4px",
    }
  });

export function CalendarScreen() {
    const classes = useStyles();

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
            setSelectedCalendars(calendars.map(() => true));
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

                <Box marginTop="64px">
                    <h3>Agendas</h3>
                    {calendars.map((calendar, i) => (
                        <div key={calendar.id}>
                            <FormControlLabel
                                control={<Checkbox style={{color: calendar.color}} checked={selectedCalendars[i]} onChange={() => toggleCalendar(i)}/>}
                                label={calendar.name} />
                        </div>
                    ))}
                </Box>
            </Box>

            <Box flex="1" display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" padding="8px 16px">
                    <Box flex="1">
                        <IconButton aria-label="Mês anterior" component={Link} to={addMonths(month, -1)} >
                            <Icon>chevron_left</Icon>
                        </IconButton>
                        <IconButton aria-label="Próximo mês" component={Link} to={addMonths(month, 1)}>
                            <Icon>chevron_right</Icon>
                        </IconButton>
                    </Box>
                    <Box flex="1" marginLeft="16px" component="h3">{formatMonth(month)}</Box>

                    <IconButton aria-label="Usuário">
                        <Avatar>
                            <Icon>person</Icon>
                        </Avatar>
                    </IconButton>
                </Box>
                <TableContainer style={{flex: "1"}} component="div">
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            {DAYS_OF_WEEK && DAYS_OF_WEEK.map((day) => (
                                <TableCell align="center" key={day}>{day}</TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {weeks && weeks.map((week, i) => (
                                <TableRow key={i}>
                                    {week && week.map((cell) => (
                                    <TableCell align="center" key={cell.date}>
                                        <div className={classes.dayOfMonth}>{cell.dayOfMonth}</div>
                                        {cell.events.map(event => {
                                            const color = event.calendar.color;
                                            
                                            return (
                                                <button key={event.id} className={classes.event}>
                                                    {event.time && (
                                                        <>
                                                            <Icon fontSize="inherit"
                                                                style={{color}}>watch_later</Icon>
                                                            <Box component="span" margin="0 4px">{event.time}</Box>
                                                        </>
                                                    )}
                                                    {event.time
                                                        ? <span>{event.desc}</span>
                                                        : <span className={classes.eventBackground} style={{backgroundColor: color}}>{event.desc}</span>}
                                                    
                                                </button>
                                            )
                                        })}
                                    </TableCell>
                                ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

type IEventWithCalendar = IEvent & {calendar: ICalendar};

interface ICalendarCell {
    date: string;
    dayOfMonth: number;
    events: IEventWithCalendar[];
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