import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import Todo from './Todo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [input, setinput] = useState("");
  const [todos, setTodos] = useState([]);
  const onAdd=()=>{
    const task={
      title:input,
      status:false
    }
    setTodos([task,...todos]);
    setinput("");
    AsyncStorage.setItem('user',JSON.stringify([task,...todos]));
  }
  const deleteTask = async(val)=>{
    const todosFiltered=todos.filter((todo)=>{
      if(todo.title===val)
       return false
     else
       return true
     });
    setTodos(todosFiltered);
    AsyncStorage.setItem('user',JSON.stringify(todosFiltered));
    // AsyncStorage.clear();
  }
  const onComplete = async(val)=>{
    const todosFiltered=todos.filter((todo)=>{
      if(todo.title===val)
      {
        todo.status=!todo.status;
        return true
      }
      else
      {
        return true
      }
      
     });
    setTodos(todosFiltered);
     AsyncStorage.setItem('user',JSON.stringify(
        todosFiltered
     ));
     console.log(await AsyncStorage.getItem('user'));
  }
  const initialData = async ()=>{
    
    const user=await AsyncStorage.getItem('user');
    if(user!==null)
    {
      setTodos(JSON.parse(user));
    }
    console.log(user);
    
  }
  useEffect(() => {
    initialData();
  }, []);
  useEffect(() => {
    
  },[setTodos]);
  return (
    <>
    <SafeAreaView style={styles.body}>
    <View style={styles.header}>
      <Text style={styles.boldText}>Today's Task</Text>
    </View>
    <ScrollView>
    <View>
    <View style={styles.todolist}>
      {todos.map((todo,index)=>{
        return <Todo key={index} deleteTask={deleteTask} onComplete={onComplete} task={todo}/>
      })}
      </View>
    </View>
        
    </ScrollView>
      {/* <KeyboardAvoidingView
      style={styles.inputArea}
      behavior={Platform.OS==='ios'? 'padding'  : 'height'}
      > */}
      <View style={styles.inputArea}>
      <TextInput
      style={styles.todoInput}
      value={input}
      onChangeText={text =>setinput(text)}
      />
      <TouchableOpacity>
        <Text style={styles.btn} onPress={onAdd}>+</Text>
      </TouchableOpacity>
      </View>
     
      {/* </KeyboardAvoidingView> */}
     
    </SafeAreaView>
    
    </>
  );
}

const styles = StyleSheet.create({
  header:{
    marginTop:30,
  },
  boldText:{
    fontWeight:'bold',
    margin:20,
    fontSize:30
  },
 
  info:{
    color:'black',
    fontWeight:'bold',
    width:'100%',
    fontSize:24,
  },
  todoInput:{
    height:40,
    borderWidth:0.5,
    color:'black',
    borderRadius:20,
    width:'70%',
    paddingHorizontal:20,
    fontSize:20,
    backgroundColor:'white'
  },
  todolist:{
    marginHorizontal:20
  },
  btn:{
    backgroundColor:'#303846',
    width:50,
    height:50,
    borderRadius:50,
    textAlign:'center',
    textAlignVertical:'center',
    color:'white',
    fontSize:30
  },
  inputArea:{
    position:'relative',
    bottom: 30,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:40
  },
  body:{
    height:'100%',
    backgroundColor:'#E8EAED'
  }
});
