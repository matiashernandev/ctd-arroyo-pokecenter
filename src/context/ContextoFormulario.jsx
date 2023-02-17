import { createContext, useReducer } from "react";

// Definimos el estado inicial del form
const initialState = {
	entrenador: {
		nombre: "",
		apellido: "",
		email: "",
	},
	pokemon: {
		nombrePokemon: "",
		tipoPokemon: "",
		elementoPokemon: "",
		alturaPokemon: "",
		edadPokemon: "",
	},
};

// Creamos nuestro reducer
const reducer = (state, action) => {
	switch (action.type) {
		// Actualizamos los datos del entrenador en el state
		case "ACTUALIZAR_ENTRENADOR":
			return {
				...state,
				entrenador: {
					...state.entrenador,
					[action.payload.field]: action.payload.value,
				},
			};
		// Actualizamos los datos del pokemon en el state
		case "ACTUALIZAR_POKEMON":
			return {
				...state,
				pokemon: {
					...state.pokemon,
					[action.payload.field]: action.payload.value,
				},
			};
		// Si se recibe una acción desconocida, se lanza una amigable advertencia
		default:
			throw new Error("No se ha recibido una acción válida");
	}
};

// Creamos nuestro contexto y nuestro provider
export const ContextoFormulario = createContext();

export const FormularioProvider = ({ children }) => {
	const [formulario, dispatch] = useReducer(reducer, initialState);

	// Función para manejar los datos del form
	const handleForm = ({ type, payload }) => {
		dispatch({
			type,
			payload,
		});
	};

	return (
		<ContextoFormulario.Provider
			value={{
				formulario,
				handleForm,
			}}
		>
			{children}
		</ContextoFormulario.Provider>
	);
};
