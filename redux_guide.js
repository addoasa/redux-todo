-How does Redux work?()=>{
    1) "Install redux with npm=> run npm install react-redux redux"
    //__________________________________________________________________________________
    2) "At the entrance of your react app(Usually index.js you import the <Provider> Component from react-redux and the store from redux)"
      // like this:
      import { Provider } from 'react-redux'; // the Provider will "provide" your application with access to a store"
      import store from '../store'; // you havent created this file yet but the store will be where your redux state lives
    
      ReactDom.render(
        <Provider store = {store}> // Providing your application with the store
          <App />
        </Provider>, 
        document.getElementById('root')
      );
    //__________________________________________________________________________________
    3) "You should create the store file now. The store.js file uses a method from redux called createStore()."
        "createStore() creates your redux state. It essentially only takes ONE reducer as a parameter."
        "The single reducer you pass to this function will be a combination of all of your reducers. We haven't gotten to the reducers yet."
        "Don't worry :)"
        // Your store file should look like this
        import { createStore } from 'redux'; // import the method to create redux store from redux
        import reducers from './reducers/index'; // we havent made this file yet but thats ok. Index.js here will export a single reducer called reducers


        const store = createStore(reducers); // pass in that reducer to this method to create your store 

        export default store; // export so that we can use in our Provider
  //__________________________________________________________________________________

    4) "Create your reducer folder." 
      
      "You make a folder because you could possibly have multiple reducer files to handle different parts of your app so you dont get your logic confused."
      
      "You can have as many reducers as you want but ultimatly redux will merge them all so that your state can be read all at once by your app with the store."
      "Because of this, you must create a file called index.js in your reducers folder."
      
      "This file will use a method called combineReducers() to merge ALL of your reducer files into one."
      "combineReducers() takes in an object as a parameter. This object must have key value pairs for each reducer file you have." 
      
      "The keys can be what you want them to be but the values must be your imported reducer. The key is how you will reference specifice parts of your state  in your actions but were not there yet =>store.tinker.activeSVGs"
      "Once combineReducers() has that object, it can merge them." 
      "The result of invoking this function is exported and used as a parameter in the createStore function."

      import { combineReducers } from 'redux'; // get this method from redux , since createStore() takes only one reducer , i have to combine all reducers with the combine reducers method
      import pathReducer from './pathReducer';  // an example of a reducer file being imported
      //import all reducers

      //this will combine all reducers into a single reducer
      const reducers = combineReducers({
        //if i had more reducers they would go in here
        tinker : pathReducer,
      })

      export default reducers;// export the combined SINGLE reducer for createStore to use
  //__________________________________________________________________________________

    5) "Create your reducer."
      "At this point you have a basic set up for linking your store to your application. Now you have to create 2 things:"
      a) Your state
      b) How you will interact with that state

      "First Just create a file that will be your reducer."
      "This reducer file will have 2 things in it."
      1) "it will have an object you create. => This object will represent your initial state."
      2) "Your reducer function which should be the same name as the file (Just so you know)=> this function is where the logic in how to change state will go"

      YOur reducer file should look LIKE THIS:

        const initialState = {  //set the initial state object
          currentLetter: 'A',
          workspaceHeight:400,
          workspaceWidth:700,
          activeSVGs: [ 
            {
              range1x:275,
              range1y:175,
            }
          ]
        }

        // create reducer function
        function pathReducer(state=initialState, action){
          // this is where all of my logic for changing state will go
          // golden rule is to never directly alter that initial state above.
          // so we make a copy of the items in state befor mutating them
          // For arrays, we use slice() because slice() will return a new array containing the elements of the old array
          let workspaceHeight = state.workspaceHeight; // copy
          let workspaceWidth = state.workspaceWidth; // copy
          let activeSVGs = state.activeSVGs.slice(); // copy

          return state; // returns an instance of mutated state if anything was changed
          
          }
      
        export default pathReducer;

        "So now we've solved part a => Creating intial redux state."
  //__________________________________________________________________________________
      
    6) "Access the state we've created"
        "Now that you have that state in your reducer how do you use it in your React application?"
        "How this works is every react component will always have two objects." "A props object and a state object." 
        "Those are the objects we are pulling from when we say this.state or we say this.props"
        "In order to "get" data from our redux state, redux chooses to place that data in our react components props object for access."
        "Redux uses a method called mapStateToProps in order to do this. If your are familiar with class based languages this method acts like a getter."

        "Placing this into your component will allow that component to have access to the state you created earlier."
        import React from 'react';
        import { connect } from 'react-redux';


        const mapStateToProps = store => ({ // method that takes your store as a parameter
          activeSVGs : store.tinker.activeSVGs, // this object is being returned and stored in your component's props object under the specific key name.
        }) // I can now access the activeSVGs array from my reducer file by entering this.props.activeSVGS
        // tinker is the key name of the specific reducer that was combined into the store eariler
        // all of this will go before your component

        export default connect(mapStateToProps, null)(LiveCode); // finally if your component is accessing/ interacting with the redux store at any point you need to use the connect method when importing your component
        // This lets react know that this component is interacting with the single combined redux store reducer using mapStateToProps

        "NOW you can access your Redux state anywhere in you application."
        "******Pro tip****** "
        "Do this at your outermost parent component and pass the data down to children components as props"
        "This way you will only need to use this method once" "even though the point of redux is to avoid prop drilling"
  //__________________________________________________________________________________

    7) "How do you change state?"
        "This is the more complicated part."
        
        // In order to do this you need to follow 3 steps:
        // 1) create a box, 
        // 2) put stuff in the box and/or mail(AKA dispatch) that box to the reducer as a gift, 
        // 3) The reducer now has access to the contents of the box and runs logic to change state based on the label name
        
        //--------------------------
        //STEP1 => Create actions
        //--------------------------
        "You need to create a new file called actions.js. This file will store all of the actions you will use throughout your app."
        //tf is an action? 
        "Actions are essentially functions that can let your app talk to your reducers(like telling your reducer to change state)."
        "Every action returns an object that will eventually be read by your reducer. That Object contains a type and a payload."
        // If this is complicated Here is the box analogy:
        // "You can imagine an action as a BOX. That box will always have a label."
        // "If you give that box a label that says 'Fish' you've given that box(aka action) a type."
        // "Now when you mail that box(aka action) to your reducer it will know to run prewritten logic to change state in the situation where a box labeled 'Fish' is recieved."
        
        // As I said before every box MUST always have a label(aka a type)-> Without it the reducer wont know what specific code to run.
        // THe second part of an action object is called a payload-> The payload is anysort of data in your app that you want to send to the reducer to incorporate into its logic.
        // SO its like putting 'fishfood' inside the box labeled 'fish' and shipping it to your reducer. ->Your reducer now knows what to do when it gets a box named fish AND can use the fish food accordingly.
        // HOWEVER, Whether or not the box contains anything is completely optional.-> You can send the reducer an empty box(aka an action without a payload).

        "SOOOO... With all that said-"
        "actions.js should look like this:"
        
      // literally just a file of exported functions to be used in your app
      // in actions.js we have 2 boxes
      
      export const setRange1x = (range1x, classId)=>({ // params that are passed when this is invoked are getting passed to payload( can be anything you want)
          type:"SET_RANGE1x",      // this box is labeled "SET_RANGE1x"
          payload: {range1x , classId },  // When invoked THe person coding this app plans to put two items into the box at some point before sending this box to the reducer
        })

        export const removeSVG = (SVG, classId)=>({
          type:"REMOVESVG",
          payload: {SVG, classId},
        })

      //  *********************NOTE***************************************************************************************
      // The actions above look good and they will work fine. However it is best practice to save the box labels (action types) into variables located in a separate file
      // That way you can import the variables into actions.js instead of using a string directly.
      // This is done because if you spell a type name wrong (typo in the box label) the reducer wont know what type you are refering to and as a result NOTHING will happen(no error, no state change)
      // THis is bad if you are trying to manipulate state.
      // For example, If I wrote logic in my reducer to change state if an action labeled "SET_TO_TRUE" was recieved...and I MISLABEL THE ACTION TYPE by accident and call it "SET_TO_TRU" NOTHING WILL HAPPEN since I never wrote logic for an action called "SET_TO_TRU"  
      // SO by storing the string value in a variable, you will get a "Variable has not been defined" type of error if you spell the variable wrong.

      "So you need to create a file called actionTypeVariableNames and store all of the names of the action types you plan to use into variables"
      // like this:
      
        export const ADD_LETTER = "ADD_LETTER";
        export const SET_HEIGHT = "SET_HEIGHT";
        export const SET_WIDTH = "SET_WIDTH";
        export const SET_RANGE1X = "SET_RANGE1X";
        export const SET_RANGE1Y = "SET_RANGE1Y";
        export const SET_RANGE2X = "SET_RANGE2X";
        export const SET_RANGE2Y = "SET_RANGE2Y";
        export const SET_RANGE3X = "SET_RANGE3X";
        export const SET_RANGE3Y = "SET_RANGE3Y";
        export const SET_RANGE4X = "SET_RANGE4X";
        export const SET_RANGE4Y = "SET_RANGE4Y";
        export const ADD_SVG = "ADD_SVG";
        export const REMOVE_SVG = "REMOVE_SVG";


        "THEN you can import this file into actions.js and write the variable names instead of typo prone string names"
        // like this:
        import * as types from './actionTypesVariableNames/actionTypeVariables.js';

        export const setRange1y = (range1y, classId)=>({
          type:types.SET_RANGE1Y, // Note: using variable name instead of string
          payload: {range1y,classId},
        })

        export const removeSVG = (SVG, classId)=>({
          type:types.REMOVE_SVG,
          payload: {SVG, classId},
        })

        // We have successfully created and labeled our actions and defined possible payloads...
        // Now we need to actually use them in our app 
        // *******************************************************************************************************************

        //--------------------------
        //STEP2 => Send an action to reducer
        //--------------------------

        "In order to set/change state in your react app you need to use method called mapDispatchToProps."
        "How this works is, first you import the actions made earlier into the component where state changing should happen like this:"
        // --
        import React from "react";
        import { setRange1x } from '../../actions';
        import { removeSVG } from '../../actions';
        // --
        "Then, similiar to before, we map these actions to our component's props object by using a method called mapDispatchToProps So that we can access the actions in our app"
        
        const mapDispatchToProps = dispatch => ({// this function is returning an object that will be stored in props
          setRange1x : (event, classId)=> dispatch(setRange1x(event, classId)), // key can be named anything but for your own mental health name it the same as the action
          removeSVG : (SVG, classId)=> dispatch(removeSVG(SVG, classId)), 
        })
        //********NOTE****** */
        // Notice the that mapDIspatchTOProps uses a "dispatch()" method ON the actions we imported
        // THis means that the actions in the actions.js file we created earlier are just templates
        // In props, when we access this.props.setRange1x(blah,blah) we arent accessing the action directly- we are actually invoking a function that invokes another function (called dispatch) that sends an instance of our action to our single store reducer
        // Therefore its good practice to use the newly mapped action props in event functions like handleClick or handleChange so that we have control over TRIGGERING the dispatch

        // Like this:

        handleClick(event){
          this.props.removeSVG(event.target.value, event.target.className)  // WHEN WE CLICK, WE ARE PUTTING STUFF FROM OUR APP (event.target.value etc) INTO THE BOX AND THEN MAILING(DISPATCHING) THE BOX TO THE REDUCER
        }

        // Once this function is invoked the instance of the action in props along with the arguments passed (payload) gets immediately sent to our reducer

        //--------------------------
        //STEP3 => Run logic in reducer to change state based on action type
        //--------------------------

        "So we've now sent an action to the reducer."
        "But what does the reducer do with the action?"
        "Remember how the Reducer files have two things: An initial state object and a function."
        // Actions will be used in the reducer's function

        // So this works in 3 parts:
        // 1) First the reducer will recieve the action
        // 2) Second the reducer will check its function for any conditionals that ask for the type of the action sent
        // 3) Code will be run to interact with state. Then thats it. Redux is done.

            //-------------
            // 1) First the reducer will recieve the action
            //-------------
            // We've already done this when we sent our action to the reducer using the action dispatch props we got from mapDispatchToProps
            
            //-------------
            // 2) Second the reducer will check its function for any conditionals that ask for the type of the action sent
            //-------------
            // Now that the reducer has the action, we need to make sure that when the reducer knows what to do with that action
            // In a very dumbed down way, essentially how this will work is : You write a conditional inside of your reducer function that says(IF THE NAME OF THE ACTION I RECIEVED === FISH, RUN LOGIC TO CHANGE STATE)
            // I've noticed that it is common that people will use a switch statement here instead of writing many conditionals
            // Your reducer should look like this:
            
            import * as types from '../actionTypesVariableNames/actionTypeVariables';
            //imported the actiontype variables so that we can recieve errors if we make a typo on an action type

            //set the initial state object
            const initialState = {
              currentLetter: 'A',
              workspaceHeight:400,
              workspaceWidth:700,
              activeSVGs: [ 
                {
                  range1x:275,
                  range1y:175,
                  range2x:225,
                  range2y:175,
                  range3x:325,
                  range3y:225,
                  range4x:375,
                  range4y:225,
                }
              ]
            }
            
            function pathReducer(state=initialState, action){ // initialize the state argument to be a copy of initial state. Recieve the action as an action arguement
              // golden rule is to never directly alter that initial state above.
              // so we make a copy of the items in state
              // For arrays, we use slice() because slice() will return a new array containing the elements of the old array
              let workspaceHeight = state.workspaceHeight;
              let workspaceWidth = state.workspaceWidth;
              let activeSVGs = state.activeSVGs.slice();
            
              //then set conditionals of how i want to change state based on the action type this reducer recieved as an argument
              //Often people seem to use switch statements here
              //check if the action object's type property equals a specific value
              switch(action.type){ // Reducer is looking at action types
                case types.REMOVE_SVG:  // if the passed in action.type === the value of the REMOVE_SVG variable from the actionTypesVariableNames file. In this case that literally equals the string "Remove_SVG"...
                  // The payload of this action is the class id of a shape. The class_id is acting like an index for this array of SVG objects in state. This ensures that I am only deleting the shape I want 
                  activeSVGs.splice(action.payload.classId, 1); // Remove one item from activeSVG array with the index specified in the payload
                  return { // return the newly manipulated state.
                    ...state,
                    activeSVGs, // we manipulated the activeSVGs array
                  };
        
                case types.SET_RANGE1X: // if the action type matches SET_RANGE1X then run the code below
                  activeSVGs[action.payload.classId].range1x = action.payload.range1x;
                    return {
                      ...state,
                      activeSVGs,
                    };

                default:
                  return state; 
              //if no match actiontypes then return state anyway
              }
            };
            
            // THis example is confusing because it doesnt have the context of the app it was used for... so i will find a simpler example at some point
            
            //-------------
            // 3) Code will be run to interact with state. Then thats it. Redux is done.
            //-------------
            // Notice that when the reducer recieves an action, only the code written inside the matching switch case will run
        // 
  //__________________________________________________________________________________

} 