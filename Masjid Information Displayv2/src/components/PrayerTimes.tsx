import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface PrayerTime {
  name: string;
  time: string;
  isPassed: boolean;
}

export function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock prayer times - in real app, this would come from an API
  const prayerTimesData = [
    { name: "Subuh", time: "04:45" },
    { name: "Dzuhur", time: "12:10" },
    { name: "Ashar", time: "15:25" },
    { name: "Maghrib", time: "18:15" },
    { name: "Isya", time: "19:30" },
  ];

  const isPrayerPassed = (prayerTime: string) => {
    const [hours, minutes] = prayerTime.split(':').map(Number);
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    
    if (currentHours > hours) return true;
    if (currentHours === hours && currentMinutes >= minutes) return true;
    return false;
  };

  const prayerTimes: PrayerTime[] = prayerTimesData.map(prayer => ({
    ...prayer,
    isPassed: isPrayerPassed(prayer.time)
  }));

  const getNextPrayer = () => {
    const notPassed = prayerTimes.find(p => !p.isPassed);
    return notPassed?.name || "Subuh";
  };

  const nextPrayer = getNextPrayer();

  return (
    <div className="bg-white/95 backdrop-blur-md border-2 border-teal-400 rounded-2xl p-6 shadow-2xl">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-3 mb-4">
        <h2 className="text-amber-100 text-2xl text-center drop-shadow">JADWAL SHOLAT</h2>
      </div>
      
      <div className="space-y-3">
        {prayerTimes.map((prayer, index) => {
          const isNext = prayer.name === nextPrayer;
          
          return (
            <motion.div
              key={prayer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center justify-between p-4 rounded-xl transition-all ${
                isNext 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 border-2 border-amber-600 shadow-lg' 
                  : 'bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200'
              }`}
            >
              {isNext && (
                <motion.div
                  className="absolute -left-2 top-1/2 -translate-y-1/2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-3 h-3 bg-amber-600 rounded-full shadow-lg shadow-amber-600/50" />
                </motion.div>
              )}
              
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isNext ? 'bg-white border-amber-700' : 'bg-teal-500 border-teal-600'
                }`}>
                  <span className={`text-xl ${isNext ? 'text-amber-700' : 'text-white'}`}>
                    {index + 1}
                  </span>
                </div>
                <span className={`text-2xl ${isNext ? 'text-teal-900' : 'text-teal-800'}`}>
                  {prayer.name}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {isNext && (
                  <span className="text-teal-900 bg-white/60 border border-amber-700 px-3 py-1 rounded-lg">
                    Selanjutnya
                  </span>
                )}
                <span className={`text-3xl tabular-nums ${
                  isNext ? 'text-teal-900' : 'text-teal-700'
                }`}>
                  {prayer.time}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}