import React, { useState, useEffect }  from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Header } from "@rneui/themed";
import { StopWatch } from "../../components/stopwatch";
import { ControlButtons } from "../../components/controlButtons";

interface SnatchPageProps {
  sets: number;
}

export const SnatchPage: React.FunctionComponent<SnatchPageProps> = (
  props: SnatchPageProps
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
    <View style={styles.container}>
      <Header
        centerComponent={{ text: "Snatch 5x Variant", style: styles.heading }}
      />
      <Button title="Full Screen" type="clear" />
      <Text>Series 1 of 5</Text>
      <Text>Kettlebell Snatches</Text>
      <StopWatch delay={9} time={time} />
      <ControlButtons active={isActive} handlePauseResume={handlePauseResume} handleReset={handleReset} handleStart={handleStart} isPaused={isPaused}/>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    borderWidth: 2,
    borderColor: "red",
    borderStyle: "dashed",
    height: "100%"
  },
});
