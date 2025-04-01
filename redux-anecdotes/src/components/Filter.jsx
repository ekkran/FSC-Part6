import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch()

  const onChange = (event) => {
    const value = event.target.value    
    dispatch(filterChange(value))
  }

  return (<div>
    <h3>Filter</h3>
      <input type="text" name="filter" onInput={onChange} />
  </div>)
}

export default Filter