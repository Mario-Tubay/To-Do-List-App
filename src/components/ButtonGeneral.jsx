import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function ButtonGeneral({ type = "success", children, onPress }) {
  const colorButton = {
    success: '#257180',
    delete: "#CB6040",
    edit: "#FD8B51",
    restore: "#F2E5BF"
  }
  return (
    <Pressable style={[styles.shadowBox, styles.button, { backgroundColor: colorButton[type] }]} onPress={onPress}>
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
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