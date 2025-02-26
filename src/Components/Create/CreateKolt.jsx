import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateKolt({ koltData, setKoltData }) {

    const currentDateTime = new Date();
    const formatDateTime = (date) => {
        const pad = (num) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    const [totalRideKilometers, setTotalKilometers] = useState(0);
    const [lastUseTime, setLastUseTime] = useState(formatDateTime(currentDateTime));

    const addKolt = (e) => {
        e.preventDefault();
        const kolt = {
            id: koltData.length + 1,
            registrationCode: uniqueCode(8),
            isBusy: 0,
            lastUseTime,
            totalRideKilometers: parseFloat(parseFloat(totalRideKilometers).toFixed(2)),
        };
        setKoltData([...koltData, kolt]);

        setTotalKilometers(0);
        setLastUseTime(formatDateTime(currentDateTime));
    };

    const uniqueCode = (s) => {
        const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < s; i++) {
            result += char.charAt(Math.floor(Math.random() * char.length));
        }
        return result;
    };

    const parseDateTime = (dateTimeString) => {
        const [datePart, timePart] = dateTimeString.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes);
    };

    return (
        <>
            <div>
                <h2>New Kolt</h2>
                <form onSubmit={addKolt}>
                    <div>
                        <label htmlFor="">Time last used</label>
                        <DatePicker
                            selected={parseDateTime(lastUseTime)}
                            maxDate={new Date()}
                            minTime={new Date(new Date().setHours(0, 0, 0, 0))}
                            maxTime={parseDateTime(lastUseTime).toDateString() === new Date().toDateString() ? new Date() : new Date(new Date().setHours(23, 59, 59, 999))}
                            onChange={c => setLastUseTime(formatDateTime(c))}
                            showTimeSelect
                            timeFormat="HH:mm"
                            dateFormat="yyyy-MM-dd HH:mm"
                            timeIntervals={1}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </div>
                    <div>
                        <label htmlFor="mileage">Distance covered (km)</label>
                        <input
                            type="number"
                            name="mileage"
                            id="mileage"
                            step={0.01}
                            min={0}
                            value={totalRideKilometers}
                            onChange={c => {
                                const value = c.target.value;
                                if (/^\d*\.?\d{0,2}$/.test(value)) {
                                    setTotalKilometers(value);
                                }
                            }}
                            onKeyDown={e => {
                                if (e.key === "e" || e.key === "-" || e.key === "+") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>
                    <div>
                    </div>
                    <button type="submit" className="button-17">Add Kolt</button>
                </form>
            </div>
        </>
    );
}