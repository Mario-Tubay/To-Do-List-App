import { View, Text, Alert, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Input, Button, Card } from '../components';
import { add, get, remove } from '../functions/crud';
import {
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import CardEdit from '../components/CardEdit';
export default function Main() {
    const insets = useSafeAreaInsets();
    const [form, setForm] = useState({ task: "" })
    const [tasks, setTasks] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const bottomSheetModalRef = useRef(null);
    const [editTask, setEditTask] = useState(null)


    const snapPoints = ["20%"];

    const addTask = async () => {
        const task = await add(form.task)
        setForm({ task: "" })
        Alert.alert("Exito", task.message)
        getTasks()
    }

    const getTasks = async () => {
        const tasks = await get()
        setRefreshing(false)
        if (tasks.status === "error") return Alert.alert(tasks.message)
        setTasks(tasks.data)
    }

    const deleteTask = async (id) => {
        Alert.alert("Eliminar", "¿Estas seguro de eliminar esta tarea?", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "OK", onPress: async () => {
                    const task = await remove(id)
                    console.log(task)
                    Alert.alert("Exito", task.message)
                    getTasks()
                }
            }
        ])
    }

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const hideModal = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            <View style={{ paddingTop: insets.top, backgroundColor: "#f3ebdb", paddingHorizontal: 10, height: "100%", paddingBottom: insets.bottom }}>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: "#aa9587" }}>To Do List</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Input form={form} setForm={setForm} />
                    <Button onPress={addTask} />
                </View>
                <FlatList
                    style={{ marginTop: 20 }}
                    data={tasks}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={getTasks} />
                    }
                    renderItem={({ item, index }) => <Card modalFunction={() => { handlePresentModalPress(); setEditTask(item); }} deleteTask={deleteTask} task={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
            <BottomSheetModal
                snapPoints={snapPoints}
                index={1}
                ref={bottomSheetModalRef}
            >
                <BottomSheetView style={{
                    backgroundColor: "#f3ebdb", 
                    flex: 1,
                    padding: 24,
                    justifyContent: 'center',
                }}>
                    <CardEdit reload={getTasks} hideModal={hideModal} task={editTask} />
                </BottomSheetView>
            </BottomSheetModal>
        </>

    )
}