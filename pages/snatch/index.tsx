import React, { useCallback, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Header } from "@rneui/themed";
import { StopWatch } from "../../components/stopwatch";

interface SnatchPageProps {
  sets: number;
}

export const SnatchPage: React.FunctionComponent<SnatchPageProps> = (
  props: SnatchPageProps
) => {
  const totalTime = useCallback(() => {
    return props.sets * 4 * 60 * 1000; // each snatch set is 4 minutes
  }, [props.sets]);

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: "Snatch 5x Variant", style: styles.heading }}
      />
      <Button title="Full Screen" type="clear" />
      <Text>Series 1 of 5</Text>
      <Text>Kettlebell Snatches</Text>
      <StopWatch delayMilli={9000} totalTimeMilli={totalTime()} />
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
