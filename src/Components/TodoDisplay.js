import React from 'react';
import '../style/App.css';
import LastItemDisplay from './LastItemDisplay';

// 5) we need to import the connect method
import { connect } from 'react-redux';

// 5.2) mapStateToProps() is a method that will inject redux state from 
// your redux store into your Props object. It returns an object.

// store.todoReducer refers to the key called "todoReducer" in the keyvalue 
// pair we set up in the ./reducers/index.js

//**NOTE **/ mapStateToProps and mapDispatchToProps should always go outside of your react component.

const mapStateToProps = (store) => ({
    todoState: store.todoReducer
})

class TodoDisplay extends React.Component {

    constructor(){
        super()
        this.submitForm = this.submitForm.bind(this)
    }

    //-------------------------------------
    // When we submit the form, we call this function
    //-------------------------------------
    submitForm(event){
        event.preventDefault();

        // grab the input that the user typed in
        const inputtedItem = document.querySelector("#inputted-item");

    }

  render(){
    // ---------------------------------------
    // 5.3) From now on we can refer to our redux state 
    // through our props object aka this.props.todoState.savedTodoItems 
    // ---------------------------------------
      console.log(this.props.todoState.savedTodoItems)

    //-------------------------------------
    // Loop through all todo items in state (using map()) 
    // and render a <h5></h5> for each todo item
    //-------------------------------------

    // looping through the array in state
    // const listOfItems = this.state.savedTodoItems.map((item)=>{
    //      return(<h5>{item}</h5>)
    // })
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
                {/* {listOfItems} */}
            </div>
        </div>
    );
  }
}
// --------------------------------------------------------------------------
// 5.1) This will be how we tell react that this component will be connecting to our redux store
// --------------------------------------------------------------------------
export default connect(mapStateToProps,null)(TodoDisplay);

// ** Note
// There are two methods used in the connect():
// mapStateToProps => used for getting and using state in this component
// mapDispatchToProps => used for setting/changing state

// export default connect(mapStateToProps,mapDispatchToProps)(TodoDisplay);