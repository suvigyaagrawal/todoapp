import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { CheckBox, Icon, Input, Overlay, Button } from 'react-native-elements';
import { ApolloClient } from 'apollo-boost';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { TODO_LIST, COLOR_ARRAY } from './todolist.constant';
import styles from './todolist.styles';


const todoQuery = gql`
query {
  todoes {
    id
    description
    completed
  }
}
`;


const DeleteToDo = gql`
  mutation($id: ID!) {
    deletetodo(where: { id: $id }) {
      id
    }
  }
`;

const UpdateTodo = gql`
  mutation($id: ID!, $description: String!, $completed: Boolean!) {
    updatetodo(where: { id: $id }, data: { description: $description, completed: $completed }) {
      id
    }
  }
`;


function ToDoList(props) {
    const [makeToDoEditable, setToDoEditable] = useState(false);
    const [editableToDoID, setEditableToDoID] = useState('');
    const [todoInput, setToDoInput] = useState('');
    const[todoList, setTodoes] = useState([]);
    const [todoState, setToDoState] = useState(false);
    
    useEffect(() => {
        const { todoes } = props.data;

        if (todoes && todoes !== todoList) {
            setTodoes([...props.data.todoes].reverse());
        }
    }, [props]);


    async function deleteToDo(deletetodo, id) {
        try {
            await deletetodo({
                variables: { id },
                refetchQueries: [{ query: todoQuery }]
              });
        } catch(err) {
            console.log('Error deleting item', err);
        }
    }

    function updateToDO(item) {
        setToDoEditable(true);
        setEditableToDoID(item.id);
        setToDoInput(item.description);
        setToDoState(item.completed);
    }

    function handleToDoInput(text) {
        setToDoInput(text);
    }

    async function saveTodo(updatetodo) {
        try {
            await updatetodo({
                variables: { id: editableToDoID, description: todoInput, completed: todoState },
                refetchQueries: [{ query: todoQuery }]
              });
              setToDoEditable(false);
              setEditableToDoID('');
              setToDoInput('');

        } catch(err) {
            console.log('Error Updating todo', err);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#f7f7f7' }}>
            {todoList.map((item, index) => (
                <React.Fragment key={index}>
                    <Mutation mutation={DeleteToDo}>
                    {deletetodo => (
                        <View style={{ padding: 0, margin: 0 }}>    
                                {
                                    makeToDoEditable && editableToDoID === item.id ? 
                                    (
                                    <Mutation mutation={UpdateTodo}>
                                        {updatetodo => (
                                              <Overlay>
                                                <Text style={styles.editTitle}>Edit Todo</Text>
                                                <Input
                                                    placeholder='Add a TODO'
                                                    containerStyle={styles.addToDoInput}
                                                    onChangeText={handleToDoInput}
                                                    value={todoInput}
                                                />
                                                <CheckBox
                                                    title={'Mark as done'}
                                                    checked={todoState}
                                                    containerStyle={{ 
                                                        backgroundColor: '#ffffff', 
                                                        borderWidth: 0,
                                                        padding: 20, 
                                                        margin: 0, 
                                                        marginBottom: 5,
                                                    }}
                                                    uncheckedColor={COLOR_ARRAY[index % 2]}
                                                    onPress={() => setToDoState(!todoState)}
                                                />
                                                <Button
                                                    buttonStyle={{ 
                                                        backgroundColor: '#2089db', 
                                                        color: '#ffffff', 
                                                        width: 200,
                                                        alignSelf: 'center'
                                                    }}
                                                    onPress={() => saveTodo(updatetodo)}
                                                    title="Update ToDo"
                                                />
                                            </Overlay>
                                        )
                                        }
                                      
                                    </Mutation>
                                    ) :
                                    (
                                        <View key={index} style={styles.todoItem}>
                                            <CheckBox
                                                title={item.description}
                                                checked={item.completed}
                                                containerStyle={{ backgroundColor: '#ffffff', borderWidth: 0, padding: 20, margin: 0, marginBottom: 5 }}
                                                uncheckedColor={COLOR_ARRAY[index % 2]}
                                            />
                                            <View style={styles.iconContainer}>
                                                <Icon
                                                    name='trash'
                                                    type='font-awesome'
                                                    color='#2089db'
                                                    containerStyle={{ margin: 5 }}
                                                    onPress={() => deleteToDo(deletetodo, item.id)}
                                                />
                                                <Icon
                                                    name='edit'
                                                    type='font-awesome'
                                                    color='#2089db'
                                                    containerStyle={{ margin: 5 }}
                                                    onPress={() => updateToDO(item)}
                                                />
                                            </View>
                                        </View> 
                                    )
                                }
                        </View>
                    )
                    }
                        
                    </Mutation>
                </React.Fragment>    
            ))

            }
        </ScrollView>
      
    );
}

export default graphql(todoQuery)(ToDoList);
