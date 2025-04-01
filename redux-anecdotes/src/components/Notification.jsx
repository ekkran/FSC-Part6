import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const dispatch = useDispatch()
  const selector = useSelector(state => state.notification)

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  })

  return (
    <div style={style}>
      {selector}
    </div>
  )
}

export default Notification