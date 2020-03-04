import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import Home from './Home';
import Login from './Login';

function InitialScreen() {
  const RootStack = createStackNavigator();
  const initialScreen = useSelector((state: any) => state.initialScreen.screen);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={initialScreen}>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{header: () => null}}
        />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{header: () => null}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default InitialScreen;
