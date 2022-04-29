import React from 'react';
import {
  View,
  Text,
  Modal,
  // TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
// import {test} from '../constants/data';
import {appColors} from './src/constants/appColors';
import {FAB, List} from 'react-native-paper';

import { TextInput } from 'react-native-paper';


class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editModal: false,
      todos: '',
      // [
      //   {key: '1', text: 'complete office work'},
      //   {key: '2', text: 'make todo list'},
      // ],
      editKey: '',
      todoText: '',
    }
    
    this.pressHandler = this.pressHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);    
  }
// componentDidMount(){
//   setTimeout(() => {
//     alert("ok")
//   },3000);
// }
  pressHandler = (key)=> {
     
    let filterResult = this.state.todos.filter(todo=>todo.key !=key)
    this.setState({
       todos: filterResult
    })
  }

  editHandler = (item) => {
     this.setState({
       editKey: item.key,
       todoText: item.text,
       show: true,
     })
  }

  submitHandler = () => {

    let newEntry = {}
    if(this.state.editKey == ""){
      //console.log('if block')  
        newEntry = {text: this.state.todoText, key: Math.floor(Math.random() * 100).toString()};
        this.setState({
            todos: [newEntry , ...this.state.todos]
        })

    } else {
        //console.log('else block')
        let todo = this.state.todos;
        newEntry = {text: this.state.todoText, key: this.state.editKey};
        for(let i =0; i < todo.length; i++){
            if(todo[i].key == this.state.editKey){
                 todo[i] = newEntry 
            }
        }
        
        this.setState({
          todoText : '',
          editKey: '',
          todos: todo
        })
    }             
  }

  render() {
    return (
      <View style={{backgroundColor: appColors.white, flex: 1}}>
      <StatusBar
    backgroundColor={appColors.blue}
    barStyle="light-content"
  />
        <Text
          style={{
            color: appColors.white,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 10,
            height: 80,
            paddingTop: 28,
            backgroundColor: appColors.blue,
          }}>
          List of work Todo
        </Text>
        {this.state.todos == 0 ? <Text style={{textAlign:'center',fontWeight:'bold',marginTop:280}}>NO WORK TODO </Text>:
        <View
          style={{
            // flex: 1,
            marginLeft: 15,
            marginRight: 15,
            marginTop: 20,
            backgroundColor: 'rgba(255,255,255,0.6)',
            padding: 15,
            elevation: 1,
            borderRadius: 10,
          }}>
          
          <FlatList
            data={this.state.todos}
            renderItem={({item}) => (
                <List.Item
                  style={{
                    backgroundColor: appColors.blue,
                    marginBottom: 20,
                    borderRadius: 8,
                  }}
                  title={'\u2B24'+"  "+ item.text}
                  titleStyle={{color: appColors.white}}
                  //description="Item description"
                  right={(props) => (
                    <View
                      style={{
                        flex: 0.3,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'space-evenly',
                      }}>
                      <TouchableOpacity onPress={() => this.editHandler(item)}>
                        <List.Icon color="white" icon="pencil" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.pressHandler(item.key)}>
                        <List.Icon color="white" icon="delete" />
                      </TouchableOpacity>
                    </View>
                  )}
                />
            )}
          />
        </View>
        }
        <FAB
          style={styles.fab}
          large
          icon="plus"
          onPress={() => this.setState({show: true})}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.show}
          onRequestClose={() => {
            this.setState({
              show: false,
            });
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: appColors.white,
                position: 'absolute',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                flex: 0.3,
                justifyContent: 'center',
                alignSelf: 'center',
                width: '90%',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: 10,
                }}>
                {this.state.editKey == "" ? "Add Todo" : 'Edit Todo'} 
              </Text>
              <TextInput
                style={{marginBottom: 5}}
                label="Add Todo"
                placeholder="Add Todo"
                value={this.state.todoText}
                onChangeText={(text) => this.setState({todoText: text})}
                theme={{
                  colors: {
                    primary: appColors.blue,
                    underlineColor: appColors.blue,
                  },
                }}
              />

              <Button
                style={{marginTop: 10, marginBottom: 10}}
                title= {this.state.editKey == "" ? "Add Todo" : 'Edit Todo'} 
                color={appColors.blue}
                onPress={() =>
                  this.setState({show: false}, () => this.submitHandler())
                }
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default Todo;
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: appColors.blue,
  },
});
{
  <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => alert('pressed')}
      />
}