import { useState, useEffect } from "react";

export function DateDisplay() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Gregorian Date
  const gregorianOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const gregorianDate = date.toLocaleDateString('id-ID', gregorianOptions);

  // Hijri Date (approximate calculation)
  const getHijriDate = (date: Date) => {
    const gregorianYear = date.getFullYear();
    const gregorianMonth = date.getMonth() + 1;
    const gregorianDay = date.getDate();
    
    // Simple Hijri conversion (approximation)
    const hijriYear = Math.floor((gregorianYear - 622) * 1.030684) + 1;
    
    const hijriMonths = [
      'Muharram', 'Safar', 'Rabi\'ul Awal', 'Rabi\'ul Akhir', 
      'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
      'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'
    ];
    
    // Approximate month (this is simplified)
    const monthIndex = (gregorianMonth + 8) % 12;
    const hijriMonth = hijriMonths[monthIndex];
    const hijriDay = Math.floor((gregorianDay + 10) % 30) + 1;
    
    return `${hijriDay} ${hijriMonth} ${hijriYear} H`;
  };

  const hijriDate = getHijriDate(date);

  return (
    <div className="bg-gradient-to-br from-amber-400/90 to-amber-500/90 backdrop-blur-md border-2 border-teal-400 rounded-lg px-6 py-3 shadow-lg">
      <div className="text-right">
        <p className="text-teal-900 text-xl mb-1">{gregorianDate}</p>
        <p className="text-teal-800">{hijriDate}</p>
      </div>
    </div>
  );
}