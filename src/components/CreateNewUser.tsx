import { Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formadata = new FormData(form);

		const name = formadata.get("name") as string;
		const email = formadata.get("email") as string;
		const github = formadata.get("github") as string;

		addUser({ name, email, github });
		form.reset();
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title> Create New User </Title>

			<form onSubmit={handleSubmit} className="">
				<TextInput name="name" placeholder="Nombre" />
				<TextInput name="email" placeholder="Aqui el email" />
				<TextInput name="github" placeholder="Aqui el usuario de github" />

				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Crear Usuario
					</Button>
				</div>
			</form>
		</Card>
	);
}
