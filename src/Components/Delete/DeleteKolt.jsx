export default function DeleteKolt({kolt, koltData, setKoltData}) {
    const handleDelete = kolt => {
        const newData = koltData.filter(c => c.registrationCode !== kolt.registrationCode);
        setKoltData(newData);
    }

    return (
        <button className="button-17" onClick={_ => handleDelete(kolt)}>Remove</button>
    );
}