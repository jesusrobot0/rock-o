import { useEffect, useState } from "react";

const AudioWave = () => {
  const [wave, setWave] = useState(Array(60).fill(0));
  const [output, setOutput] = useState("INICIANDO SISTEMA...");
  const [networkLevel, setNetworkLevel] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [isListening, setIsListening] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [volume, setVolume] = useState(50);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [weather, setWeather] = useState("SOLEADO 25°C");

  useEffect(() => {
    const interval = setInterval(() => {
      setWave(
        wave.map((_, i) => {
          const frequency = Math.sin(Date.now() / 150 + i / 1.5) * 35;
          const amplitude = Math.cos(Date.now() / 200 + i / 2) * 30;
          const randomness = (Math.random() - 0.5) * 30;
          return frequency + amplitude + randomness;
        })
      );

      setNetworkLevel(Math.floor(Math.random() * 3));
      setRamUsage(Math.floor(Math.random() * 3));
      setCpuUsage(Math.floor(Math.random() * 3));
      setTime(new Date().toLocaleTimeString());
      setIsListening((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, [wave]);

  const renderTrafficLight = (level, label) => (
    <div className="flex flex-col items-center space-y-1">
      <div
        className={`w-4 h-4 rounded-full ${
          level >= 2 ? "bg-red-500" : "bg-gray-700"
        }`}
        style={{ boxShadow: level >= 2 ? "0 0 10px red" : "none" }}
      ></div>
      <div
        className={`w-4 h-4 rounded-full ${
          level >= 1 ? "bg-orange-500" : "bg-gray-700"
        }`}
        style={{ boxShadow: level >= 1 ? "0 0 10px orange" : "none" }}
      ></div>
      <div
        className={`w-4 h-4 rounded-full ${
          level >= 0 ? "bg-green-500" : "bg-gray-700"
        }`}
        style={{ boxShadow: level >= 0 ? "0 0 10px lime" : "none" }}
      ></div>
      <div className="text-gray-400 text-xs mt-1">{label}</div>
    </div>
  );

  const getWeatherIcon = (weather) => {
    return weather.includes("SOLEADO") ? "☀️" : "❄️";
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-800 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #b0b0b0, #707070)",
        border: "16px solid #555",
        boxShadow: "0 0 20px #444, inset 0 0 20px #333, inset 0 0 10px #666",
        borderRadius: "0px",
        padding: "0px",
        borderTop: "20px solid #888",
        borderBottom: "20px solid #444",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-black to-neutral-900 rounded-sm border-8 border-neutral-700 p-4 relative overflow-hidden shadow-inner">
        <div className="absolute top-4 left-4 text-green-400 text-lg font-mono flex items-center">
          <span>{getWeatherIcon(weather)}</span>
          <span className="ml-2">{weather}</span>
        </div>
        <div className="absolute top-4 right-4 text-green-400 text-lg font-mono">
          {time}
        </div>

        <div className="absolute bottom-4 right-4 flex space-x-4">
          {renderTrafficLight(networkLevel, "RED")}
          {renderTrafficLight(ramUsage, "RAM")}
          {renderTrafficLight(cpuUsage, "CPU")}
        </div>

        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-green-400"></div>

        <div className="flex items-center h-full">
          {wave.map((value, index) => (
            <div
              key={index}
              className="mx-1 w-3 bg-green-400 rounded-sm"
              style={{
                height: `${Math.abs(value) + 20}px`,
                transform: `translateY(${value > 0 ? "-" : ""}${
                  Math.abs(value) / 2
                }px)`,
                transition:
                  "transform 0.05s ease-in-out, height 0.05s ease-in-out",
                boxShadow: "0 0 10px lime",
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between items-center mt-4 mb-4 px-20 h-24">
        <div className="flex items-center space-x-8">
          <button
            onClick={() => setVolume((prev) => Math.max(0, prev - 10))}
            className="w-20 h-20 rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900 border-4 border-t-neutral-600 border-b-neutral-900 border-x-neutral-800 shadow-inner active:from-neutral-800 active:to-neutral-900 active:scale-95 active:border-t-neutral-700 transform transition-all duration-100 hover:shadow-lg flex items-center justify-center"
            style={{
              boxShadow:
                "inset 0 2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <span className="text-neutral-400 text-4xl font-bold select-none">
              -
            </span>
          </button>
          <div className="font-mono text-green-400 text-3xl bg-black px-6 py-2 rounded border border-neutral-800 shadow-inner">
            {volume}%
          </div>
          <button
            onClick={() => setVolume((prev) => Math.min(100, prev + 10))}
            className="w-20 h-20 rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900 border-4 border-t-neutral-600 border-b-neutral-900 border-x-neutral-800 shadow-inner active:from-neutral-800 active:to-neutral-900 active:scale-95 active:border-t-neutral-700 transform transition-all duration-100 hover:shadow-lg flex items-center justify-center"
            style={{
              boxShadow:
                "inset 0 2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <span className="text-neutral-400 text-4xl font-bold select-none">
              +
            </span>
          </button>
        </div>

        <div
          className=" absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-['VT323'] text-2xl"
          style={{
            background: "linear-gradient(145deg, #e0e0e0, #a0a0a0)",
            padding: "0.45rem 1.2rem",
            border: "1px solid #555",
            boxShadow: "0 0 5px rgba(0,0,0,0.2), inset 0 0 5px rgba(0,0,0,0.1)",
            position: "absolute",
            borderRadius: "2px",
            zIndex: 10,
            marginTop: "395px",
          }}
        >
          {/* Remaches */}
          <div className="absolute -left-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-500"></div>
          <div className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-500"></div>
          <div className="absolute -left-0.5 -bottom-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-500"></div>
          <div className="absolute -right-0.5 -bottom-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-500"></div>

          <span
            style={{
              color: "#666",
              letterSpacing: "0.1em",
              fontWeight: "normal",
            }}
          >
            ROCK-O Matic 5000
          </span>
        </div>

        <div className="flex space-x-8">
          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm font-['VT323'] text-neutral-200 uppercase">
              ROCK-O
            </span>
            <label className="relative inline-flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={isPowerOn}
                onChange={() => setIsPowerOn(!isPowerOn)}
                className="sr-only peer"
              />
              <div className="w-24 h-12 bg-gradient-to-b from-neutral-900 to-neutral-800 rounded-none peer relative border-2 border-neutral-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-500 border-2 border-t-neutral-300 border-b-neutral-600 border-x-neutral-400 transform transition-transform duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${
                      isPowerOn ? "translate-x-full" : "translate-x-0"
                    }`}
                    style={{
                      boxShadow: `
                        inset 0 -4px 8px rgba(0,0,0,0.2),
                        inset 0 4px 8px rgba(255,255,255,0.2),
                        0 2px 4px rgba(0,0,0,0.4)
                      `,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-10"></div>
                  </div>
                </div>
              </div>
            </label>
          </div>

          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm font-['VT323'] text-neutral-200 uppercase">
              Micrófono
            </span>
            <label className="relative inline-flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={isMicrophoneOn}
                onChange={() => setIsMicrophoneOn(!isMicrophoneOn)}
                className="sr-only peer"
              />
              <div className="w-24 h-12 bg-gradient-to-b from-neutral-900 to-neutral-800 rounded-none peer relative border-2 border-neutral-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-500 border-2 border-t-neutral-300 border-b-neutral-600 border-x-neutral-400 transform transition-transform duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${
                      isMicrophoneOn ? "translate-x-full" : "translate-x-0"
                    }`}
                    style={{
                      boxShadow: `
                        inset 0 -4px 8px rgba(0,0,0,0.2),
                        inset 0 4px 8px rgba(255,255,255,0.2),
                        0 2px 4px rgba(0,0,0,0.4)
                      `,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-10"></div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioWave;
