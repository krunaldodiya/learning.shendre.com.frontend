import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';
import Categories from './Categories';
import Chapters from './Chapters';

function DrawerMenu(props: any) {
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
}

function DrawerNavigator(props: any) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName={screens.Categories}
      drawerContent={({navigation}: any) => (
        <DrawerMenu navigation={navigation} />
      )}>
      <Drawer.Screen name={screens.Categories} component={Categories} />
    </Drawer.Navigator>
  );
}

function Home(props: any) {
  const authState = useSelector((state: any) => state.auth);
  props.navigation.setOptions({title: authState.user.name});

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{header: () => null}}
      />

      <Stack.Screen
        name={screens.Chapters}
        component={Chapters}
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
    </Stack.Navigator>
  );
}

export default Home;
