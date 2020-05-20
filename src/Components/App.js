import React from 'react';
import TodoDisplay from './TodoDisplay';
import LastItemDisplay from './LastItemDisplay'
import '../style/App.css';

class App extends React.Component {
  render(){

      return (
        <div className="App">
          <TodoDisplay />
          <LastItemDisplay />
        </div>
    );
  }
}

export default App;
