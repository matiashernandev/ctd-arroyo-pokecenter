import { createContext, useReducer } from "react";

// Definimos el estado inicial de nuestro formulario
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
		// Actualizamos los datos del entrenador en el estado
		case "ACTUALIZAR_ENTRENADOR":
			return {
				...state,
				entrenador: {
					...state.entrenador,
					[action.payload.field]: action.payload.value,
				},
			};
		// Actualizamos los datos del pokemon en el estado
		case "ACTUALIZAR_POKEMON":
			return {
				...state,
				pokemon: {
					...state.pokemon,
					[action.payload.field]: action.payload.value,
				},
			};
		// Si se recibe una acción desconocida, lanzamos un error
		default:
			throw new Error("No se ha recibido una acción");
	}
};

// Creamos nuestro contexto y nuestro provider
export const ContextoFormulario = createContext();

export const FormularioProvider = ({ children }) => {
	const [formulario, dispatch] = useReducer(reducer, initialState);

	// Función para actualizar los datos del formulario
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
