import DeleteKolt from "../Delete/DeleteKolt";
import UpdateKolt from "../Update/UpdateKolt";

export default function ReadKolt({ koltData, setKoltData }) {
    return (
        <>
            <div className="read-kolt-container">
                <table>
                    <thead>
                        <tr>
                            <th>Reg. Code</th>
                            <th>Availability</th>
                            <th>Last Use</th>
                            <th>Total Distance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {koltData.map((kolt, index) => (
                            <tr key={index}>
                                <td data-label="Reg. Code">{kolt.registrationCode}</td>
                                <td data-label="Availability">{kolt.isBusy ? 'Užimtas' : 'Laisvas'}</td>
                                <td data-label="Last Used">{kolt.lastUseTime}</td>
                                <td data-label="Mileage">{kolt.totalRideKilometers.toLocaleString("lt-LT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' km'}</td>
                                <td data-label="Actions">
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