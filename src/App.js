import React from 'react';
import TodoInput from './components/TodoInput';
import Todolists from "./components/Todolists";
import GlobalStyle from './styles/GlobalStyle';

function App() {


  return (
    <div>
      <GlobalStyle/>
      <TodoInput />
      <Todolists />
    </div>
  );
}

export default App;
