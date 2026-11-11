import { useAnecdotes } from '../hooks/useAnecdotes'
import useNotification from '../hooks/useNotify'

const AnecdoteForm = () => {
	const { addAnecdote } = useAnecdotes()
	const { setNotification } = useNotification()

	const addNote = (event) => {
		event.preventDefault()

		const content = event.target.anecdote.value

		addAnecdote(content, {
			onSuccess: () => {
				setNotification(`you created '${content}'`)
			},
			onError: (error) => {
				setNotification(error.message)
			}
		})

		event.target.reset()
	}

	return (
		<form onSubmit={addNote}>
			<input name="anecdote" />
			<button type="submit">create</button>
		</form>
	)
}

export default AnecdoteForm
