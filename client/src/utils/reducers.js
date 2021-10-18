import { useReducer } from "react"
import {
  UPDATE_REVIEW_APPLICANTS
} from './actions'

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_REVIEW_APPLICANTS:
      return {
        ...state,
        items: action.items
      }
    default:
      return state
  }
}

export function useItemReducer(state) {
  return useReducer(reducer, state)
}
