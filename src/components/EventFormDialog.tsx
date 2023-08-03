import { useEffect, useRef, useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Box, InputLabel } from "@material-ui/core";

import {
  ICalendar,
  IEditingEvent,
  createEventEndpoint,
  deleteEventEndpoint,
  updateEventEndpoint,
} from "../app/backend";

interface IEventFormDialogProps {
  event: IEditingEvent | null;
  calendars: ICalendar[];
  onClose: () => void;
  onSave: () => void;
}

interface IValidationErrors {
  [field: string]: string;
}

export function EventFormDialog(props: IEventFormDialogProps) {
  const { calendars, event: currentEvent, onClose, onSave } = props;

  const [event, setEvent] = useState<IEditingEvent | null>(currentEvent);
  const [errors, setErrors] = useState<IValidationErrors>({});

  const inputDate = useRef<HTMLInputElement | null>();
  const inputDesc = useRef<HTMLInputElement | null>();

  useEffect(() => {
    setEvent(currentEvent);
    setErrors({});
  }, [currentEvent]);

  const isNew = !event?.id;

  function validateEvent(): boolean {
    if (!event) return false;

    const currentErrors: IValidationErrors = {};
    if (!event.desc) {
      currentErrors["desc"] = "A Descrição deve ser preenchida";
      inputDesc.current?.focus();
    }
    if (!event.date) {
      currentErrors["date"] = "Data deve ser preenchida";
      inputDate.current?.focus();
    }

    setErrors(currentErrors);

    return Object.keys(currentErrors).length === 0;
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (event && validateEvent()) {
      if (isNew) createEventEndpoint(event).then(onSave);
      else updateEventEndpoint(event).then(onSave);
    }
  }

  function deleteEvent() {
    if (event) {
      deleteEventEndpoint(event.id!).then(onSave);
    }
  }

  return (
    <Dialog open={!!event} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={save}>
        <DialogTitle id="form-dialog-title">{isNew ? "Criar Evento" : "Editar Evento"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha as informações abaixo para {isNew ? "criar" : "editar"} o seu evento
          </DialogContentText>
          {event && (
            <>
              <TextField
                autoFocus
                inputRef={inputDate}
                type="date"
                error={!!errors.date}
                helperText={errors.date}
                margin="normal"
                label="Date"
                fullWidth
                value={event.date}
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
              />
              <TextField
                type="time"
                margin="normal"
                label="Hora (opcional)"
                fullWidth
                value={event.time ?? ""}
                onChange={(e) => setEvent({ ...event, time: e.target.value })}
              />
              <TextField
                margin="normal"
                inputRef={inputDesc}
                label="Descrição"
                error={!!errors.desc}
                helperText={errors.desc}
                fullWidth
                value={event.desc}
                onChange={(e) => setEvent({ ...event, desc: e.target.value })}
              />
              <FormControl margin="normal" fullWidth>
                <InputLabel id="select-calendar">Agenda</InputLabel>
                <Select
                  labelId="select-calendar"
                  value={event.calendarId}
                  onChange={(e) => setEvent({ ...event, calendarId: e.target.value as number })}
                >
                  {calendars &&
                    calendars.map((calendar) => (
                      <MenuItem key={calendar.id} value={calendar.id}>
                        {calendar.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!isNew && (
            <Button type="button" onClick={deleteEvent}>
              Excluir
            </Button>
          )}
          <Box flex="1"></Box>
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
