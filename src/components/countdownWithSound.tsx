import Countdown from "react-countdown";
import tickingSoundSource from "../sound/clock-ticking.mp3";
import React, { useEffect, useRef } from "react";

const countdownRenderer = ({ seconds }: { seconds: number }) => (
  // definiamo stile personalizzato
  <span className="text-danger font-bold text-3xl -mt-2">{seconds}</span>
);

interface Props {
  startCountdown: boolean;
  handleCountdownEnd: (placeholder: string) => void;
}

const CountdownComponent: React.FC<Props> = ({
  startCountdown,
  handleCountdownEnd,
}: Props) => {
  // aggiunta suono
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <>
      {startCountdown && (
        <>
          <Countdown
            autoStart={true}
            date={Date.now() + 10000}
            renderer={countdownRenderer}
            onMount={() => {
              if (audioRef.current) {
                audioRef.current.volume = 0.1;
                audioRef.current.play();
              }
            }}
            onComplete={() => handleCountdownEnd("")}
          />
          <audio id="tick_sound" src={tickingSoundSource} ref={audioRef} />
        </>
      )}
    </>
  );
};

export default CountdownComponent;
