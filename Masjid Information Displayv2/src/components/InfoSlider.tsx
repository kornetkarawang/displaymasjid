import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Calendar, Megaphone } from "lucide-react";

interface InfoItem {
  id: number;
  title: string;
  content: string;
  icon: 'info' | 'calendar' | 'announcement';
}

export function InfoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const infoItems: InfoItem[] = [
    {
      id: 1,
      title: "Pengumuman",
      content: "Kajian rutin setiap hari Jum'at ba'da Maghrib. Mari hadir dan tingkatkan ilmu agama kita.",
      icon: 'announcement'
    },
    {
      id: 2,
      title: "Kegiatan",
      content: "Belajar Al-Qur'an untuk anak-anak setiap hari Sabtu dan Minggu pukul 08:00 - 10:00 WIB.",
      icon: 'calendar'
    },
    {
      id: 3,
      title: "Informasi",
      content: "Zakat fitrah sudah dapat ditunaikan di panitia masjid. Jazakumullahu khairan.",
      icon: 'info'
    },
    {
      id: 4,
      title: "Pengumuman",
      content: "Sholat Jum'at dilaksanakan pada pukul 12:00 WIB. Diharapkan jamaah hadir tepat waktu.",
      icon: 'announcement'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % infoItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [infoItems.length]);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'info':
        return <Info className="w-8 h-8" />;
      case 'calendar':
        return <Calendar className="w-8 h-8" />;
      case 'announcement':
        return <Megaphone className="w-8 h-8" />;
      default:
        return <Info className="w-8 h-8" />;
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md border-2 border-teal-400 rounded-2xl p-6 h-full shadow-2xl">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-3 mb-4">
        <h2 className="text-amber-100 text-2xl text-center drop-shadow">INFORMASI</h2>
      </div>
      
      <div className="relative h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-300 rounded-xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-amber-400 to-amber-500 border-2 border-teal-500 p-3 rounded-lg text-teal-900">
                  {getIcon(infoItems[currentIndex].icon)}
                </div>
                <h3 className="text-teal-900 text-2xl">{infoItems[currentIndex].title}</h3>
              </div>
              
              <p className="text-teal-800 text-xl flex-1">
                {infoItems[currentIndex].content}
              </p>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {infoItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-8 bg-amber-500' 
                        : 'w-2 bg-teal-300 hover:bg-teal-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Additional Info */}
      <div className="mt-4 space-y-3">
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-300 rounded-lg p-4">
          <p className="text-teal-700 text-sm text-center">
            Untuk informasi lebih lanjut hubungi Takmir Masjid
          </p>
          <p className="text-teal-900 text-center">☎️ 0812-3456-7890</p>
        </div>
      </div>
    </div>
  );
}