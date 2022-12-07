import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

interface TimerProps {
  time: number;
  totalTime: number;
}

const width = Dimensions.get("window").width;

export const Timer: React.FunctionComponent<TimerProps> = (
  props: TimerProps
) => {
  return (
    <View style={styles.container}>
      {Math.sign(props.time) === 1 && (
        <Text
          style={styles.timerMinutes}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {("0" + Math.floor((props.time / 60000) % 60)).slice(-2) + ":"}
        </Text>
      )}
      <Text
        style={styles.timerSeconds}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
      </Text>
      <Text
        style={styles.timerMilliseconds}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </Text>
      <Text style={styles.footerText}>
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
    flex: 1,
    // borderWidth: 2,
    // borderColor: "pink",
    // borderStyle: "dashed",
  },
  timerMinutes: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: "blue",
    // borderStyle: "dashed",
    fontSize: width,
    textAlign: "center",
    color:"#30231c",
  },
  timerSeconds: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: "green",
    // borderStyle: "dashed",
    fontSize: width,
    textAlign: "center",
    color:"#30231c",
  },
  timerMilliseconds: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: "orange",
    // borderStyle: "dashed",
    fontSize: width,
    textAlign: "center",
    color:"#30231c",
  },
  footerText: {
    textAlign: "center",
    fontSize: 20,
    color:"#30231c",
  },
});
