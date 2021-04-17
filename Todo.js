import React from 'react'
import {Text, View,StyleSheet, TouchableOpacity } from 'react-native'

const Todo = ({task,onComplete,deleteTask}) => {
    return (
        <View style={styles.todocard}>
            <TouchableOpacity onPress={()=>deleteTask(task.title)} style={styles.circle}></TouchableOpacity>
            {(task.status)? <Text style={styles.todoStrike}>{task.title}</Text>:  <Text style={styles.todo}>{task.title}</Text>}
            <TouchableOpacity onPress={()=>onComplete(task.title)} style={[task.status?styles.completed:styles.complete]}></TouchableOpacity>
        </View>
    )
}

export default Todo

const styles = StyleSheet.create({
    todo:{
        fontSize:20,
        textTransform: 'capitalize',
        flex:2
    },
    todoStrike:{
        fontSize:20,
        textTransform: 'capitalize',
        textDecorationLine:'line-through',
        flex:2
    },
    todocard:{
        backgroundColor:'white',
        padding:15,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        marginTop:20,
        justifyContent:'space-between'
    },
    circle:{
        width:30,
        height:30,
        backgroundColor:'#55BCF6',
        opacity:0.4,
        marginRight:10,
        borderRadius:5
    },
    complete:{
        width:20,
        height:20,
        opacity:0.4,
        borderColor:'#55BCF6',
        borderWidth:4,
        borderRadius:50,
    },
    completed:{
        width:20,
        height:20,
        opacity:0.4,
        backgroundColor:'#55BCF6',
        borderRadius:50,
    },

})