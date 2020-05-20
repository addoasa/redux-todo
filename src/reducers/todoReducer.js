// 4) Our reducer... Every reducer consists of just 2 things = 4.a & 4.b an object and a function

// 4.a) an object(representing our state that we are starting with in our web app)... this is similar to react this.state={}
const initialState ={
    savedTodoItems:["Itzamna", "Chowder"],
    isSheAwesome:true,
    fruits:{
        apple:"red",
        banana:"yellow",
    }
};

// 4.b) and a function (for storing logic to change that state)
function todoReducer(state = initialState, action){
    //------------------------------
    // *NOTE* In order to avoid directly manipulating state we need to create a copy of any arrays since they are passed by reference. ☣ A quick way to make a copy of an array is to use the .slice() method. It will return a clone of that array.
    //------------------------------

    const copyOfSavedToDoItems = state.savedTodoItems.slice()

    // How to copy an obj
    // const copyOfFruits = JSON.parse(JSON.stringify(state.fruits));

    // 7) This function will be used to separate logic to change state based on the action this function recieves. It is suggested to only use switch statements 
    switch(action.type){
        case "ADD_TODO_ITEM":
            // run logic here to add item into state


        case "REMOVE_TODO_ITEM":
            // run logic to remove item from state
    } 
    return state;
}

export default todoReducer;

// 4.1) next step is connecting our react components to react store. kindly make your way to src/Components/TodoDisplay.js
