import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Header } from "@rneui/themed";
import { IntervalType, StopWatch } from "../../components/stopwatch";
import { BottomSheet, ListItem } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import { DiceRollModal } from "../../components/diceRollModal";
import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import { match } from "fp-ts/boolean";
import { makeBy } from "fp-ts/Array";

type Variant = "five" | "ten";
type Workout = "swing" | "snatch";

const getSeriesTime = (): number => {
  return 2;
};

export const QnDPage: React.FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [diceModalIsVisible, setDiceModalIsVisible] = useState(false);
  const [numberofSeries, setNumberOfSeries] = useState(2);
  const [diceRoll, setDiceRoll] = useState(2);
  const [variant, setVariant] = useState<Variant>("five");
  const [workout, setWorkout] = useState<Workout>("snatch");

  useEffect(() => {
    if (diceRoll === 1) setNumberOfSeries(2);
    if (diceRoll === 2 || diceRoll === 3) setNumberOfSeries(3);
    if (diceRoll === 4 || diceRoll === 5) setNumberOfSeries(4);
    if (diceRoll === 6) setNumberOfSeries(5);
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

  const getSeriesTime = useCallback((workout: Workout) => {
    return workout === "snatch" ? 240000 : 180000; // in milliseconds
  }, []);

  const totalTime = useCallback(() => {
    // TODO: Option or Either
    const restTime = workout === "snatch" ? 120000 : 60000;
    return numberofSeries * getSeriesTime(workout) - restTime; // each snatch set is 4 minutes less 2 minutes for last session rest; 1 minute if swings
  }, [numberofSeries, workout]);

  // return an array of alert times for the ten rep variant
  const getAlertTimes = useCallback(
    (setsPerSeries: number, timePerSet: number): IntervalType[] => {
      return pipe(
        makeBy(
          numberofSeries,
          (i: number) => ({
            seriesNum: i,
            sets: makeBy(setsPerSeries, (i: number) => i),
          }) // 2 sets per series for ten rep variant // will return an array like [[0, [0, 1]], [1, [0, 1]], [2, [0, 1]]] for each set if 3 series
        ),
        A.map((series) => {
          return series.sets.map((set) => {
            const intervalTime =
              series.seriesNum * getSeriesTime(workout) + set * timePerSet;
            return {
              intervalTime,
              setType:
                series.seriesNum % 2 === 0
                  ? ("one" as const)
                  : ("two" as const),
              readyTime: intervalTime - 10000,
            };
          });
        }),
        A.flatten
      );
    },
    [numberofSeries, workout]
  );

  const alertTimes = useCallback(() => {
    // TODO: Option or Either with Array
    // if five rep variant then sets start every 30 seconds
    // let alertIntervals: IntervalType[] = [];
    // if (variant === "five") {
    //   for (let i = 0; i <= numberofSeries - 1; i++) {
    //     const intervalStartTime = i * getSeriesTime(workout) * 60 * 1000; // in milliseconds
    //     const setType = i % 2 === 0 ? "one" : "two";
    //     alertIntervals.push(
    //       {
    //         intervalTime: intervalStartTime,
    //         setType,
    //         readyTime: intervalStartTime - 10000,
    //       },
    //       {
    //         intervalTime: intervalStartTime + 30000,
    //         setType,
    //         readyTime: intervalStartTime + 20000,
    //       },
    //       {
    //         intervalTime: intervalStartTime + 60000,
    //         setType,
    //         readyTime: intervalStartTime + 50000,
    //       },
    //       {
    //         intervalTime: intervalStartTime + 90000,
    //         setType,
    //         readyTime: intervalStartTime + 80000,
    //       }
    //     );
    //   }
    // } else if (variant === "ten") {
    //   for (let i = 0; i <= numberofSeries - 1; i++) {
    //     const intervalStartTime = i * getSeriesTime(workout) * 60 * 1000; // in milliseconds
    //     const setType = i % 2 === 0 ? "one" : "two";
    //     alertIntervals.push(
    //       {
    //         intervalTime: intervalStartTime,
    //         setType,
    //         readyTime: intervalStartTime - 10000,
    //       },
    //       {
    //         intervalTime: intervalStartTime + 60000,
    //         setType,
    //         readyTime: intervalStartTime + 60000,
    //       }
    //     );
    //   }
    // }
    // return alertIntervals;

    const test = pipe(
      variant,
      (v) => v === "five", // returns boolean
      match(
        () => getAlertTimes(2, 60000), // get alert times for ten rep variant
        () => getAlertTimes(4, 30000) // get alert times for five variant
      )
    );

    console.log("test", test);
    return test;
  }, [numberofSeries, variant]);

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
          <Icon
            name="dice"
            type="font-awesome-5"
            color="white"
            onPress={() => setDiceModalIsVisible(true)}
          />
        }
      />
      <DiceRollModal
        isVisible={diceModalIsVisible}
        toggleModal={toggleDiceModal}
        setRollAmount={setDiceRoll}
        rollAmount={diceRoll}
      />
      <Text style={styles.titleText}>{`Kettlebell ${
        workout === "swing" ? "swings and pushups" : "snatches"
      }`}</Text>
      <StopWatch
        totalTimeMilli={totalTime()}
        alertTimes={alertTimes()}
        beginSetSpeechOne={`${workout}, ${variant} reps left handed`}
        beginSetSpeechTwo={`${
          workout === "swing" ? "pushups" : workout
        }, ${variant} reps ${workout === "swing" ? "" : "right handed"}`}
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
    // borderWidth: 2,
    // borderColor: "pink",
    // borderStyle: "dashed",
    height: "100%",
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
  },
});
