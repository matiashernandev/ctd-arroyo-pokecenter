// Aqui debemos crear nuestro contexto y nuestro provider.
import { createContext, useState } from "react";

// Creación del Contexto y valor inicial
export const ContextoFormulario = createContext({
	formulario: {
		nombre: "",
		apellido: "",
		email: "",
		nombrePokemon: "",
	},
	cargaFormulario: () => {},
});

const { Provider } = ContextoFormulario;

export const FormularioProvider = ({ children }) => {
	const [formulario, setFormulario] = useState("");

	const cargaFormulario = (data) => {
		setFormulario(data);
	};

	return (
		<ContextoFormulario.Provider
			value={{
				formulario,
				cargaFormulario,
			}}
		>
			{children}
		</ContextoFormulario.Provider>
	);
};
