export default function ReadInfo({ koltData }) {
    const totalKolts = koltData.length;
    const availableKolts = koltData.filter(kolt => kolt.isBusy === 0).length;
    const totalMileage = koltData.reduce((sum, kolt) => sum + kolt.totalRideKilometers, 0);

    return (
        <>
            <h2>Kolt Info</h2>
            <div className="create-form">
                <div>Total Kolts: {totalKolts}</div>
                <div>Available Kolts: {availableKolts}</div>
                <div>Total Mileage: {parseFloat(totalMileage).toFixed(2)} km</div>
            </div>
        </>
    );
}