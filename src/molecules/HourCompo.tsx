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
