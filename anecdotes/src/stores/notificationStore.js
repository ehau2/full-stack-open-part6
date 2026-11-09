import { create } from 'zustand'

let timeout

const useNotificationStore = create((set) => ({
    message: null,

    actions: {
        setNotification: (message) => {
            clearTimeout(timeout)

            set({ message })

            timeout = setTimeout(() => {
                set({ message: null })
            }, 5000)
        }
    }
}))

export const useNotification = () =>
    useNotificationStore(state => state.message)

export const notify = (message) =>
    useNotificationStore.getState().actions.setNotification(message)