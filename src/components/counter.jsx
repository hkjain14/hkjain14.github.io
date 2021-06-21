import React, { Component } from "react";
import { throwStatement } from "@babel/types";

class Counter extends Component {
  styles = {
    //Prop of this obj = CSS props
    fontSize: 30,
    fontWeight: "bold"
  };

  state = {
    //By removing count from here we are making this a CONTROLLED COMPONENT:
    //Doesnt have own local state. Gets data via props, nd raises events to change that data. So we comment out the next line
    //count: this.props.counterr.value,
    //Props:Includes all attributes: Includes data given to component
    //State: Data pvt to that component
    imageUrl: "https://picsum.photos/200",
    shopping: []
  };

  componentWillUnmount() {
    console.log("Counter unmount");
  }

  render() {
    console.log("Counter rendered");
    let classes = this.classGenerator();
    return (
      //Next line : done because cant return more than two tags(here h1, button) coz babel cant compile that. So need to wrap up either in div or better in this tag React.Fragment
      //this.props.children executes the line bw counter opening nd closing tags
      <React.Fragment>
        {this.props.children}
        <span style={this.styles} className={classes}>
          {this.countFunc()}
        </span>
        <button
          onClick={() => {
            this.props.onIncrement(this.props.counterProp);
          }}
          className="btn btn-secondary btn-sm"
        >
          Inc
        </button>

        <button
          onClick={() => {
            this.props.onDelete(this.props.counterProp.id);
          }}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>

        {this.dynamicRenderer()}

        <p>
          <img src={this.state.imageUrl} alt="" />
        </p>
      </React.Fragment>
    );
  }

  //Note that the function is not invoked when used in button arg (ie no paranthese)
  //This method was needed coz cant pass arg from button in render coz only func reference written there

  doHandleIncrement = () => {
    this.handleIncrement({ id: 2 });
  };

  //Arrow func used coz they inherit this keyword, and dont rebind it(done in case of normal funcs)

  handleIncrement = product => {
    //this.state.count++; wont work coz react needs to be told that there has been a change in state
    this.setState({ count: this.state.count + 1 }); //Brings DOM in sync with virtual DOM (not needed in Angular)
    console.log(product);
    //See 1:11:00 for detailed explanation of WHAT HAPPENS WHEN STATE CHANGES

    /*SetState tells react that state of component will change.
     React schedules an async call to render method.
     The render method will return a react element.
     React will compare the real and virtual DOM to check whats changed
     Reach out to real browser DOM and update corr span
     Verify by inspecting count and inc and seeing that only span is changing


    */
  };
  //If above method not arrow but normal, then needed following lines
  // constructor() {
  //   super();
  //   //Needed bcoz otherwise cant access this from the handleIncrement method
  //   //Rhs returns a new func and thus override the handleIncrement with added prop of being bound
  //   this.handleIncrement = this.handleIncrement.bind(this);
  // }

  dynamicRenderer() {
    //Cant add "if else" in JSX so abstract it out here
    if (this.state.shopping.length === 0) {
      return <p>No shopping list</p>;
    }
    return (
      <ul>
        {this.state.shopping.map(item => (
          <li key={item}> {item} </li>
        ))}
      </ul>
    );
    //This map allows us to not write <li> for each entry. This is v helpful considering 1000s of entries.
  }

  classGenerator() {
    let classes = "badge m-2 badge-";
    classes += this.props.counterProp.value === 0 ? "warning" : "primary";
    return classes;
  }

  //Value of styles attribute = plain JS object
  //JSX : No class attribute but className attribute
  //(src) Attributes can be rendered dynamically via {}
  //Any tag can have { JS/JSX expression or fucntion }. Remember to use{} (to render values dynamically)

  countFunc() {
    const count = this.props.counterProp.value;
    const x = <h1>nonzero</h1>; // JSX can be returned/ passed via func and set to objects as here
    return count === 0 ? "zero" : count; //Or return x (ie JSX exp coz they get compiled to react elements)
  }
}

export default Counter;
