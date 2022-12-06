import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ControlButtons } from "./controlButtons";
import { Timer } from "./timer";

interface StopWatchProps {
  totalTimeMilli: number; // in milliseconds
}

export const StopWatch: React.FunctionComponent<StopWatchProps> = (
  props: StopWatchProps
) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [delay, setDelay] = useState(9000); // default delay 9 seconds

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      interval && clearInterval(interval);
    }
    return () => {
      interval && clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const handleDelayToggle = () => {
    if (delay === 9000) setDelay(6000);
    if (delay === 6000) setDelay(3000);
    if (delay === 3000) setDelay(0);
    if (delay === 0) setDelay(9000);
  };

  return (
    <View>
      <Timer time={time - delay} totalTime={props.totalTimeMilli} />
      <ControlButtons
        active={isActive}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
        handleStart={handleStart}
        handleDelayToggle={handleDelayToggle}
        isPaused={isPaused}
      />
    </View>
  );
};
