import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';
import EditProfile from './EditProfile';
import FullScreenPlayer from './FullScreenPlayer';
import Home from './Home';
import InvalidDevice from './InvalidDevice';
import RequestOtp from './RequestOtp';
import VerifyOtp from './VerifyOtp';
import Videos from './Videos';

function InitialScreen({initial_screen}: any) {
  const RootStack = createStackNavigator();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={initial_screen}>
        <RootStack.Screen
          name={screens.Home}
          component={Home}
          options={{
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme.primary,
              elevation: 0,
            },
            headerTitleStyle: {
              color: '#fff',
              textTransform: 'uppercase',
            },
          }}
        />
        <RootStack.Screen
          name={screens.RequestOtp}
          component={RequestOtp}
          options={{header: () => null}}
        />
        <RootStack.Screen
          name={screens.VerifyOtp}
          component={VerifyOtp}
          options={{header: () => null}}
        />
        <RootStack.Screen
          name={screens.InvalidDevice}
          component={InvalidDevice}
          options={{header: () => null}}
        />
        <RootStack.Screen
          name={screens.EditProfile}
          component={EditProfile}
          options={{
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme.primary,
              elevation: 0,
            },
            headerTitleStyle: {
              color: '#fff',
              textTransform: 'uppercase',
            },
            title: 'Update Profile',
          }}
        />

        <RootStack.Screen
          name={screens.Videos}
          component={Videos}
          options={{header: () => null}}
        />

        <RootStack.Screen
          name={screens.FullScreenPlayer}
          component={FullScreenPlayer}
          options={{header: () => null}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default InitialScreen;
