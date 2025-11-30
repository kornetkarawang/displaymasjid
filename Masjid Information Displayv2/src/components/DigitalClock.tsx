import { useState, useEffect } from "react";

export function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-br from-teal-500/90 to-cyan-600/90 backdrop-blur-md border-2 border-amber-300 rounded-lg px-5 py-3 text-right shadow-lg">
        <span className="text-white text-5xl tabular-nums tracking-wider drop-shadow-lg">
          {hours}:{minutes}:{seconds}
        </span>
      </div>
      <span className="text-amber-200 text-xl drop-shadow">WIB</span>
    </div>
  );
}