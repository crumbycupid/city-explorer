import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  render() {
    return (
      <>
        <div className="App">
          <h1>City Explorer</h1>
        </div>
      </>
    );
  }
}
export default App;
