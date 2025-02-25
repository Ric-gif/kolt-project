export default function CreateKolt({ koltData, setKoltData }) {
    
    const addKolt = _ => {
        const kolt = {
            id: koltData.length + 1,
            registrationCode: uniqueCode(8),
            isBusy: 0,
            lastUseTime: "Date",
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

    
    return (
        <>
            <div>
                <h2>New Kolt</h2>
            </div>
        </>
    );
}