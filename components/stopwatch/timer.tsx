import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface TimerProps {
  time: number;
  totalTime: number;
}

export const Timer: React.FunctionComponent<TimerProps> = (
  props: TimerProps
) => {
  console.log("TBDT PROPS", Math.sign(props.time));
  return (
    <View style={styles.container}>
      <Text>
        {Math.sign(props.time) === 1 &&
          ("0" + Math.floor((props.time / 60000) % 60)).slice(-2) + ":"}
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2) + "."}
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </Text>
      <Text>
        {""}
        Total Time:
        {" " + Math.floor((props.totalTime / 60000) % 60) + ":"}
        {("0" + Math.floor((props.totalTime / 1000) % 60)).slice(-2) + "."}
        {("0" + ((props.totalTime / 10) % 100)).slice(-2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "blue",
    borderStyle: "dashed",
  },
});
