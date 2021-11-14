import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { DrawerNavigationType } from "../../navigation/types";
import { Card } from "./components";

type iCard = {
  src: ReturnType<typeof require>;
  name: string;
};

const CARDS: iCard[] = [
  {
    src: require("../../../assets/images/chariot/chariot.png"),
    name: "chariot",
  },
  {
    src: require("../../../assets/images/chariot/death.png"),
    name: "death",
  },
  {
    src: require("../../../assets/images/chariot/devil.png"),
    name: "devil",
  },
  {
    src: require("../../../assets/images/chariot/fool.png"),
    name: "fool",
  },
  {
    src: require("../../../assets/images/chariot/hermit.png"),
    name: "hermit",
  },
  {
    src: require("../../../assets/images/chariot/high-priestess.png"),
    name: "high-priestess",
  },
  {
    src: require("../../../assets/images/chariot/judegment.png"),
    name: "judegment",
  },
  {
    src: require("../../../assets/images/chariot/justice.png"),
    name: "justice",
  },
  {
    src: require("../../../assets/images/chariot/lover.png"),
    name: "lover",
  },
  {
    src: require("../../../assets/images/chariot/moon.png"),
    name: "moon",
  },
  {
    src: require("../../../assets/images/chariot/pendu.png"),
    name: "pendu",
  },
  {
    src: require("../../../assets/images/chariot/strength.png"),
    name: "strength",
  },
  {
    src: require("../../../assets/images/chariot/sun.png"),
    name: "sun",
  },
  {
    src: require("../../../assets/images/chariot/temperance.png"),
    name: "temperance",
  },
  {
    src: require("../../../assets/images/chariot/tower.png"),
    name: "tower",
  },
  {
    src: require("../../../assets/images/chariot/wheel.png"),
    name: "wheel",
  },
  {
    src: require("../../../assets/images/chariot/world.png"),
    name: "world",
  },
];

interface iTarot {
  navigation: NavigationProp<DrawerNavigationType, "Tarot">;
}

const Tarot: React.FC<iTarot> = ({ navigation }) => {
  const shouldAnimateBack = useSharedValue(false);
  return (
    <View style={styles.container}>
      {CARDS.map((card: iCard, index: number) => {
        return (
          <Card
            key={card.name}
            source={card.src}
            index={index}
            shouldAnimateBack={shouldAnimateBack}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});

export default Tarot;
