import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => [...state.anecdotes]
    .filter(x => x.content.includes(state.filter))
    .sort((x,y) => y.votes - x.votes))
  const dispatch = useDispatch()

  const voteProcesor = (id) => {    
    dispatch(voteAnecdote(id))
    dispatch(notify(`you voted '${anecdotes.find(x => x.id === id).content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteProcesor(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList