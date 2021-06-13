import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios'

const StateContext = createContext({
	auth: false,
	user: null,
});

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
	switch (type) {
		case "LOGIN":
			return {
				...state,
				auth: true,
				user: payload,
			};

		case "LOGOUT":
			return {
				...state,
				auth: false,
				user: null,
			};

		default:
			throw new Error(`Unknown type action of ${type}`);
	}
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		auth: false,
		user: null,
	});

	useEffect(() => {
		axios.get('/me')
            .then((res) => dispatch({ type: "LOGIN", payload: res.data}))
            .catch((err) => console.log(err));
	}, []);

	return (
		<DispatchContext.Provider value={dispatch}>
			<StateContext.Provider value={state}>{children}</StateContext.Provider>
		</DispatchContext.Provider>
	);
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);