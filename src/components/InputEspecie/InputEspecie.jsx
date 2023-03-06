import { useContext, useEffect, useState } from "react";
import { ContextoFormulario } from "../../context/ContextoFormulario";
import usePokemonSpecies from "../../hooks/usePokemonSpecies";

const InputEspecie = ({ name, label }) => {
	const [mostrarPopup, setMostrarPopup] = useState(false);
	const [especies, setEspecies] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [currentSpecie, setCurrentSpecie] = useState(null);

	const { handleForm } = useContext(ContextoFormulario);

	const { data, isLoading } = usePokemonSpecies({ page: currentPage });

	useEffect(() => {
		if (data) {
			setEspecies(data.results);
			setTotalPages(Math.ceil(data.count / 20));
			//console.log(data.results);
		}
	}, [data]);

	const elegirEspecie = (e, nombreEspecie) => {
		e.preventDefault();

		handleForm({
			type: "ACTUALIZAR_POKEMON",
			payload: {
				field: "especiePokemon",
				value: nombreEspecie,
			},
		});
		setCurrentSpecie(nombreEspecie);

		setMostrarPopup(false);
	};
	const renderizarEspecies = () => (
		<>
			{especies.map((especie) => (
				<button
					key={especie.name}
					className="botones-especie"
					onClick={(e) => elegirEspecie(e, especie.name)}
				>
					{especie.name}
				</button>
			))}
		</>
	);

	const irAPaginaAnterior = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	const irAPaginaSiguiente = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	if (especies) {
		return (
			<div className="input-contenedor">
				{mostrarPopup && (
					<div className="popup-especie">
						<span>
							Página {currentPage} de {totalPages}
						</span>
						<h4>Seleccionar especie</h4>
						{isLoading && (
							<div style={{ position: "absolute", left: "40%" }}>Cargando</div>
						)}
						<div className="contenedor-especies">{renderizarEspecies()}</div>
						<div className="paginador">
							<button
								disabled={currentPage === 1}
								onClick={irAPaginaAnterior}
								className="boton-anterior"
							>
								Anterior
							</button>
							<button onClick={irAPaginaSiguiente} className="boton-siguiente">
								Siguiente
							</button>
						</div>
					</div>
				)}
				<p htmlFor={name}>{label}</p>
				<button
					className="boton-seleccionar-especies"
					onClick={() => setMostrarPopup(true)}
				>
					{currentSpecie || "Seleccionar"}
				</button>
			</div>
		);
	}
};

export default InputEspecie;
