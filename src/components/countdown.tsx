import Countdown from "react-countdown";

const countdownRenderer = ({ seconds }: { seconds: number }) => (
  <span>{seconds}</span>
);

const CountdownComponent: React.FC = () => {
  // todo: definire stile, aggiungere suono e aggiungere fuznione callback quando finisce

  return (
    <div>
      <Countdown date={Date.now() + 5000} renderer={countdownRenderer} />
    </div>
  );
};

export default CountdownComponent;
