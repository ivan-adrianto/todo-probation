import types from '../action/types'

const initialState = {
  todos: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload[0]]
      }
    }
    case types.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(after => after.id !== action.payload)
      }
    }
    case types.UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map(fresh => action.payload.find(wanted => wanted.id === fresh.id) || fresh)
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default rootReducer
