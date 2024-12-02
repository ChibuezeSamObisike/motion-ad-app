import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';

export default function DateCalenderWidget() {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    disablePast
                    sx={{
                        '.MuiPickersCalendarHeader-root': {
                            color: '#333',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                        },
                        '.MuiPickersCalendarHeader-label': {
                            fontSize: '20px',
                        },
                        '.MuiPickersArrowSwitcher-root button': {
                            color: '#000',
                        },
                        '.MuiPickersDay-today': {
                            border: '2px solid #007BFF',
                        },
                        '.MuiPickersDay-root': {
                            border: '1px solid #ddd',
                        },
                        width: '442px',
                        height: '379px',
                    }}
                />
            </LocalizationProvider>
        </Box>
    );
}
