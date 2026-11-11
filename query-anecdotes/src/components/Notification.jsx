import { useEffect } from 'react'
import useNotification from '../hooks/useNotify'

const Notification = () => {
    const { notification, setNotification } = useNotification()

    useEffect(() => {
        if (!notification) {
            return
        }
        const timeout = setTimeout(() => {
            setNotification('')
        }, 5000)
        return () => clearTimeout(timeout)
    }, [notification, setNotification])

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    }

    if (!notification) {
        return null
    }

    return (
        <div data-testid="notification" style={style}>
            {notification}
        </div>
    )
}

export default Notification
