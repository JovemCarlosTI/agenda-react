import Box from "@material-ui/core/Box";

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';

// React-router-dom
import { Link } from "react-router-dom";
import { addMonths, formatMonth } from "../utils/dateFunctions";

interface ICalendarHeaderProps {
    month: string
}

export function CalendarHeader(props: ICalendarHeaderProps) {
    const {month} = props;
    
    return (
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
    )
}