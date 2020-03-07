import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';
import Home from './Home';
import EditProfile from './EditProfile';
import RequestOtp from './RequestOtp';
import VerifyOtp from './VerifyOtp';

function InitialScreen() {
  const RootStack = createStackNavigator();
  const authState = useSelector((state: any) => state.auth);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={authState.initial_screen}>
        <RootStack.Screen
          name={screens.Home}
          component={Home}
          options={{title: authState.user.name, headerStyle: {elevation: 0}}}
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
