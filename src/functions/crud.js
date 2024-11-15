import AsyncStorage from "@react-native-async-storage/async-storage"
import { createUUID } from "./lib"

export const add = async (task) => {
    try {
        const { status, data, message } = await get()

        if (status === "error") return { status, data, message }
        const uuid = createUUID()
        if (!data) {
            await AsyncStorage.setItem("tasks", JSON.stringify([{ task, id: uuid }]))
        } else {
            await AsyncStorage.setItem("tasks", JSON.stringify([{ task, id: uuid }, ...data]))
        }
        return {
            status: "success",
            message: "Guardado correctamente"
        }
    } catch (e) {
        return {
            status: "error",
            message: "Ocurrio un error al guardar",
            error: e.message
        }
    }

}

export const get = async () => {
    try {
        const tasks = await AsyncStorage.getItem("tasks")
        return {
            status: "success",
            message: "Tareas obtenidas correctamente",
            data: tasks ? JSON.parse(tasks) : []
        }
    } catch (e) {
        return {
            status: "error",
            message: "Ocurrio un error al obtener las tareas",
            data: null,
            error: e.message
        }
    }
}

export const remove = async (id) => {
    try {
        const { status, data, message } = await get()

        if (status === "error") return { status, data, message }

        await AsyncStorage.setItem("tasks", JSON.stringify(data.filter(task => task.id !== id)))

        return {
            status: "success",
            message: "Eliminado correctamente"
        }
    } catch (e) {
        return {
            status: "error",
            message: "Ocurrio un error al eliminar",
            error: e.message
        }
    }
}

export const deleteAll = async () => {
    try {
        await AsyncStorage.removeItem("tasks")
        return {
            status: "success",
            message: "Tareas eliminadas correctamente"
        }
    } catch (e) {
        return {
            status: "error",
            message: "Ocurrio un error al eliminar las tareas",
            error: e.message
        }
    }
}

export const edit = async (id, task) => {
    try {
        const { status, data, message } = await get()
        if (status === "error") return { status, data, message }
        const newData = data.map(t => {
            if (t.id === id) {
                t.task = task
            }
            return t
        })

        await AsyncStorage.setItem("tasks", JSON.stringify(newData))

        return {
            status: "success",
            message: "Editado correctamente"
        }
    } catch (e) {
        return {
            status: "error",
            message: "Ocurrio un error al editar",
            error: e.message
        }
    }
}
