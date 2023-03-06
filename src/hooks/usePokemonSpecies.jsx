import { useQuery } from "react-query";
import { pokemonApi } from "../api/pokemonApi";
import { sleep } from "../helpers/sleep";

const getSpecies = async ({ page = 1, pageSize = 20 } = {}) => {
	const { data } = await pokemonApi.get(
		`/pokemon-species?offset=${(page - 1) * pageSize}&limit=${pageSize}`
	);
	await sleep(1.5); //? para testear loader
	return data;
};

export default function usePokemonSpecies(pageOptions) {
	const speciesQuery = useQuery(["species", pageOptions], () =>
		getSpecies(pageOptions)
	);

	return speciesQuery;
}
