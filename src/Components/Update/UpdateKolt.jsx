import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UpdateKolt({ kolt, koltData, setKoltData }) {

    const currentDateTime = new Date();
    const formatDateTime = (date) => {
        const pad = (num) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    const [showModal, setShowModal] = useState(false);
    const [newDate, setNewDate] = useState(kolt.lastUseTime);
    const [rideDistance, setRideDistance] = useState(0);
    const [inUse, setInUse] = useState(kolt.isBusy);

    const handleEdit = _ => {
        const newDistance = parseFloat((kolt.totalRideKilometers + rideDistance).toFixed(2));

        const newData = {
            ...kolt,
            isBusy: inUse,
            lastUseTime: newDate,
            totalRideKilometers: newDistance
        }

        const update = koltData.map(c => c.registrationCode === kolt.registrationCode ? newData : c);
        setKoltData(update);
        handleCloseModal();
        setRideDistance(0);
    }

    const handleOpenModal = _ => {
        setShowModal(true);
    };

    const handleCloseModal = _ => {
        setShowModal(false);
    };

    const parseDateTime = (dateTimeString) => {
        const [datePart, timePart] = dateTimeString.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes);
    };

    return (
        <>
            <button className="button-17" onClick={handleOpenModal}>Edit</button>
            {showModal && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>

                            <div className="modal-body">
                                    <div>
                                        <label className="form-check-label">Is busy</label>
                                        <input type="checkbox" className="form-check-input" checked={inUse} onChange={s => setInUse(s.target.checked)} />
                                    </div>

                                    <div className="modal-body-content">
                                        <label htmlFor="">Time last used</label>
                                        <DatePicker
                                            selected={parseDateTime(newDate)}
                                            minDate={kolt.lastUseTime}
                                            maxDate={currentDateTime}
                                            minTime={kolt.lastUseTime}
                                            maxTime={parseDateTime(newDate).toDateString() === new Date().toDateString() ? new Date() : new Date(new Date().setHours(23, 59, 59, 999))}
                                            onChange={c => setNewDate(formatDateTime(c))}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            dateFormat="yyyy-MM-dd HH:mm"
                                            timeIntervals={1}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                    </div>

                                    <div className="modal-body-content">
                                        <div className="mb-3">
                                            <label className="form-label">Total Ride Kilometres</label>
                                            <input type="text" className="form-control" value={kolt.totalRideKilometers} readOnly />
                                        </div>
                                        <label htmlFor="mileage">Distance covered (km)</label>
                                        <input
                                            type="number"
                                            name="mileage"
                                            id="mileage"
                                            step={0.01}
                                            min={0}
                                            value={rideDistance}
                                            inputMode='decimal'
                                            onChange={s => setRideDistance(Number(s.target.value))}
                                            onKeyDown={e => {
                                                if (e.key === 'e' || e.key === '-' || e.key === '+') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="button-17" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                <button type="submit" className="button-17" onClick={handleEdit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}