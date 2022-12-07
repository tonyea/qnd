import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

interface ControlButtonsProps {
  handleStart: () => void;
  handleReset: () => void;
  handlePauseResume: () => void;
  handleDelayToggle: () => void;
  isPaused: boolean;
  active: boolean;
}
export const ControlButtons: React.FunctionComponent<ControlButtonsProps> = (
  props: ControlButtonsProps
) => {
  const StartButton = (
    <View>
      <Button title="Start" type="clear" onPress={props.handleStart} />
      <Button title="Delay" type="solid" onPress={props.handleDelayToggle} />
    </View>
  );
  const ActiveButtons = (
    <View>
      <Button title="Reset" type="clear" onPress={props.handleReset} />
      <Button
        title={props.isPaused ? "Resume" : "Pause"}
        type="clear"
        onPress={props.handlePauseResume}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View>{props.active ? ActiveButtons : StartButton}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    // borderColor: "red",
    // borderStyle: "dashed",
  },
});

