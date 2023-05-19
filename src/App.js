import React, { useState, useEffect } from "react";

const TrafficLight = () => {
  const [signal, setSignal] = useState("red");

  const [time, setTime] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timerDuration = {
      red: 60,

      yellow: 30,

      green: 120
    };

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);

          switchSignal();

          return timerDuration[signal];
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [signal]);

  const switchSignal = () => {
    setSignal((prevSignal) => {
      if (prevSignal === "red") {
        return "yellow";
      } else if (prevSignal === "yellow") {
        return "green";
      } else {
        return "red";
      }
    });

    setTime(60);
  };

  const handleSignalClick = (newSignal) => {
    setSignal(newSignal);

    setTime(newSignal === "red" ? 60 : newSignal === "yellow" ? 30 : 120);
  };

  const lightStyles = {
    red: {
      backgroundColor: signal === "red" ? "red" : "darkred"
    },

    yellow: {
      backgroundColor: signal === "yellow" ? "yellow" : "darkgoldenrod"
    },

    green: {
      backgroundColor: signal === "green" ? "limegreen" : "darkgreen"
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="traffic-light">
        <div
          className="light red"
          style={lightStyles.red}
          onClick={() => handleSignalClick("red")}
        >
          {signal === "red" && <div className="timer">{formatTime(time)}</div>}

          <span>Stop</span>
        </div>

        <div
          className="light yellow"
          style={lightStyles.yellow}
          onClick={() => handleSignalClick("yellow")}
        >
          {signal === "yellow" && (
            <div className="timer">{formatTime(time)}</div>
          )}

          <span>Ready</span>
        </div>

        <div
          className="light green"
          style={lightStyles.green}
          onClick={() => handleSignalClick("green")}
        >
          {signal === "green" && (
            <div className="timer">{formatTime(time)}</div>
          )}

          <span>Go</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficLight;
