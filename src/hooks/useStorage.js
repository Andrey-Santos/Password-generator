import AsyncStorage from "@react-native-async-storage/async-storage"

const useStorage = () => {
    const getItem = async (key) => {
        try {
            const passwords = await AsyncStorage.getItem(key)
            return JSON.parse(passwords) || []
        } catch (error) {
            console.log("Erro ao buscar", error)
            return []
        }
    }

    const saveItem = async (key, value) => {
        try {
            let passwords = await getItem(key)

            passwords.push(value)

            await AsyncStorage.setItem(key, JSON.stringify(passwords))

        } catch (error) {
            console.log("Erro ao salvar", error)
            return []
        }
    }

    const removeItem = async (key, item) => {
        try {
            let passwords = await getItem(key)

            passwords = passwords.filter((password) => {
                return (password !== item)
            })

            await AsyncStorage.setItem(key, JSON.stringify(passwords))
            return passwords

        } catch (error) {
            console.log("Erro ao deletar", error)
        }
    }

    return {
        getItem,
        saveItem,
        removeItem
    }
}

export default useStorage