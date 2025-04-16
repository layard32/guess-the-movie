import Countdown from "react-countdown";

const countdownRenderer = ({ seconds }: { seconds: number }) => (
  <span>{seconds}</span>
);

const CountdownComponent: React.FC = () => {
  return (
    <div>
      <Countdown date={Date.now() + 5000} renderer={countdownRenderer} />
    </div>
  );
};

export default CountdownComponent;
