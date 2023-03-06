import { useState } from "react";
import { useFormularioContext } from "../../context/ContextoFormulario";
import PropTypes from "prop-types";
import usePokemonTypes from "../../hooks/usePokemonTypes";

/**
 * Componente input de formulario.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.name - Nobre del campo de entrada.
 * @param {string} props.label - Etiqueta que describe el campo de entrada.
 * @param {string} [props.type="text"] - Tipo de campo de entrada.
 * @param {string} [props.tipo="entrenador"] - Tipo de forulario.
 * @param {boolean} [props.isFocus=false] - Tiene foco.
 * @returns {JSX.Element} Componente de entrada.
 */
const Input = ({
	name,
	label,
	type = "text",
	tipo = "entrenador",
	isFocus,
}) => {
	const { handleForm } = useFormularioContext();

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

		handleForm({
			type:
				tipo === "entrenador" ? "ACTUALIZAR_ENTRENADOR" : "ACTUALIZAR_POKEMON",
			payload: {
				field: name,
				value: e.target.value,
			},
		});
	};

	if (type === "select") {
		const { data, isLoading, isError } = usePokemonTypes();

		if (isLoading) {
			//? isLoading (primera carga) en lugar de isFetching (por cada petición con data en caché)
			return <p>Cargando</p>;
		}
		if (isError) {
			return <p>Error</p>;
		}

		return (
			<div className="input-contenedor">
				<label htmlFor={name}>{label}</label>
				<select
					onChange={handleChange}
					onBlur={handleBlur}
					value={valueInput}
					name={name}
					id={name}
				>
					{data?.results.map((type, index) => (
						<option key={index} value={type.name}>
							{type.name}
						</option>
					))}
				</select>
			</div>
		);
	}

	return (
		<div className="input-contenedor">
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				value={valueInput}
				id={name}
				onChange={handleChange}
				onBlur={handleBlur}
				autoFocus={isFocus}
			/>
		</div>
	);
};

//  Los campos name y label son requeridos y el campo type y tipo son opcionales y tienen valores por defecto.
Input.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	tipo: PropTypes.string,
	isFocus: PropTypes.boolean,
};

export default Input;
