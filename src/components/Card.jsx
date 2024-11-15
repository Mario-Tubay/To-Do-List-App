import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ButtonGeneral from './ButtonGeneral'
import Feather from '@expo/vector-icons/Feather';
export default function Card({ task, deleteTask, modalFunction }) {
    return (
        <View style={[styles.card, styles.shadowBox]}>
            <View style={{ flexDirection: "column" }}>
                <Text>{task?.task}</Text>
                <View style={{ flexDirection: "row", gap: 7, justifyContent: "flex-end" }}>
                    <ButtonGeneral onPress={() => modalFunction(0)} type='edit'>
                        <Feather name="edit-2" size={15} color="#f3ebdb" />
                    </ButtonGeneral>
                    <ButtonGeneral onPress={() => deleteTask(task.id)} type='delete'>
                        <Feather name="trash" size={15} color="#f3ebdb" />
                    </ButtonGeneral>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        borderColor: '#aa9587',
        width: '99%',
        marginBottom: 10
    },
    shadowBox: {
        backgroundColor: '#f3ebdb',
        borderRadius: 10,
        shadowColor: '#623f2c',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 8,
    },
})