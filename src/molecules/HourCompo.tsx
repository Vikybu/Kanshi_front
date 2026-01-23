import { useParams } from "react-router-dom";
import getOneProductionOrder from "../api/getOneProductionOrder";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

interface HourProps {
    real_start_time: string;
    duration_time: number;
    production_order_reference: string;
}

export default function HourCompo() {
    const { id } = useParams<{ id: string }>();
    const [hours, setHours] = useState<HourProps | null>(null);
    const [time, setTime] = useState(new Date());

    function CalculationEndTime(startTime: string, durationTime: number): string {
        const startDate = new Date(startTime);

        if (isNaN(startDate.getTime())) {
            return "Date invalide";
        }

        startDate.setMinutes(startDate.getMinutes() + durationTime);

        const end_time = startDate.getFullYear() + '-' +
                         String(startDate.getMonth() + 1).padStart(2, '0') + '-' +
                         String(startDate.getDate()).padStart(2, '0') + ' ' +
                         String(startDate.getHours()).padStart(2, '0') + ':' +
                         String(startDate.getMinutes()).padStart(2, '0') + ':' +
                         String(startDate.getSeconds()).padStart(2, '0');

        return end_time;
    }

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOneProductionOrder(Number(id));
            console.log("🚀 ~ fetchData ~ data:", data)
            
            setHours(data);
        };
        fetchData();
    }, [id]);

    return (
        <div className="flex flex-row justify-between items-center bg-primary">
            <p className="font-text text-secondary text-xl w-[100px]">{hours?.production_order_reference ?? "—"}</p>
            <div className="flex flex-col gap-1">
                <p className="font-text text-secondary text-xl">Début de production : 
                 {hours?.real_start_time
                    ? dayjs(hours.real_start_time).format('DD/MM/YYYY HH:mm')
                    : "—"}
                </p>

                <p className="font-text text-secondary text-xl">Fin de la production : 
                 {hours?.real_start_time && hours?.duration_time !== undefined
                    ? dayjs(hours.real_start_time)
                        .add(hours.duration_time, 'minute')
                        .format('DD/MM/YYYY HH:mm')
                    : "—"}
                </p>
            </div>

            <p className="font-text text-secondary text-2xl">{time.toLocaleTimeString()}</p>
        </div>
    );
}
