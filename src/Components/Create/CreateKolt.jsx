import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export default function CreateKolt({ koltData, setKoltData }) {

    const [lastUseTime, setLastUseTime] = useState('');
    const [totalRideKilometers, setTotalKilometers] = useState(0);

    const addKolt = _ => {
        const formattedLastUseTime = dayjs(lastUseTime).format('YYYY-MM-DD HH:mm');
        const kolt = {
            id: koltData.length + 1,
            registrationCode: uniqueCode(8),
            isBusy: 0,
            lastUseTime: formattedLastUseTime,
            totalRideKilometers: parseFloat(parseFloat(totalRideKilometers).toFixed(2))
        }
        setKoltData([...koltData, kolt]);
    }

    const uniqueCode = s => {
        const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';

        for (let i = 0; i < s; i++) {
            result += char.charAt(Math.floor(Math.random() * char.length));
        }
        return result;
    }

    const currentDate = new Date();


    return (
        <>
            <div>
                <h2>New Kolt</h2>
                <form onSubmit={addKolt}>
                    <div>
                        <label htmlFor="date">Date and time</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker format="L HH:mm" onChange={c => setLastUseTime(c)}/>
                        </LocalizationProvider>
                    </div>
                    <div>
                        <label htmlFor="mileage">Distance covered (km)</label>
                        <input type="number" name="mileage" id="mileage" step={0.01} min={0} onChange={c => setTotalKilometers(c.target.value)} />
                    </div>
                    <button type="submit" className="button-17">Add Kolt</button>
                </form>
            </div>
        </>
    );
}