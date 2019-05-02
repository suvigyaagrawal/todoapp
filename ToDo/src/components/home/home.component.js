import React, { useState } from 'react';
import { View } from 'react-native';
import { Header, Input, Icon } from 'react-native-elements';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ToDoList from '../todolist/todolist.component';
import styles from './home.styles';

const todoQuery = gql`
query {
  todoes {
    id
    description
    completed
  }
}
`;

const CreateMutation = gql`
  mutation($description: String!, $completed: Boolean!) {
    createtodo(data: { description: $description, completed: $completed }) {
      id
      description
    }
  }
`;

function Home(props) {
    const [todoInput, setToDoInput] = useState('');

    function handleToDoInputChange(text) {
        setToDoInput(text);
    }

    async function saveTodo(createToDo) {
        try {
            await createToDo({
              variables: { description: todoInput, completed: false },
              refetchQueries: [{ query: todoQuery }]
            });
            setToDoInput('');
          } catch (err) {
            console.log('oops error', err);
          }
    }

    return (
        <Mutation mutation={CreateMutation}>
            {createToDo => (
                <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
                    <Header
                        centerComponent={{ text: 'TODO', style: { color: '#fff', fontWeight: 'bold', fontSize: 18 } }}
                    />
                    <View style={styles.addToDoInputContainer}>
                        <Input
                            placeholder='Add a TODO'
                            rightIcon={{ type: 'font-awesome', name: 'arrow-circle-right', color: '#2089db', size: 30, onPress: () => saveTodo(createToDo) }}
                            leftIconContainerStyle={{ marginRight: 10 }}
                            style={styles.addToDoInput}
                            onChangeText={setToDoInput}
                            value={todoInput}
                        />
                    </View>
                    <ToDoList />
                </View>
            )
            } 
        </Mutation>
    )
}

export default Home;
