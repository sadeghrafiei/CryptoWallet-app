import React from "react";
import {
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { COLORS } from "assets/constants"
import Home from "view/pages/home";
import Portfolio from "view/pages/portfolio";
import Market from "view/pages/market";
import Profile from "view/pages/profile";

const Tab = createBottomTabNavigator()

const Tabs = () => {

    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
            />
            <Tab.Screen
                name="Market"
                component={Market}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
            />
        </Tab.Navigator>
    )
}

export default Tabs;
