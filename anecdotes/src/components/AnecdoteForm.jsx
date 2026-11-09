import { useAnecdoteActions } from "../stores/anecdoteStore"
import { notify } from "../stores/notificationStore"

const AnecdoteForm = () => {
    const { add } = useAnecdoteActions()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        const newAnecdote = await add(content)
        notify(`A new anecdote "${newAnecdote.content}" created!`)
        e.target.reset()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" data-testid="new" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm