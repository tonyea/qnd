import React, { useCallback, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Header } from "@rneui/themed";
import { StopWatch } from "../../components/stopwatch";

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
    let alertIntervals: number[] = [];
    if (props.variant === "five") {
      for (let i = 0; i <= props.sets - 1; i++) {
        const intervalStartTime = i * 4 * 60 * 1000; // in milliseconds
        alertIntervals.push(
          intervalStartTime,
          intervalStartTime + 30000,
          intervalStartTime + 60000,
          intervalStartTime + 90000
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
        beginSetSpeech={"Snatch, five reps left handed"}
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
