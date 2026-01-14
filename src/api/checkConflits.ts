export default async function checkConflict(selectedMachineId: number, start_time: string, end_time: string){
    const response = await fetch('http://localhost:8000/api/admin/productionOrder/checkConflict', {
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
        body: JSON.stringify({
            machine_id: selectedMachineId,
            start_time: start_time,
            end_time: end_time
        })
    });
    const data = await response.json();
    console.log(data)
    return (data);
};