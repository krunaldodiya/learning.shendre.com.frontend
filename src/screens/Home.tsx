import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo} from '../store/actions/add_todo';
import {loadQuizzes} from '../store/actions/load_quizzes';

function Home() {
  const [todoName, setTodoName] = useState('');

  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQuizzes());
  }, [dispatch]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
          <View style={{marginBottom: 10}}>
            <TextInput
              style={{borderWidth: 1, borderColor: '#bbb', paddingLeft: 10}}
              value={todoName}
              onChangeText={name => setTodoName(name)}
            />
          </View>

          <View style={{marginBottom: 10}}>
            <Button
              title="add todo"
              onPress={() => {
                dispatch(addTodo(todoName));
                setTodoName('');
              }}
            />
          </View>

          <View style={{marginBottom: 10}}>
            {todos.data.map((todo: string, index: number) => {
              return (
                <View key={index}>
                  <Text>{todo}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Home;
