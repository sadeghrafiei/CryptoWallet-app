import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {COLORS, icons} from 'assets/constants';
import Home from 'view/pages/home';
import Portfolio from 'view/pages/portfolio';
import Market from 'view/pages/market';
import Profile from 'view/pages/profile';
import {TabIcon} from 'view/components';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 140,
          backgroundColor: COLORS.primary,
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon focused={focused} label={'Home'} icon={icons.home} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                focused={focused}
                label={'Portfolio'}
                icon={icons.briefcase}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                focused={focused}
                label={'Trade'}
                icon={icons.trade}
                isTrade={true}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon focused={focused} label={'Market'} icon={icons.market} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon focused={focused} label="Profile" icon={icons.profile} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
