import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface PrayerTimeAlert {
  name: string;
  time: string;
  type: 'adzan' | 'iqomah';
}

export function AdzanNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<PrayerTimeAlert | null>(null);
  const [hasShownAlerts, setHasShownAlerts] = useState<Set<string>>(new Set());

  // Mock prayer times - sesuaikan dengan waktu sholat sebenarnya
  const prayerTimes = [
    { name: "Subuh", time: "04:45", iqomahDelay: 10 },
    { name: "Dzuhur", time: "12:10", iqomahDelay: 10 },
    { name: "Ashar", time: "15:25", iqomahDelay: 10 },
    { name: "Maghrib", time: "18:15", iqomahDelay: 5 },
    { name: "Isya", time: "19:30", iqomahDelay: 10 },
  ];

  useEffect(() => {
    const checkPrayerTime = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();
      const currentTimeStr = `${currentHours}:${currentMinutes}`;

      prayerTimes.forEach((prayer) => {
        const [prayerHours, prayerMinutes] = prayer.time.split(':').map(Number);
        
        // Check for Adzan time
        if (
          currentHours === prayerHours &&
          currentMinutes === prayerMinutes &&
          currentSeconds === 0
        ) {
          const alertKey = `${prayer.name}-adzan-${currentTimeStr}`;
          if (!hasShownAlerts.has(alertKey)) {
            setCurrentAlert({
              name: prayer.name,
              time: prayer.time,
              type: 'adzan'
            });
            setShowNotification(true);
            setHasShownAlerts(prev => new Set(prev).add(alertKey));
          }
        }

        // Check for Iqomah time
        const iqomahMinutes = prayerMinutes + prayer.iqomahDelay;
        const iqomahHours = prayerHours + Math.floor(iqomahMinutes / 60);
        const adjustedIqomahMinutes = iqomahMinutes % 60;
        
        if (
          currentHours === iqomahHours &&
          currentMinutes === adjustedIqomahMinutes &&
          currentSeconds === 0
        ) {
          const alertKey = `${prayer.name}-iqomah-${currentTimeStr}`;
          if (!hasShownAlerts.has(alertKey)) {
            setCurrentAlert({
              name: prayer.name,
              time: `${iqomahHours.toString().padStart(2, '0')}:${adjustedIqomahMinutes.toString().padStart(2, '0')}`,
              type: 'iqomah'
            });
            setShowNotification(true);
            setHasShownAlerts(prev => new Set(prev).add(alertKey));
          }
        }
      });
    };

    const interval = setInterval(checkPrayerTime, 1000);
    return () => clearInterval(interval);
  }, [hasShownAlerts]);

  // Auto close after 30 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleClose = () => {
    setShowNotification(false);
  };

  // Demo button untuk testing (bisa dihapus di production)
  const testAdzan = () => {
    setCurrentAlert({
      name: "Dzuhur",
      time: "12:10",
      type: 'adzan'
    });
    setShowNotification(true);
  };

  const testIqomah = () => {
    setCurrentAlert({
      name: "Dzuhur",
      time: "12:20",
      type: 'iqomah'
    });
    setShowNotification(true);
  };

  return (
    <>
      {/* Demo Buttons - Hapus di production */}
      <div className="fixed bottom-4 right-4 z-40 flex gap-2">
        <button
          onClick={testAdzan}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-teal-700 transition-colors text-sm"
        >
          Test Adzan
        </button>
        <button
          onClick={testIqomah}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-amber-700 transition-colors text-sm"
        >
          Test Iqomah
        </button>
      </div>

      <AnimatePresence>
        {showNotification && currentAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/95 via-cyan-900/95 to-teal-900/95 backdrop-blur-sm" />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="relative z-10 max-w-4xl w-full mx-4"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-4 -right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Main Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-4 border-amber-400 rounded-3xl p-12 text-center shadow-2xl">
                {/* Islamic Pattern */}
                <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='1'%3E%3Cpath d='M40 40l20-20v20h20l-20 20 20 20h-20v20l-20-20-20 20v-20H0l20-20L0 40h20V20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}/>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-8 border-4 border-teal-400 shadow-2xl">
                      <svg className="w-32 h-32 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2L12 6M12 6C10.5 6 9 7 9 8.5V10H15V8.5C15 7 13.5 6 12 6Z" strokeLinecap="round"/>
                        <path d="M4 10H20V22H4V10Z" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="16" r="2"/>
                        <path d="M7 10V8C7 6 8 4 12 4C16 4 17 6 17 8V10" strokeLinecap="round"/>
                        <rect x="10" y="18" width="4" height="4" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <h1 className="text-amber-300 text-6xl mb-4 drop-shadow-lg">
                      {currentAlert.type === 'adzan' ? 'WAKTU ADZAN' : 'WAKTU IQOMAH'}
                    </h1>
                  </motion.div>

                  {/* Prayer Name */}
                  <h2 className="text-white text-8xl mb-6 drop-shadow-2xl" style={{fontFamily: 'Georgia, serif'}}>
                    {currentAlert.name.toUpperCase()}
                  </h2>

                  {/* Time */}
                  <div className="bg-white/10 border-2 border-amber-400 rounded-2xl p-6 mb-8 inline-block">
                    <p className="text-amber-200 text-3xl mb-2">Pukul</p>
                    <p className="text-white text-7xl tabular-nums">{currentAlert.time} WIB</p>
                  </div>

                  {/* Message */}
                  <motion.p
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-teal-100 text-3xl mb-6"
                  >
                    {currentAlert.type === 'adzan' 
                      ? 'Mari segera mengambil wudhu dan menuju masjid' 
                      : 'Sholat akan segera dimulai, mari luruskan dan rapatkan shaf'}
                  </motion.p>

                  {/* Quranic Verse */}
                  <div className="bg-gradient-to-r from-teal-800/40 to-cyan-800/40 border-2 border-teal-400 rounded-xl p-6 mt-8">
                    <p className="text-amber-200 text-2xl italic">
                      "Sesungguhnya sholat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman"
                    </p>
                    <p className="text-teal-300 text-xl mt-2">- QS. An-Nisa: 103</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
