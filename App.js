import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Keyboard, Platform, StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable } from 'react-native-web';
import Task from './components/Task';

export default function App() {

  const [color, setColor] = useState('red');

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);


  const handleAddTask = () => {
    if (task != null && task != "")
      setTaskItems([...taskItems, task])
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }


  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => completeTask(index)} >
                <Task text={item} />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper} >
        <TextInput style={styles.input} placeholder={"Write a Task Here"} value={task} onChangeText={text => setTask(text)} />
        <View style={styles.priorities} >
          <TouchableOpacity style={[styles.squareHigh, {backgroundColor: color}]} />
          <TouchableOpacity style={styles.squareMedium} />
          <TouchableOpacity style={styles.squareLow} />
        </View>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  input: {
    paddingVertical: 15,
    width: '75%',
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginLeft: 15,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    fontSize: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginRight: 15,
  },
  picker: {
    width: 100,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorities: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  squareHigh: {
    width: 24,
    height: 24,
    backgroundColor: '#F555F5',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 10,
    borderColor: '#000',
    borderWidth: 1,
},
squareMedium: {
  width: 24,
  height: 24,
  backgroundColor: '#BCF555',
  opacity: 0.4,
  borderRadius: 5,
  marginRight: 10,
},
squareLow: {
  width: 24,
  height: 24,
  backgroundColor: '#55BCF6',
  opacity: 0.4,
  borderRadius: 5,
},
});
