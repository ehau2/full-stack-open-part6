import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import useNotification from './hooks/useNotify'

const App = () => {

    const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes()
    const { setNotification } = useNotification()

    if (isPending) {
        return <div>loading data...</div>
    }

    if (isError) {
        return (
            <div>
                <p>Anecdote service not available due to problems in server.</p>
            </div>
        )
    }

    const vote = (anecdote) => {
        voteAnecdote(anecdote, {
            onSuccess: () => {
                setNotification(`you voted '${anecdote.content}'`)
            }
        })
    }

    return (
        <div>
            <h3>Anecdote app</h3>
            <Notification />
            <AnecdoteForm />
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => vote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default App
