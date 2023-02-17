import { useState, useContext } from "react";
import { ContextoFormulario } from "../../context/ContextoFormulario";

const Input = ({ name, label, type = "text", tipo = "entrenador" }) => {
	// Destructuring de la función 'handleForm' del contexto del formulario
	const { handleForm } = useContext(ContextoFormulario);

	// Establece el estado inicial local
	const [valueInput, setValueInput] = useState("");
	const handleChange = (e) => {
		setValueInput(e.target.value);
	};

	const handleBlur = (e) => {
		e.preventDefault();

		handleForm({
			// Envía la acción adecuada según el valor del prop 'tipo'
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
