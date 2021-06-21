import React, { Component } from "react";
import Counter from "./counter";
class Counters extends Component {
  render() {
    console.log("Counters rendered");
    return (
      //Spl prop: children: To pass something bw opening nd closing tag,ie, here bw counter's opening nd closing
      //key attribute : used internally by react, cant be used by us thats why used idd despite having same value
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.props.onReset1}
        >
          Reset
        </button>

        {this.props.countersPassed.map(counter => (
          <Counter
            key={counter.id}
            onDelete={this.props.onDelete1}
            onIncrement={this.props.onIncrement1}
            counterProp={counter}
          >
            <h4>Counter #{counter.id}</h4>
          </Counter>
        ))}
      </div>
    );
  }
}

export default Counters;

/*
No single source of truth = disparity bw value in state and value in prop of one of the components
Each components has own local state

*/
