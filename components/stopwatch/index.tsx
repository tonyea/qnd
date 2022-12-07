import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ControlButtons } from "./controlButtons";
import { Timer } from "./timer";
import * as Speech from "expo-speech";

interface StopWatchProps {
  totalTimeMilli: number; // in milliseconds
  alertTimes: IntervalType[]; // in milliseconds
  beginSetSpeechOne: string;
  beginSetSpeechTwo: string;
}

export type IntervalType = {
  intervalTime: number;
  setType: "one" | "two";
  readyTime: number;
};

export const StopWatch: React.FunctionComponent<StopWatchProps> = (
  props: StopWatchProps
) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [delay, setDelay] = useState(3000); // default delay 9 seconds

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && !isPaused) {
      // every 10 milliseconds update the timer
      interval = setInterval(() => {
        setTime((time) => {
          const matchedTime = props.alertTimes.find(
            (at) => at.intervalTime === time - delay
          );
          const matchedReadyTime = props.alertTimes.find(
            (at) => at.readyTime === time - delay
          );
          if (matchedTime) {
            if (matchedTime.setType === "one")
              Speech.speak(props.beginSetSpeechOne); // if type one set
            else if (matchedTime.setType === "two")
              Speech.speak(props.beginSetSpeechTwo); // if type two set
          }
          if (matchedReadyTime) {
            Speech.speak("ten seconds"); // alert ready
          }
          // finish timer
          if (interval && time === props.totalTimeMilli) {
            clearInterval(interval);
            return time;
          }
          return time + 10;
        });
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
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    // borderColor: "blue",
    // borderStyle: "dashed",
    flex: 1,
  },
});
