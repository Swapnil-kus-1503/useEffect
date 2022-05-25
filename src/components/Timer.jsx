import React from "react";

const Timer = () => {
  const [timer, setTimer] = React.useState(1);
  //   React.useEffect(() => {
  //     let id = setInterval(() => {
  //       setTimer((prev) => prev - 1);
  //     }, 1000);

  //     return () => {
  //       clearInterval(id);
  //     };
  //   }, []);

  React.useEffect(() => {
    let id = setInterval(() => {
      if (timer > 100) {
        clearInterval(id);
      } else {
        setTimer(timer + 1);
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [timer]);

  return <div>Count Up: {timer}</div>;
};

export default Timer;
