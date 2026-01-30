import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button, TextInput } from "@tremor/react"; // Mezclamos con Tremor para el estilo
import { useAppSelector } from "../hooks/store";
import { useUserActions } from "../hooks/useUserActions";

export function EditUser({ isOpen, onClose, userId }) {
	// Aquí podrías usar el userId para traer la info de Redux y llenar el form

	const users = useAppSelector((state) => state.users);
	const data = users.find((user) => user.id === userId);

	const { editUser } = useUserActions();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formadata = new FormData(form);

		const name = formadata.get("name") as string;
		const email = formadata.get("email") as string;
		const github = formadata.get("github") as string;
		const id = userId;

		editUser({ id, name, email, github });
		form.reset();
	};

	return (
		<Dialog
			open={isOpen}
			as="div"
			className="relative z-50 focus:outline-none"
			onClose={onClose}
		>
			{/* Backdrop (Fondo oscuro) */}
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm"
				aria-hidden="true"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4">
					<DialogPanel
						transition
						className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
					>
						<DialogTitle
							as="h3"
							className="text-lg font-semibold text-gray-900"
						>
							Editar Usuario
						</DialogTitle>
						<p className="mt-1 text-sm text-gray-500">
							Editando el usuario:{" "}
							<span className="font-mono font-bold text-blue-600">
								{data?.name}
							</span>
						</p>

						<form onSubmit={handleSubmit}>
							<div className="mt-6 space-y-4">
								<div>
									<label className="text-xs font-medium uppercase text-gray-400">
										Nombre
									</label>
									<TextInput
										name="name"
										placeholder="Nombre del usuario"
										defaultValue={data?.name}
									/>
								</div>
								<div>
									<label className="text-xs font-medium uppercase text-gray-400">
										Email
									</label>
									<TextInput
										name="email"
										placeholder="correo@ejemplo.com"
										defaultValue={data?.email}
									/>
								</div>

								<div>
									<label className="text-xs font-medium uppercase text-gray-400">
										Github
									</label>
									<TextInput
										name="github"
										placeholder="correo@ejemplo.com"
										defaultValue={data?.github}
									/>
								</div>
							</div>

							<div className="mt-8 flex justify-end gap-3">
								<Button variant="secondary" onClick={onClose}>
									Cancelar
								</Button>
								<Button
									type="submit"
									onClick={() => {
										onClose();
									}}
								>
									Guardar Cambios
								</Button>
							</div>
						</form>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
