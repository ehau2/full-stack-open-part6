
import AnecdoteForm from './components/AnecdoteForm'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {

    const {
        anecdotes,
        isPending,
        isError,
        voteAnecdote
    } = useAnecdotes()

    if (isPending) {
        return <div>loading data...</div>
    }

    if (isError) {
        return (
            <div>
                <p>
                    Anecdote service not available due to problems in server.
                </p>
            </div>
        )
    }

    return (
        <div>
            <h3>Anecdote app</h3>
            <AnecdoteForm />
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => voteAnecdote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default App
