import React from "react";
import { View, StyleSheet,Text } from "react-native";

interface StopWatchProps {
  delay: number;
  time: number
}

export const StopWatch: React.FunctionComponent<StopWatchProps> = (
  props: StopWatchProps
) => {

  return (
    <View style={styles.container}>
      <Text>
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </Text>
      <Text>
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </Text>
      <Text>
        {("0" + ((props.time / 10) % 100)).slice(-2)}
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
  
