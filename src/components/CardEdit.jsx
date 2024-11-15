import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import ButtonGeneral from './ButtonGeneral'
import { edit } from '../functions/crud'

export default function CardEdit({ task, hideModal, reload }) {
    
    const [form, setForm] = useState({ task: task?.task })
    const editTask = async () => {
        const res = await edit(task.id, form.task)
        console.log(res)
        hideModal()
        if (res.status === "error") return Alert.alert("Error", res.message)
        Alert.alert("Exito", res.message)
        return reload()
    }

    return (
        <View style={{ paddingHorizontal: 10, flexDirection: "row", gap: 10 }}>
            <Input form={form} setForm={setForm} />
            <ButtonGeneral onPress={editTask} type='edit'>
                <Text style={{ color: "#f0f0f0", fontWeight: "bold" }}> Edit </Text>
            </ButtonGeneral>
        </View>
    )
}