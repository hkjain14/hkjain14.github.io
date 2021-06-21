import React, { Component } from "react";
import Counters from "./components/counters";
import NavBar from "./components/navbar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 3 },
      { id: 2, value: 0 },
      { id: 3, value: 1 },
      { id: 4, value: 0 }
    ]
  };

  constructor() {
    super();
    console.log("App constructor");
  }

  componentDidMount() {
    console.log("App mounted");
  }

  handleReset = () => {
    const newCounters = this.state.counters.map(h => {
      h.value = 0;
      return h;
    });
    this.setState({ counters: newCounters });
  };

  handleDelete = number => {
    const newCounters = this.state.counters.filter(h => h.id !== number);
    this.setState({ counters: newCounters });
  };

  handleIncrement = obj => {
    const newCounters = [...this.state.counters];
    const index = newCounters.indexOf(obj);
    newCounters[index] = { ...obj };
    newCounters[index].value++;
    this.setState({ counters: newCounters });
  };
  render() {
    console.log("App rendered");
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter(h => h.value > 0).length}
        />
        <main className="container">
          <Counters
            countersPassed={this.state.counters}
            onIncrement1={this.handleIncrement}
            onReset1={this.handleReset}
            onDelete1={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;