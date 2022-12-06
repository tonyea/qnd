import React from "react";
import { View } from "react-native";
import * as Speech from "expo-speech";
import { Button } from "@rneui/themed";

interface ControlButtonsProps {
  handleStart: () => void;
  handleReset: () => void;
  handlePauseResume: () => void;
  isPaused: boolean;
  active: boolean;
}
export const ControlButtons: React.FunctionComponent<ControlButtonsProps> = (
  props: ControlButtonsProps
) => {
  const speak = () => {
    const thingToSay = "Start Snatches";
    Speech.speak(thingToSay);
  };

  const StartButton = (
    <Button title="Start" type="clear" onPress={props.handleStart} />
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
    <View>
      <View>{props.active ? ActiveButtons : StartButton}</View>
    </View>
  );
};
