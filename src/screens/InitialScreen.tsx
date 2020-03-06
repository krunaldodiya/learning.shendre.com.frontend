import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';
import EditProfile from './EditProfile';
import Home from './Home';
import RequestOtp from './RequestOtp';
import VerifyOtp from './VerifyOtp';

function InitialScreen() {
  const RootStack = createStackNavigator();
  const initialScreen = useSelector((state: any) => state.auth.initial_screen);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={initialScreen}>
        <RootStack.Screen
          name={screens.Home}
          component={Home}
          options={{header: () => null}}
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
          name={screens.EditProfile}
          component={EditProfile}
          options={{
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme.primary,
              elevation: 0,
            },
            title: 'Update Profile',
            headerTitleStyle: {
              color: '#fff',
              textTransform: 'uppercase',
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default InitialScreen;
