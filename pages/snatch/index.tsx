import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Header } from "@rneui/themed";
import { IntervalType, StopWatch } from "../../components/stopwatch";
import { BottomSheet, ListItem } from "@rneui/themed";

interface SnatchPageProps {
  diceRoll: number;
}

type Variant = "five" | "ten";

export const SnatchPage: React.FunctionComponent<SnatchPageProps> = (
  props: SnatchPageProps
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [numberOfSets, setNumberOfSets] = useState(2);
  const [variant, setVariant] = useState<Variant>("five");

  useEffect(() => {
    if (props.diceRoll === 1) setNumberOfSets(2);
    if (props.diceRoll === 2 || props.diceRoll === 3) setNumberOfSets(3);
    if (props.diceRoll === 4 || props.diceRoll === 5) setNumberOfSets(4);
    if (props.diceRoll === 6) setNumberOfSets(5);
  }, [props.diceRoll]);

  const variantList = [
    {
      title: "Snatch 5x Variant",
      onPress: () => {
        setVariant("five");
        setIsVisible(false);
      },
    },
    {
      title: "Snatch 10x Variant",
      onPress: () => {
        setVariant("ten");
        setIsVisible(false);
      },
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  const totalTime = useCallback(() => {
    return numberOfSets * 4 * 60 * 1000 - 120000; // each snatch set is 4 minutes less 2 minutes for last session rest
  }, [numberOfSets]);

  const alertTimes = useCallback(() => {
    // if five rep variant then sets start every 30 seconds
    let alertIntervals: IntervalType[] = [];
    if (variant === "five") {
      for (let i = 0; i <= numberOfSets - 1; i++) {
        const intervalStartTime = i * 4 * 60 * 1000; // in milliseconds
        const setType = i % 2 === 0 ? "one" : "two";
        alertIntervals.push(
          { intervalTime: intervalStartTime, setType },
          { intervalTime: intervalStartTime + 30000, setType },
          { intervalTime: intervalStartTime + 60000, setType },
          { intervalTime: intervalStartTime + 90000, setType }
        );
      }
    } else if (variant === "ten") {
      for (let i = 0; i <= numberOfSets - 1; i++) {
        const intervalStartTime = i * 4 * 60 * 1000; // in milliseconds
        const setType = i % 2 === 0 ? "one" : "two";
        alertIntervals.push(
          { intervalTime: intervalStartTime, setType },
          { intervalTime: intervalStartTime + 60000, setType }
        );
      }
    }
    return alertIntervals;
  }, [numberOfSets, variant]);

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: variant === "five" ? "Snatch 5x Variant" : "Snatch 10x Variant",
          style: styles.heading,
          onPress: () => setIsVisible(true),
        }}
      />
      <Text>Series 1 of {numberOfSets}</Text>
      <Text>Kettlebell Snatches</Text>
      <StopWatch
        totalTimeMilli={totalTime()}
        alertTimes={alertTimes()}
        beginSetSpeechOne={"Snatch, five reps left handed"}
        beginSetSpeechTwo={"Snatch, five reps right handed"}
      />
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {variantList.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
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
