import { createContext, useContext, useReducer } from "react";
export const StateContext = createContext();
export const StateProvider = ({ initialState, reducer, children }) => (
    <StateContext.Prodvider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Prodvider>
)

export const useStateProvider = () => useContext(StateContext);