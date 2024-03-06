import { useEffect, useState } from 'react';
import './App.css';

interface AppState {
  selectAll: boolean;
  usa: boolean;
  india: boolean;
  france: boolean;
}

const initState = {
  selectAll: false,
  usa: false,
  india: false,
  france: false,
}

const allChecked = {
  selectAll: true,
  usa: true,
  india: true,
  france: true,
}


interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (x?: string) => void
}

const CheckBox = ({ label, checked, onChange }: CheckBoxProps) => {
  
  const handleChange = () => {
    label === "Select All"
      ? onChange()
      : onChange(label.toLowerCase())
  }

  return(
    <label>
      <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
      />
      {label}
    </label>
  )
}


function App() {
  const [state, setState] = useState<AppState>(initState)


  const checkOptions = () => {
    for (const key in state) {
      if (state[key as keyof AppState] !== true && key !== 'selectAll') {
        return false;
      }
    }
    return true;
  }

  useEffect(()=>{
    const allOptions = checkOptions()
    console.log(allOptions)
    if(!state.selectAll && allOptions) setState(allChecked)
    if(state.selectAll && !allOptions) setState({...state, selectAll: false})
  },[state])
  

  const handleSelectAll = () => {
    state.selectAll
      ? setState(initState)
      : setState(allChecked)
  }
  
  const handleClick = (country: string) => {
    switch(country){
      case "usa":
        return setState({...state, usa: !state.usa})
      case "india":
        return setState({...state, india: !state.india})
      case "france":
        return setState({...state, france: !state.france})
    }
  }

  return (
    <div className='App'>
      <div className='container'>
        <header className="options">
          <CheckBox label={"Select All"} checked={state.selectAll} onChange={() => handleSelectAll()} />
          <CheckBox label={"India"} checked={state.india} onChange={() => handleClick("india")} />
          <CheckBox label={"USA"} checked={state.usa} onChange={() => handleClick("usa")} />
          <CheckBox label={"France"} checked={state.france} onChange={() => handleClick("france")} />
        </header>
      </div>
    </div>
  );
}

export default App;
