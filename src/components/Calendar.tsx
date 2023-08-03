// Material UI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";

import { useStyles } from "../useStyles";

import { DAYS_OF_WEEK } from "../utils/dateFunctions";
import { ICalendar, IEvent } from "../app/backend";

export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}

interface ICalendarProps {
  weeks: ICalendarCell[][];
  onClickDay: (date: string) => void;
  onClickEvent: (event: IEvent) => void;
}

export function Calendar(props: ICalendarProps) {
  const { weeks, onClickDay, onClickEvent } = props;

  const classes = useStyles();

  function handleClickTableCell(e: React.MouseEvent, date: string) {
    if (e.target === e.currentTarget) onClickDay(date);
  }

  return (
    <TableContainer style={{ flex: "1" }} component="div">
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {DAYS_OF_WEEK &&
              DAYS_OF_WEEK.map((day) => (
                <TableCell align="center" key={day}>
                  {day}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks &&
            weeks.map((week, i) => (
              <TableRow key={i}>
                {week &&
                  week.map((cell) => (
                    <TableCell
                      align="center"
                      key={cell.date}
                      onClick={(e) => handleClickTableCell(e, cell.date)}
                    >
                      <div className={classes.dayOfMonth}>{cell.dayOfMonth}</div>
                      {cell.events.map((event) => {
                        const color = event.calendar.color;

                        return (
                          <button
                            key={event.id}
                            className={classes.event}
                            onClick={(e) => onClickEvent(event)}
                          >
                            {event.time && (
                              <>
                                <Icon fontSize="inherit" style={{ color }}>
                                  watch_later
                                </Icon>
                                <Box component="span" margin="0 4px">
                                  {event.time}
                                </Box>
                              </>
                            )}
                            {event.time ? (
                              <span>{event.desc}</span>
                            ) : (
                              <span
                                className={classes.eventBackground}
                                style={{ backgroundColor: color }}
                              >
                                {event.desc}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
