import { useAnecdotes } from '../hooks/useAnecdotes'

const AnecdoteForm = () => {
	const { addAnecdote } = useAnecdotes()

	const addNote = (event) => {
		event.preventDefault()

		const content = event.target.anecdote.value

		if (content.trim().length < 5) {
			return
		}

		event.target.reset()
		addAnecdote(content)
	}

	return (
		<form onSubmit={addNote}>
			<input name="anecdote" />
			<button type="submit">create</button>
		</form>
	)
}

export default AnecdoteForm