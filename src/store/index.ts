import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previousState = store.getState();

		console.log({ type, payload });
		// fase 1
		next(action);

		if (type === "users/deleteUserById") {
			const userIdToRemove = payload;
			const userToRemove = previousState.users.find(
				(user) => user.id === userIdToRemove,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) {
						toast.success(`Usuario con el ${payload} eliminado correctamente`);
					}
					throw new Error("Error al eliminar el usuario");
				})
				.catch(() => {
					toast.error(`Error deleting user ${userIdToRemove}`);
					if (userToRemove) store.dispatch(rollbackUser(userToRemove));
					console.log("error");
				});
		}

		if (type === "users/addNewUser") {
			fetch("https://jsonplaceholder.typicode.com/posts", {
				method: "POST",
			})
				.then((res) => {
					if (res.ok)
						toast.success(
							`Usuario con el nombre ${payload.name} guardado correctamente`,
						);
				})
				.catch(() => {
					console.log("error");
				});
		}

		if (type === "users/editUserById") {
			fetch("https://jsonplaceholder.typicode.com/posts", {
				method: "POST",
			})
				.then((res) => {
					if (res.ok)
						toast.success(
							`Usuario con el nombre ${payload.name} guardado correctamente`,
						);
				})
				.catch(() => {
					console.log("error");
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
