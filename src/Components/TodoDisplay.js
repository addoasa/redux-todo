import React from 'react';
import '../style/App.css';

class TodoDisplay extends React.Component {
    //-------------------------------------
    // We have a simple array saved in state
    //-------------------------------------
    constructor(){
        super()
        this.state = {
            savedTodoItems:["Itzamna", "Chowder"]
        }
        this.submitForm = this.submitForm.bind(this)
    }

    //-------------------------------------
    // When we submit the form, we grab the
    // input value and push it into our array
    // in state (using setState())
    //-------------------------------------
    submitForm(event){
        event.preventDefault();

        // grab the input that the user typed in
        const inputtedItem = document.querySelector("#inputted-item");
        
        // Use the weirder looking version of set state to update state
        // The parameters "state" and "props" and copies of this components state and props
        // That way you can manipulate them without touching the real state or real props
        this.setState((state, props) => {
            state.savedTodoItems.push(inputtedItem.value);
            return {savedTodoItems: state.savedTodoItems};
          });
    }

  render(){
    //-------------------------------------
    // Loop through all todo items in state (using map()) 
    // and render a <h5></h5> for each todo item
    //-------------------------------------

    // looping through the array in state
    const listOfItems = this.state.savedTodoItems.map((item)=>{
         return(<h5>{item}</h5>)
    })
      return (
        <div>  
            <form onSubmit ={this.submitForm}>
                <input id="inputted-item" type="text"></input>
                <button type="submit" >Add Item</button>
            </form>
            <div>
                {/*//------------------------------------- */}
                {/*Here we are rendering the <h5></h5>s that we made earlier (using the variable "listOfItems") */}
                {/*//------------------------------------- */}
                {listOfItems}
            </div>
        </div>
    );
  }
}

export default TodoDisplay;
