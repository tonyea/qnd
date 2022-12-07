import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Header } from "@rneui/themed";
import { IntervalType, StopWatch } from "../../components/stopwatch";
import { BottomSheet, ListItem } from "@rneui/themed";
import { Link } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { DiceRollModal } from "../../components/diceRollModal";

type Variant = "five" | "ten";
type Workout = "swing" | "snatch";

export const SnatchPage: React.FunctionComponent = () => {
  console.log("TBDT 100 SnatchPage");
  const [isVisible, setIsVisible] = useState(false);
  const [diceModalIsVisible, setDiceModalIsVisible] = useState(false);
  const [numberOfSets, setNumberOfSets] = useState(2);
  const [diceRoll, setDiceRoll] = useState(2);
  const [variant, setVariant] = useState<Variant>("five");
  const [workout, setWorkout] = useState<Workout>("snatch");

  useEffect(() => {
    if (diceRoll === 1) setNumberOfSets(2);
    if (diceRoll === 2 || diceRoll === 3) setNumberOfSets(3);
    if (diceRoll === 4 || diceRoll === 5) setNumberOfSets(4);
    if (diceRoll === 6) setNumberOfSets(5);
  }, [diceRoll]);

  const toggleDiceModal = () => {
    setDiceModalIsVisible(!diceModalIsVisible);
  };

  const variantList = [
    {
      title: "Snatch 5x Variant",
      onPress: () => {
        setVariant("five");
        setWorkout("snatch");
        setIsVisible(false);
      },
    },
    {
      title: "Snatch 10x Variant",
      onPress: () => {
        setVariant("ten");
        setWorkout("snatch");
        setIsVisible(false);
      },
    },
    {
      title: "Swing 5x Variant",
      onPress: () => {
        setVariant("five");
        setWorkout("swing");
        setIsVisible(false);
      },
    },
    {
      title: "Swing 10x Variant",
      onPress: () => {
        setVariant("ten");
        setWorkout("swing");
        setIsVisible(false);
      },
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "#c64d00" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  const totalTime = useCallback(() => {
    const seriesTime = workout === "snatch" ? 4 : 3;
    return numberOfSets * seriesTime * 60 * 1000 - 120000; // each snatch set is 4 minutes less 2 minutes for last session rest
  }, [numberOfSets]);

  const alertTimes = useCallback(() => {
    const seriesTime = workout === "snatch" ? 4 : 3;
    // if five rep variant then sets start every 30 seconds
    let alertIntervals: IntervalType[] = [];
    if (variant === "five") {
      for (let i = 0; i <= numberOfSets - 1; i++) {
        const intervalStartTime = i * seriesTime * 60 * 1000; // in milliseconds
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
        const intervalStartTime = i * seriesTime * 60 * 1000; // in milliseconds
        const setType = i % 2 === 0 ? "one" : "two";
        alertIntervals.push(
          { intervalTime: intervalStartTime, setType },
          { intervalTime: intervalStartTime + 60000, setType }
        );
      }
    }
    return alertIntervals;
  }, [numberOfSets, variant]);

  const headerText = useCallback(() => {
    if (workout === "snatch" && variant === "five") return "Snatch 5x Variant";
    else if (workout === "snatch" && variant === "ten")
      return "Snatch 10x Variant";
    else if (workout === "swing" && variant === "five")
      return "Swing 5x Variant";
    else if (workout === "swing" && variant === "ten")
      return "Swing 10x Variant";
  }, [variant, workout]);

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: headerText(),
          style: styles.heading,
          onPress: () => setIsVisible(true),
        }}
        rightComponent={
          <Link onPress={() => console.log("TEST")} to="">
            <Icon
              name="dice"
              type="font-awesome-5"
              color="white"
              onPress={() => setDiceModalIsVisible(true)}
            />
          </Link>
        }
      />
      <DiceRollModal
        isVisible={diceModalIsVisible}
        toggleModal={toggleDiceModal}
        setRollAmount={setDiceRoll}
        rollAmount={diceRoll}
      />
      <Text>Series 1 of {numberOfSets}</Text>
      <Text>{`Kettlebell ${workout === "swing" ? "swings" : "snatches"}`}</Text>
      <StopWatch
        totalTimeMilli={totalTime()}
        alertTimes={alertTimes()}
        beginSetSpeechOne={`${workout}, ${variant} reps left handed`}
        beginSetSpeechTwo={`${workout}, ${variant} reps right handed`}
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
