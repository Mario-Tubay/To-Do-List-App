import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function Button({ onPress }) {
    return (
        <Pressable

            onPress={onPress}
            style={[styles.shadowBox, { backgroundColor: '#aa9587', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, width: "18%" }]}>
            <Text style={{ color: '#f3ebdb', fontWeight: "bold" }}>add</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
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