import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';
import { ICalendar, IEditingEvent, createEventsEndpoint } from '../app/backend';
import { useEffect, useState } from 'react';

interface IEventFormDialogProps {
    event: IEditingEvent | null;
    calendars: ICalendar[];
    onClose: () => void;
    onSave: () => void;
}

export function EventFormDialog(props: IEventFormDialogProps) {
    const {calendars, event: currentEvent, onClose, onSave} = props;

    const [event, setEvent] = useState<IEditingEvent | null>(currentEvent)

    useEffect(() => {
      setEvent(currentEvent)
    }, [currentEvent])

  function save(e: React.FormEvent) {
    e.preventDefault();
    createEventsEndpoint(event!).then(onSave)
  }

  return (
      <Dialog open={!!event} onClose={onClose} aria-labelledby="form-dialog-title">
        <form onSubmit={save}>
          <DialogTitle id="form-dialog-title">Criar Evento</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Preencha as informações abaixo para criar o seu evento
            </DialogContentText>
            {event && <>
              <TextField autoFocus type='date' margin="normal" label="Date" fullWidth value={event.date} onChange={(e) => setEvent({...event, date: e.target.value})}/>
              <TextField type="time" margin="normal" label="Hora (opcional)" fullWidth value={event.time ?? ""} onChange={(e) => setEvent({...event, time: e.target.value})}/>
              <TextField margin="normal" label="Descrição" fullWidth value={event.desc} onChange={(e) => setEvent({...event, desc: e.target.value})}/>
              <FormControl margin='normal' fullWidth>
                <InputLabel id="select-calendar">Agenda</InputLabel>
                <Select
                labelId="select-calendar"
                value={event.calendarId}
                onChange={(e) => setEvent({...event, calendarId: e.target.value as number})}
                >
                  {calendars && calendars.map(calendar => (
                    <MenuItem key={calendar.id} value={calendar.id}>{calendar.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>}
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
  );
}
