import { useParams } from "react-router-dom";
import getOneProductionOrder from "../api/getOneProductionOrder";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface HourProps {
  real_start_time: string;
  duration_time: number;
  production_order_reference: string;
}

interface HourCompoProps {
  onTimeChange: (data: { start: string; end: string }) => void;
}

export default function HourCompo({ onTimeChange }: HourCompoProps) {
  const { id } = useParams<{ id: string }>();
  const [hours, setHours] = useState<HourProps | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const data = await getOneProductionOrder(Number(id));
      setHours(data);

      if (data.real_start_time && data.duration_time !== undefined) {
        const start = data.real_start_time;
        const end = dayjs(data.real_start_time)
          .add(data.duration_time, "minute")
          .format("YYYY-MM-DD HH:mm:ss");

        onTimeChange({ start, end });
      }
    };

    fetchData();
  }, [id, onTimeChange]);

  return (
    <div className="flex flex-row justify-between items-center bg-primary">
      <p className="font-text text-secondary text-md w-[100px]">
        {hours?.production_order_reference ?? "—"}
      </p>

      <div className="flex gap-1 py-2 justify-center items-center">
        <span className="font-text text-secondary text-md">
          Production |
        </span>

        <div className="flex gap-2">
          <div className="flex gap-2 justify-center items-center">
            <span className="text-secondary text-xs">début</span>
              <span className="p-1 bg-slate-400/30 border border-slate-400 text-sm rounded text-secondary">{hours?.real_start_time ? dayjs(hours.real_start_time).format("DD/MM/YYYY HH:mm") : "—"}</span>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <span className="text-secondary text-xs">fin</span>
            <span className="p-1 bg-slate-400/30 border border-slate-400 text-sm rounded text-secondary">
              {hours?.real_start_time && hours?.duration_time !== undefined ? dayjs(hours.real_start_time) .add(hours.duration_time, "minute") .format("DD/MM/YYYY HH:mm"): "—"}
            </span>
          </div>
        </div>
      </div>

      <p className="font-text text-secondary text-md">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
}
