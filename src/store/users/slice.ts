import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Yasmanito",
		email: "yasmanito@gmail.com",
		github: "yasmanitodev",
	},
	{
		id: "2",
		name: "juanito",
		email: "yasmanito@gmail.com",
		github: "yasmanitodev",
	},
	{
		id: "3",
		name: "Manquito",
		email: "yasmanito@gmail.com",
		github: "yasmanitodev",
	},
	{
		id: "4",
		name: "El mero mero",
		email: "yasmanito@gmail.com",
		github: "yasmanitodev",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) {
		return JSON.parse(persistedState).users;
	}
	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
			// return [
			// 	...state,
			// 	{
			// 		id,
			// 		...action.payload,
			// 	},
			// ];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				// return [...state, action.payload];
				state.push(action.payload);
			}
		},
	},
});

export default usersSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;
