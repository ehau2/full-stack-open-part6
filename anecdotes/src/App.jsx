import { useEffect } from 'react'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { useAnecdoteActions } from './stores/anecdoteStore'

const App = () => {
  
    const { initialize } = useAnecdoteActions()

    useEffect(() => {
        initialize()
    }, [])

    return (
        <div>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App