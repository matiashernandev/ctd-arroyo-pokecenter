/**
 * Muestra los detalles del formulario y permite enviar la solicitud.
 * @returns {JSX.Element} Componente de detalles del formulario
 */

import axios from "axios";
import { useMutation } from "react-query";
import { useFormularioContext } from "../../context/ContextoFormulario";

const Detalle = () => {
	/* const mutation = useMutation(newPost => {
		return axios.post()
	} )
 */

	const mutation = useMutation(
		async (formulario) =>
			fetch("https://jsonplaceholder.typicode.com/posts", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(formulario),
			}).then((response) => response.json())
		// .then((json) => console.log(json))
	);

	const { formulario } = useFormularioContext();

	const { nombre, apellido, email } = formulario?.entrenador;
	const {
		nombrePokemon,
		tipoPokemon,
		elementoPokemon,
		alturaPokemon,
		edadPokemon,
	} = formulario?.pokemon;

	/**
	 * Maneja el evento de clic en el botón de enviar solicitud.
	 * Imprime los datos del formulario en la consola y muestra una alerta.
	 * @todo cambiar la alerta fea
	 */

	const handleClick = () => {
		mutation.mutate(formulario);
		//console.log(formulario);
	};

	return (
		<div className="detalle-formulario">
			{mutation.isSuccess ? alert("Se ha creado") : ""}

			<section className="datos-cliente">
				<h4>Datos del Entrenador</h4>
				<div className="fila">
					<p>Nombre: {nombre}</p>
					<p>Apellido: {apellido}</p>
					<p>Email: {email}</p>
				</div>
			</section>
			<section className="datos-cliente">
				<h4>Datos del Pokémon</h4>
				<div className="fila">
					<p>Nombre: {nombrePokemon}</p>
					<p>Tipo: {tipoPokemon}</p>
					<p>Elemento: {elementoPokemon}</p>
					<p>Altura: {alturaPokemon}</p>
					<p>Edad: {edadPokemon}</p>
				</div>
			</section>
			<button className="boton-enviar" onClick={handleClick}>
				Enviar Solicitud
			</button>
		</div>
	);
};

export default Detalle;
