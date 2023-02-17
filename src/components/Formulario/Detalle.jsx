/**
 * Muestra los detalles del formulario y permite enviar la solicitud.
 * @returns {JSX.Element} Componente de detalles del formulario
 */

import { useFormularioContext } from "../../context/ContextoFormulario";

const Detalle = () => {
	// Obtiene los datos del formulario desde el ContextoFormulario
	/* const { formulario } = useContext(ContextoFormulario); */
	const { formulario } = useFormularioContext();

	// Destructura los datos del formulario para mostrarlos en el componente
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
		console.log(formulario);
		alert("Solicitud enviada ô_ô");
	};

	return (
		<div className="detalle-formulario">
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
