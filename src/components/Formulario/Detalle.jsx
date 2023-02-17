// Este componente muestra el detalle del formulario completado por el usuario.
// Utiliza el ContextoFormulario para obtener los datos del formulario.
// Cuando se hace clic en el botón "Enviar Solicitud", se muestra una alerta.

import { useContext } from "react";
import { ContextoFormulario } from "../../context/ContextoFormulario";

const Detalle = () => {
	// Obtiene los datos del formulario desde el ContextoFormulario
	const { formulario } = useContext(ContextoFormulario);

	// Destructura los datos del formulario para mostrarlos en el componente
	const { nombre, apellido, email } = formulario?.entrenador;
	const {
		nombrePokemon,
		tipoPokemon,
		elementoPokemon,
		alturaPokemon,
		edadPokemon,
	} = formulario?.pokemon;

	// Maneja el evento de clic en el botón "Enviar Solicitud"
	const handleClick = () => {
		alert("Solicitud enviada ô_ô");
	};

	// Renderiza los datos del formulario y el botón "Enviar Solicitud"
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
