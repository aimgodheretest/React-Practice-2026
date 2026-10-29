import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [show, setShow] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      console.log("first");
    }, 1000);
  });
  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {show && <h1>Current Time :{time}</h1>}
    </div>
  );
};

export default Clock;
