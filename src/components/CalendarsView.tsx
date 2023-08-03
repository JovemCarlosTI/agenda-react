import { ICalendar } from '../app/backend';

import Box from "@material-ui/core/Box";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface ICalendarViewProps {
    calendars: ICalendar[], toggleCalendar: (i: number) => void, selectedCalendars: boolean[]
}

export function CalendarsView(props: ICalendarViewProps) {
    const {calendars, toggleCalendar, selectedCalendars} = props;
    
    return (
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
    )
}