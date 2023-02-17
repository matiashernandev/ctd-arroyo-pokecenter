import React, { useState, useContext } from "react";
import { ContextoFormulario } from "../../context/ContextoFormulario";

// Componente de entrada reutilizable que recibe varios props para renderizar diferentes campos de entrada
const Input = ({ name, label, type = "text", tipo = "entrenador" }) => {
	// Obtener la función 'handleForm' del contexto del formulario
	const { handleForm } = useContext(ContextoFormulario);

	// Establecer el estado inicial del valor de entrada y definir el controlador de cambio
	const [valueInput, setValueInput] = useState("");
	const onChange = (e) => {
		setValueInput(e.target.value);
	};

	// Definir el controlador 'onBlur' para enviar los datos actualizados al contexto del formulario al perder el foco de entrada
	const onBlur = (e) => {
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
				onChange={onChange}
				onBlur={onBlur}
			/>
		</div>
	);
};

export default Input;
