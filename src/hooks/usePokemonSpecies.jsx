import { useQuery } from "react-query";
import { pokemonApi } from "../api/pokemonApi";
import { sleep } from "../helpers/sleep";

const getSpecies = async () => {
	const { data } = await pokemonApi.get("/pokemon-species");
	await sleep(1.5); //? para testear loader
	return data;
};

export default function usePokemonSpecies() {
	const speciesQuery = useQuery(["species"], getSpecies);

	return speciesQuery;
}
