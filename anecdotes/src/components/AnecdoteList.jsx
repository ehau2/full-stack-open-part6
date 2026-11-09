
import { useAnecdotes, useAnecdoteActions } from "../stores/anecdoteStore"
import { notify } from "../stores/notificationStore"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote, remove } = useAnecdoteActions()

    const handleVote = async (anecdote) => {
        await vote(anecdote.id)
        notify(`you voted '${anecdote.content}'`)
    }

    const handleDelete = async (anecdote) => {
        await remove(anecdote.id)
        notify(`Deleted "${anecdote.content}"`)
    }

    const sortedAnecdotes = anecdotes.toSorted(
        (a, b) => b.votes - a.votes
    )

    return (
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                        {anecdote.votes === 0 && (
                            <button onClick={() => handleDelete(anecdote)}>
                                delete
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList
