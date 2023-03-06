import { useEffect } from "react";
import { useMutation } from "react-query";
import { useFormularioContext } from "../../context/ContextoFormulario";

import axios from "axios";

const Detalle = () => {
	//? Con Fetch
	/* 	const { mutate, isLoading, isError, isSuccess } = useMutation(
		async (formulario) =>
			fetch("http://localhost:3001/data", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(formulario),
			}).then((response) => response.json())
	); */

	const { mutate, isError, isSuccess } = useMutation(async (formulario) => {
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
	});

	useEffect(() => {
		if (isSuccess) {
			alert("Formulario enviado y todo bien");
		} else if (isError) {
			alert("Error en el formulario");
		}
	}, [isSuccess, isError]);

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

	const handleClick = () => {
		mutate(formulario);
		//console.log(formulario);
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
