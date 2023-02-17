import { useState } from "react";
import { useFormularioContext } from "../../context/ContextoFormulario";

/**
 * Componente input de formulario.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.name - Nobre del campo de entrada.
 * @param {string} props.label - Etiqueta que describe el campo de entrada.
 * @param {string} [props.type="text"] - Tipo de campo de entrada.
 * @param {string} [props.tipo="entrenador"] - Tipo de forulario.
 * @returns {JSX.Element} Componente de entrada.
 */
const Input = ({ name, label, type = "text", tipo = "entrenador" }) => {
	// Destructuring de la función 'handleForm' del contexto del formulario
	const { handleForm } = useFormularioContext();

	// Establece el estado inicial local
	const [valueInput, setValueInput] = useState("");

	/**
	 * Manejador de cambios para actualizar el valor de entrada.
	 * @param {Object} e - Evento del cambio.
	 */
	const handleChange = (e) => {
		setValueInput(e.target.value);
	};

	/**
	 * Manejador de desenfoque para enviar los datos de entrada actualizados al contexto.
	 * @param {Object} e - Evento del desenfoque.
	 */
	const handleBlur = (e) => {
		e.preventDefault();

		// Envía la acción adecuada según el valor del prop 'tipo'
		handleForm({
			type:
				tipo === "entrenador" ? "ACTUALIZAR_ENTRENADOR" : "ACTUALIZAR_POKEMON",
			payload: {
				field: name,
				value: e.target.value,
			},
		});
	};

	return (
		<div className="input-contenedor">
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				value={valueInput}
				id={name}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		</div>
	);
};

export default Input;
