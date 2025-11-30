import { DigitalClock } from "./components/DigitalClock";
import { DateDisplay } from "./components/DateDisplay";
import { PrayerTimes } from "./components/PrayerTimes";
import { InfoSlider } from "./components/InfoSlider";
import { RunningText } from "./components/RunningText";
import { AdzanNotification } from "./components/AdzanNotification";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 via-cyan-900/75 to-teal-900/80" />
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}/>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-6">
        {/* Header Section with Logo */}
        <div className="flex items-center justify-between mb-6 gap-6">
          {/* Left: Logo and Mosque Name */}
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-4 shadow-xl border-2 border-amber-300">
              <svg className="w-20 h-20 text-amber-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L12 6M12 6C10.5 6 9 7 9 8.5V10H15V8.5C15 7 13.5 6 12 6Z" strokeLinecap="round"/>
                <path d="M4 10H20V22H4V10Z" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="16" r="2"/>
                <path d="M7 10V8C7 6 8 4 12 4C16 4 17 6 17 8V10" strokeLinecap="round"/>
                <rect x="10" y="18" width="4" height="4" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-amber-200 text-4xl drop-shadow-lg">MASJID</h1>
              <h2 className="text-amber-300 text-5xl drop-shadow-lg" style={{fontFamily: 'Georgia, serif'}}>AL-IKHLAS</h2>
              <p className="text-teal-200 text-sm mt-1 drop-shadow">Jl. Contoh No. 123, Jakarta</p>
            </div>
          </div>

          {/* Right: Clock and Date */}
          <div className="flex flex-col items-end gap-3">
            <DigitalClock />
            <DateDisplay />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Prayer Times Section */}
          <div className="lg:col-span-2">
            <PrayerTimes />
          </div>

          {/* Info Section - Now wider */}
          <div className="lg:col-span-3">
            <InfoSlider />
          </div>
        </div>

        {/* Footer with Running Text */}
        <div className="mt-6">
          <RunningText />
        </div>
      </div>

      {/* Adzan Notification */}
      <AdzanNotification />
    </div>
  );
}