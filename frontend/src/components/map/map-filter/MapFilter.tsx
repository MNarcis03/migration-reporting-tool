import React, { FC } from 'react';
import styles from './MapFilter.module.scss';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import { COLOR_ON_SURFACE } from '../../../styling/colors';
// import type {} from '@mui/x-date-pickers-pro/themeAugmentation';

interface MapFilterProps { }

const MapFilter: FC<MapFilterProps> = () => {

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

    const datePicked = (newDate: Dayjs | null) => {
        console.log(newDate);
        setValue(newDate);
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.mapFilter}>
                <DatePicker
                    className={styles.datePicker}
                    views={['year', 'month']}
                    label="Year and Month"
                    minDate={dayjs('2012-03-01')}
                    maxDate={dayjs('2023-06-01')}
                    value={value}
                    onChange={datePicked}
                    renderInput={(params: any) => <TextField {...params} helperText={null} />}
                    InputProps={{
                        sx: {
                            '& .MuiSvgIcon-root': { color: COLOR_ON_SURFACE },
                            '& .MuiInputBase-input': { color: COLOR_ON_SURFACE},
                            '& .MuiInputLabel-root': { color: COLOR_ON_SURFACE},
                            '& .MuiInputBase-root': { border: '1px solid red'},
                        }
                    }}
                />
            </div>
        </LocalizationProvider>
    );
};

export default MapFilter;
