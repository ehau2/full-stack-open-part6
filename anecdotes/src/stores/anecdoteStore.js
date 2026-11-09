import { create } from 'zustand'
import anecdoteService from '../services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
    anecdotes: [],
    filter: 'all',

    actions: {
        initialize: async () => {
            const anecdotes = await anecdoteService.getAll()
            set({ anecdotes })
        },

        add: async (content) => {
            const newAnecdote = await anecdoteService.createNew(content)

            set(state => ({
                anecdotes: state.anecdotes.concat(newAnecdote)
            }))

            return newAnecdote
        },
        
        vote: async (id) => {
            const anecdote = get().anecdotes.find(a => a.id === id)
            if (!anecdote) return

            const updatedAnecdote = {
                ...anecdote,
                votes: anecdote.votes + 1
            }

            const returnedAnecdote = await anecdoteService.update(
                id,
                updatedAnecdote
            )

            set(state => ({
                anecdotes: state.anecdotes.map(a =>
                    a.id === id ? returnedAnecdote : a
                )
            }))
        },

        remove: async (id) => {
            await anecdoteService.remove(id)
            set(state => ({
                anecdotes: state.anecdotes.filter(a => a.id !== id)
            }))
        },
        setFilter: (value) => set({ filter: value })
    }
}))

export const useAnecdotes = () => {
    const anecdotes = useAnecdoteStore(state => state.anecdotes)
    const filter = useAnecdoteStore(state => state.filter)

    if (filter === 'all') {
        return anecdotes
    }

    return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
}

export const useAnecdoteActions = () =>
    useAnecdoteStore(state => state.actions)
