
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'

vi.mock('../services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
        remove: vi.fn(),
    }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, {
    useAnecdotes,
    useAnecdoteActions
} from './anecdoteStore'

import AnecdoteList from '../components/AnecdoteList'
import Filter from '../components/Filter'

beforeEach(() => {
    useAnecdoteStore.setState({
        anecdotes: [],
        filter: 'all'
    })

    vi.clearAllMocks()
})

const mockAnecdotes = [
    { id: '1', content: 'First anecdote', votes: 0 },
    { id: '2', content: 'Second anecdote', votes: 3 },
    { id: '3', content: 'Third anecdote', votes: 1 }
]

describe('useAnecdoteActions', () => {
    it('initialize loads anecdotes from service', async () => {
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual(mockAnecdotes)
    })

    it('vote increases the number of votes', async () => {
        const anecdote = mockAnecdotes[0]
        const updatedAnecdote = { ...anecdote, votes: 1 }

        useAnecdoteStore.setState({
            anecdotes: [anecdote]
        })

        anecdoteService.update.mockResolvedValue(updatedAnecdote)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.vote(anecdote.id)
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current[0].votes).toBe(1)
    })
})

describe('AnecdoteList', () => {
    it('receives anecdotes sorted by votes', () => {
        useAnecdoteStore.setState({
            anecdotes: mockAnecdotes
        })

        const { container } = render(
            React.createElement(AnecdoteList)
        )

        const text = container.textContent

        expect(text.indexOf('Second anecdote'))
            .toBeLessThan(text.indexOf('Third anecdote'))

        expect(text.indexOf('Third anecdote'))
            .toBeLessThan(text.indexOf('First anecdote'))
    })
})

describe('anecdote filtering', () => {
    it('displays only anecdotes matching the filter', () => {
        useAnecdoteStore.setState({
            anecdotes: mockAnecdotes
        })

        render(
            React.createElement(Filter)
        )

        const filter = screen.getByTestId('filter')

        fireEvent.change(filter, {
            target: { value: 'Second' }
        })

        expect(screen.getByText('Second anecdote')).toBeTruthy()
        expect(screen.queryByText('First anecdote')).toBeNull()
        expect(screen.queryByText('Third anecdote')).toBeNull()
    })
})
