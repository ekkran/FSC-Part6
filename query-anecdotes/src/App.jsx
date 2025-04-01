import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, updateAnecdote } from './request'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { NotificationProvider, useNotificationDispatch} from './context/notificationContext'
const App = () => {

  const queryClient = useQueryClient()

  const notificationDispatch = useNotificationDispatch()

  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch(`you voted ${data.content}`)
    }
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  let anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
  })

  if(result.isLoading) {
    return <div>loading data...</div>
  }

  if(result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  anecdotes = result.data

  return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
  )
}

export default App
