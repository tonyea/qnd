import React, { useCallback } from "react";
import { Overlay, Button, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";

type DiceRollModalProps = {
  toggleModal: () => void;
  isVisible: boolean;
  setRollAmount: (roll: number) => void;
  rollAmount: number;
};

export const DiceRollModal: React.FunctionComponent<DiceRollModalProps> = (
  props: DiceRollModalProps
) => {
  const { toggleModal, isVisible, setRollAmount, rollAmount } = props;

  const rollTheDie = useCallback(() => {
    setRollAmount(Math.floor(Math.random() * 6) + 1);
  }, [rollAmount]);

  return (
    <Overlay isVisible={isVisible} onBackdropPress={toggleModal}>
      <Text style={styles.dice}>{rollAmount}</Text>
      <Button title="Roll" onPress={rollTheDie} />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  dice: {
    fontSize: 60,
    textAlign: "center",
  },
});
