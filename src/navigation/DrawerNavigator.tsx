import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Home, Tarot } from "../screens";
import { DrawerNavigationType } from "./types";

const DrawerNavigatorStack = createDrawerNavigator<DrawerNavigationType>();

export const DrawerNavigator = () => {
  return (
    <DrawerNavigatorStack.Navigator screenOptions={{ headerShown: false }}>
      <DrawerNavigatorStack.Screen component={Home} name="Home" />
      <DrawerNavigatorStack.Screen component={Tarot} name="Tarot" />
    </DrawerNavigatorStack.Navigator>
  );
};
