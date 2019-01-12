function createStore(reducer) {
  // The store contains of four parts
  // 1. The state
  // 2. Access the state
  // 3. Listen to changes on the state
  // 4. Update the state // Action will update the state
  let state;
  let listeners = [];
  const getState = () => state;
  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };
  const dispatch = action => {
    // The the reducer we made for updating the state. (addTodo)
    state = reducer(state, action);
    // Inform all the listener that subscribed about the store update.
    listeners.forEach(listener => listener());
  };
  return {
    getState,
    subscribe,
    dispatch
  };
}

// You can not allow anyone to update the state so we need to have some set
// of rules for updating the state.
// How about having a collection of events that changes the list state of the app.

// Example:-
// var addTodo = {
//   type: "ADD_TODO",
//   todo: {
//     id: 0,
//     text: "Task 1",
//     completed: false
//   }
// };

// var removeTodo = {
//   type: "REMOVE_TODO",
//   id: 0
// };

// Reducer will take a state and action and return a new state.
// To increase the predictability of the state change we will use a pure function.
// Characteristics of a pure function :-
// Pure function always return same output for the same input
// A pure function only depends on the the value passed to it.
// Never produces any side effect

// Example:-

function todo(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : {
              ...todo,
              completed: !todo.completed
            }
      );
    case "REMOVE_TODO":
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

function goal(state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "TOGGLE_GOAL":
      return state.map(goal =>
        goal.id !== action.id
          ? goal
          : {
              ...goal,
              completed: !goal.completed
            }
      );
    case "REMOVE_GOAL":
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

// We can have multiple reducers so we will have to create a function rootReducer
function rootReducer(state = {}, action) {
  return {
    todos: todo(state.todos, action),
    goals: goal(state.goals, action)
  };
}

var store = createStore(rootReducer);
store.subscribe(() =>
  console.log("The State Of the app is:", store.getState())
);
store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    text: "Task 1",
    completed: false
  }
});
store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 1,
    text: "Task 1",
    completed: false
  }
});
store.dispatch({
  type: "TOGGLE_TODO",
  id: 0
});
store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 1,
    text: "Task 1",
    completed: false
  }
});
// const unsubscribe = store.subscribe(() => {});
