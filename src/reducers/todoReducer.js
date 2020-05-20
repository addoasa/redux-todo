// 4) Our reducer... Every reducer consists of just 2 things = 4.a & 4.b

// 4.a) an object(representing our state that we are starting with in our web app)... this is similar to react this.state={}
const initialState ={
    savedTodoItems:["Itzamna", "Chowder"],
    isSheAwesome:true,
};

// 4.b) and a function (for storing logic to change that state)
function todoReducer(state = initialState, action){
    return state;
}

export default todoReducer;

