import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ControlButtons } from "./controlButtons";
import { Timer } from "./timer";

interface StopWatchProps {
  delayMilli: number; // in milliseconds
  totalTimeMilli: number; // in milliseconds
}

export const StopWatch: React.FunctionComponent<StopWatchProps> = (
  props: StopWatchProps
) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

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

  return (
    <View>
      <Timer time={time - props.delayMilli} totalTime={props.totalTimeMilli} />
      <ControlButtons
        active={isActive}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
        handleStart={handleStart}
        isPaused={isPaused}
      />
    </View>
  );
};
