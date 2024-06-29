import { useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [todoData, setTodoData] = useState([]);
  const inputText = useRef();
  const [selectedTodoId, setSelectedTodoId] = useState();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
          .then((res)=> res.json())
          .then((apiData)=> setTodoData(apiData.todos));
  // console.log(todoData)
  }, [])

  const handleAddTodoClick =()=> {
    // console.log(inputText.current.value);
    const newInputArray = {
      id: todoData.length + 1,
      todo: inputText.current.value,
      completed: false,
    }
    setTodoData([newInputArray, ...todoData]);
  }
  
  const handleClickOnTodoItem=(e)=>{
    console.log(e.target.id);
    setSelectedTodoId(e.target.id);
  }

  const handleToggleButton =() =>{
    setToggle(!toggle);
  }

  return (
    <div className="App">
      
      <h1>Todo App in React ver: 18.3.1</h1>
      <input type='text' placeholder='Enter a todo task' ref={inputText}/>
      <button onClick={()=> handleAddTodoClick()}>Add Todo</button>
      <button onClick={handleToggleButton}>{toggle ? "View" : "Edit"}</button>
      <ol>
        {todoData?.map((item) =>{
            return item.id == selectedTodoId && toggle ? (
                    <input type='text' value={item.todo}/>
                  ):(
                    <li onClick={handleClickOnTodoItem} id={item.id}> {item.todo}({item.id}) </li>
                  )
                    
              // </div>
        })}
      </ol>
    </div>
  );
}

export default App;
