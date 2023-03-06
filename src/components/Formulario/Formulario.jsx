/**
 * Componente que renderiza un formulario para solicitar atención para un Pokémon
 * @returns {JSX.Element} Componente de formulario
 */

import { Link } from "react-router-dom";
import entrenador from "../../assets/entrenador.png";
import pikachu from "../../assets/pikachu.png";
import pokebola from "../../assets/pokebola.png";
import { FormularioProvider } from "../../context/ContextoFormulario";

import Input from "../Input/Input";
import InputEspecie from "../InputEspecie/InputEspecie";
import Detalle from "./Detalle";

const Formulario = () => {
	return (
		<>
			<header className="form-header">
				<div>
					<img src={pokebola} alt="pokebola" />
					<h2>Centro Pokemon de Ash</h2>
				</div>
				<Link className="volver" to="/">
					Home
				</Link>
			</header>
			<div className="formulario-ingreso">
				<h3>Solicitud de atención</h3>
				<p>
					Por favor, completa el formulario para que podamos atender a tu
					pokémon
				</p>
				<div className="cuerpo-formulario">
					<FormularioProvider>
						<div className="inputs">
							<div>
								<p className="nombre-seccion">
									<img src={entrenador} alt="entrenador" />
									<span>ENTRENADOR</span>
								</p>
								<Input isFocus name="nombre" label="Nombre" />
								<Input name="apellido" label="Apellido" />
								<Input name="email" label="Email" type="email" />
							</div>
							<div>
								<p className="nombre-seccion">
									<img src={pikachu} alt="pikachu" />
									<span>POKEMON</span>
								</p>
								<Input name="nombrePokemon" label="Nombre" tipo="pokemon" />
								<Input
									name="tipoPokemon"
									label="Tipo"
									tipo="pokemon"
									type="select"
								/>
								<Input name="elementoPokemon" label="Elemento" tipo="pokemon" />
								<Input name="alturaPokemon" label="Altura" tipo="pokemon" />
								<Input name="edadPokemon" label="Edad" tipo="pokemon" />
								<InputEspecie name="especiePokemon" label="Especie" />
							</div>
						</div>
						<Detalle />
					</FormularioProvider>
				</div>
			</div>
		</>
	);
};

export default Formulario;
