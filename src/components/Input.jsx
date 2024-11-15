import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function Input({ form, setForm }) {
    return (
        <TextInput onChangeText={(text) => setForm({task: text})} value={form.task} style={[styles.input, styles.shadowBox]} placeholder='Ingrese la tarea' />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        borderColor: '#aa9587',
        width: '80%',
    },
    shadowBox: {
        backgroundColor: '#f3ebdb',
        borderRadius: 10,
        // Propiedades de sombra para iOS
        shadowColor: '#623f2c',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        // Propiedades de sombra para Android
        elevation: 8,
    },
})