import React, { useState } from 'react';
import DeleteKolt from "../Delete/DeleteKolt";
import UpdateKolt from "../Update/UpdateKolt";

export default function ReadKolt({ koltData, setKoltData }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortedKoltData = React.useMemo(_ => {
        let sortableData = [...koltData];
        if (sortConfig.key !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [koltData, sortConfig]);

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <>
            <h2>Kolt List</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th onClick={_ => requestSort('registrationCode')}>Reg. Code</th>
                            <th onClick={_ => requestSort('isBusy')}>Availability</th>
                            <th onClick={_ => requestSort('lastUseTime')}>Last Use</th>
                            <th onClick={_ => requestSort('totalRideKilometers')}>Mileage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedKoltData.map((kolt, index) => (
                            <tr key={index}>
                                <td>{kolt.registrationCode}</td>
                                <td>{kolt.isBusy ? 'Užimtas' : 'Laisvas'}</td>
                                <td>{kolt.lastUseTime}</td>
                                <td>{kolt.totalRideKilometers.toLocaleString("lt-LT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' km'}</td>
                                <td className="actions">
                                    <DeleteKolt kolt={kolt} koltData={koltData} setKoltData={setKoltData} />
                                    <UpdateKolt kolt={kolt} koltData={koltData} setKoltData={setKoltData} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}