import { useState } from "react";

const Usestate = () => {
  const [count, setCount] = useState(0);

  const increaseNum = () => {
    setCount((count) => count + 1);
  };
  const decreaseNum = () => {
    setCount((count) => Math.max(0, count - 1));
  };
  const resetToZero = () => {
    setCount(0);
  };
  return (
    <>
      <div className="card">
        <h1>Counter:{count}</h1>
        <button onClick={increaseNum}>Increment</button>
        <button onClick={decreaseNum}>Decrement</button>
        <button onClick={resetToZero}>Reset</button>
      </div>
    </>
  );
};

export default Usestate;
