import { useQuery } from "react-query";
import { pokemonApi } from "../api/pokemonApi";

async function getTypes() {
	const { data } = await pokemonApi.get("/type");

	return data;
}

export default function usePokemonTypes() {
	const typesQuery = useQuery(["types"], getTypes);

	return typesQuery;
}
