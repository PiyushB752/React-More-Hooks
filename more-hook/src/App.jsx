import React, { useReducer, useState, useRef, useEffect } from 'react';
import './App.css';

const workReducer = (state, action) => {
  switch (action.type) {
    case 'addWork':
      return [...state, { id: state.length + 1, text: action.payload, hide: false }];
    case 'toggle':
      return state.map((task) =>
        task.id === action.payload ? { ...task, hide: !task.hide } : task
      );
    default:
      return state;
  }
};

function App() {
  const [work, dispatch] = useReducer(workReducer, []);
  const [val, setVal] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    if (buttonClicked) {
      inputRef.current.focus();
      setButtonClicked(false); 
    }
  }, [buttonClicked]);
  const AddWork = () => {
    dispatch({ type: 'addWork', payload: val });
    setVal('');
  };
  const adder = (e) => {
    if (e.key === 'Enter') {
      AddWork();
    }
  };
  const toggle = (id) => {
    dispatch({ type: 'toggle', payload: id });
  };
  const handleGetBackWriting = () => {
    setButtonClicked(true);
  };
  return (
    <div className="App">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={adder}
        ref={inputRef}
      />
      <br /><br />
      <div className='list'>
        {work.map((task) => (
          <div>
          <div key={task.id} className='taskManager'>
            <h1>{task.hide ? 'This content is hidden' : task.text}</h1> 
            <button className='ToogleButton' onClick={() => toggle(task.id)}>Toggle</button>
            <br />
          </div><br /><br /><br /><br /><br />
          </div>
        ))}
      </div>
      <button onClick={handleGetBackWriting}>Get back Writing</button>
    </div>
  );
}
export default App;