import React from 'react';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useTheme} from 'react-native-paper';

import Tabs from "./tabs";

const Stack = createStackNavigator();

const Router = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'MainLayout'}
        >
            <Stack.Screen
                name="MainLayout"
                component={Tabs}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
