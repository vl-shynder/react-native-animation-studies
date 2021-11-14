import { DrawerActions, NavigationProp } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { DrawerNavigationType } from "../navigation/types";

interface iHome {
  navigation: NavigationProp<DrawerNavigationType, "Home">;
}

const Home: React.FC<iHome> = ({ navigation }) => {
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This is a home component. Open the drawer to see al of the examples
      </Text>
      <Button title="Open" onPress={openDrawer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginHorizontal: 32,
    textAlign: "center",
  },
});

export default Home;
