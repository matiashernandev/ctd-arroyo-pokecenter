import { useQuery } from "react-query";
import { pokemonApi } from "../api/pokemonApi";
import { sleep } from "../helpers/sleep";

const getTypes = async () => {
	const { data } = await pokemonApi.get("/type");
	await sleep(1.5); //? para testear loader
	return data;
};

export default function usePokemonTypes() {
	const typesQuery = useQuery(["types"], getTypes);

	return typesQuery;
}
