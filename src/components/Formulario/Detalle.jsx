/**
 * Muestra los detalles del formulario y permite enviar la solicitud.
 * @returns {JSX.Element} Componente de detalles del formulario
 */
import { useEffect } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useFormularioContext } from "../../context/ContextoFormulario";

const Detalle = () => {
	//? Con Fetch
	const { mutate, isLoading, isError, isSuccess } = useMutation(
		async (formulario) =>
			fetch("http://localhost:3001/data", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(formulario),
			}).then((response) => response.json())
	);

	/* 	const { mutate, isLoading, isError, isSuccess } = useMutation(
		async (formulario) => {
			try {
				const response = await axios.post(
					"http://localhost:3001/data",
					formulario,
					{
						headers: {
							"Content-type": "application/json; charset=UTF-8",
						},
					}
				);
				return response.data;
			} catch (error) {
				throw new Error(error);
			}
		}
	); */

	useEffect(() => {
		if (isSuccess) {
			alert("Formulario enviado y todo bien");
		} else if (isError) {
			alert("Error en el formulario");
		}
	}, [isSuccess, isError]);

	//TODO validación de datos, alertas, isError, isLoading, is Fetching, Loader, T_T

	const { formulario } = useFormularioContext();

	const { nombre, apellido, email } = formulario?.entrenador;
	const {
		nombrePokemon,
		tipoPokemon,
		elementoPokemon,
		alturaPokemon,
		edadPokemon,
		especiePokemon,
	} = formulario?.pokemon;

	/**
	 * Maneja el evento de clic en el botón de enviar solicitud.
	 * Imprime los datos del formulario en la consola y muestra una alerta.
	 * @todo cambiar la alerta fea
	 */

	const handleClick = () => {
		mutate(formulario);
		//console.log(formulario);
	};

	return (
		<div className="detalle-formulario">
			{/* {isSuccess ? alert("Se ha creado") : ""} */}

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
					<p>Especie: {especiePokemon}</p>
				</div>
			</section>
			<button className="boton-enviar" onClick={handleClick}>
				Enviar Solicitud
			</button>
		</div>
	);
};

export default Detalle;
