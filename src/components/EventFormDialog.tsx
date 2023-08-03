import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';

interface IEventFormDialogProps {
    open: boolean;
    onClose: () => void;
}

export function EventFormDialog(props: IEventFormDialogProps) {
    const {open, onClose} = props;

  return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Criar Evento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha as informações abaixo para criar o seu evento
          </DialogContentText>
          <TextField autoFocus type='date' margin="normal" label="Date" fullWidth />
          <TextField type="time" margin="normal" label="Hora (opcional)" fullWidth />
          <TextField margin="normal" label="Descrição" fullWidth />
          <FormControl margin='normal' fullWidth>
            <InputLabel id="select-calendar">Agenda</InputLabel>
            <Select
            labelId="select-calendar"
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onClose} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
  );
}
