import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';
import {getAuthUser} from '../store/actions/auth';
import Categories from './Categories';
import Chapters from './Chapters';
import DrawerMenu from './DrawerMenu';

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
  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.auth);
  props.navigation.setOptions({title: authState.user.institute.name});

  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);

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
