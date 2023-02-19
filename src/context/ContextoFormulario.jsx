import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

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
			throw new Error("No se ha recibido una acción válida zonzo");
	}
};

// Creamos nuestro contexto y nuestro provider
export const ContextoFormulario = createContext();

export const FormularioProvider = ({ children }) => {
	const [formulario, dispatch] = useReducer(reducer, initialState);

	// Función para manejar los datos del form
	/**
	 * Maneja los datos del formulario
	 * @param {{type: string, payload: {field: string, value: string}}} param0
	 */
	const handleForm = ({ type, payload }) => {
		dispatch({
			type,
			payload,
		});
	};

	//El parámetro param0 es una convención utilizada en JavaScript y otros lenguajes para referirse al primer parámetro de una función cuando no se le ha asignado un nombre específico.

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

// FormularioProvider tiene una única propiedad requerida llamada children que debe ser de tipo node.

FormularioProvider.propType = {
	children: PropTypes.node.isRequired,
};

/**
 * Este hook se utiliza para obtener el contexto del formulario.
 * @returns {{formulario: {}, handleForm: function}}
 */
export function useFormularioContext() {
	return useContext(ContextoFormulario);
}

// useFormularioContext espera que el objeto devuelto tenga una propiedad formulario de tipo objeto y una propiedad handleForm de tipo función.

useFormularioContext.propTypes = {
	formulario: PropTypes.object.isRequired,
	handleForm: PropTypes.func.isRequired,
};
