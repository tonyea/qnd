import React, { useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Header } from "@rneui/themed";
import { IntervalType, StopWatch } from "../../components/stopwatch";

interface SnatchPageProps {
  sets: number;
  variant: "five" | "ten";
}

export const SnatchPage: React.FunctionComponent<SnatchPageProps> = (
  props: SnatchPageProps
) => {
  const totalTime = useCallback(() => {
    return props.sets * 4 * 60 * 1000; // each snatch set is 4 minutes
  }, [props.sets]);

  const alertTimes = useCallback(() => {
    // if five rep variant then sets start every 30 seconds
    let alertIntervals: IntervalType[] = [];
    if (props.variant === "five") {
      for (let i = 0; i <= props.sets - 1; i++) {
        const intervalStartTime = i * 4 * 60 * 1000; // in milliseconds
        const setType = i % 2 === 0 ? "one" : "two";
        alertIntervals.push(
          { intervalTime: intervalStartTime, setType },
          { intervalTime: intervalStartTime + 30000, setType },
          { intervalTime: intervalStartTime + 60000, setType },
          { intervalTime: intervalStartTime + 90000, setType }
        );
      }
    } else if (props.variant === "ten") {
      for (let i = 0; i <= props.sets - 1; i++) {
        const intervalStartTime = i * 4 * 60 * 1000; // in milliseconds
        const setType = i % 2 === 0 ? "one" : "two";
        alertIntervals.push(
          { intervalTime: intervalStartTime, setType },
          { intervalTime: intervalStartTime + 60000, setType }
        );
      }
    }
    return alertIntervals;
  }, [props.sets]);

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: "Snatch 5x Variant", style: styles.heading }}
      />
      <Text>Series 1 of 5</Text>
      <Text>Kettlebell Snatches</Text>
      <StopWatch
        totalTimeMilli={totalTime()}
        alertTimes={alertTimes()}
        beginSetSpeechOne={"Snatch, five reps left handed"}
        beginSetSpeechTwo={"Snatch, five reps right handed"}
      />
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
    height: "100%",
  },
});
