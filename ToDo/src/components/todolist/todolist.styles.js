import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    todoDateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#f8f8f8',
        color: '#2089db',
    },

    todoItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        margin: 5,
        paddingRight: 5,
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    addToDoInput: {
        fontSize: 14,
        padding: 20,
        backgroundColor: '#ffffff',
        marginTop: 20,
    },

    editTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    }
});

export default styles;
