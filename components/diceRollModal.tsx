import { Overlay, Button, Text } from "@rneui/themed";

type DiceRollModalProps = {
  toggleModal: () => void;
  isVisible: boolean;
  setRollAmount: (roll: number) => void;
};

export const DiceRollModal: React.FunctionComponent<DiceRollModalProps> = (
  props: DiceRollModalProps
) => {
  const { toggleModal, isVisible } = props;

  const diceRoll = () => {
    console.log("Rolling dice");
  };

  return (
    <Overlay isVisible={isVisible} onBackdropPress={toggleModal}>
      <Text>Begin roll!</Text>
      <Button title="Roll" onPress={diceRoll} />
    </Overlay>
  );
};
