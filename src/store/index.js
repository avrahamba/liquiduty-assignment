import { createStore } from "vuex";
import httpService from "../services/httpService";
import people from "./people";

export default createStore({
  state: {
    searchResult_films: [],
    searchResult_people: [],
    searchResult_planets: [],
    searchResult_species: [],
    searchResult_starships: [],
    searchResult_vehicles: [],
    page: 1,
  },
  getters: {
    searchResult({
      searchResult_films,
      searchResult_people,
      searchResult_planets,
      searchResult_species,
      searchResult_starships,
      searchResult_vehicles,
    }) {
      return [
        { name: "Films", results: searchResult_films },
        { name: "People", results: searchResult_people },
        { name: "Planets", results: searchResult_planets },
        { name: "Species", results: searchResult_species },
        { name: "Starships", results: searchResult_starships },
        { name: "Vehicles", results: searchResult_vehicles },
      ];
    },
    page: ({ page }) => page,
  },
  mutations: {
    setSearchResult(state, { type, values, searchText }) {
      const typesTitle = {
        films: "title",
        people: "name",
        planets: "name",
        species: "name",
        starships: "name",
        vehicles: "name",
      };
      state[`searchResult_${type}`] =
        values?.results?.reduce((acc, res, i) => {
          if (i < 3) {
            let text = res[typesTitle[type]];
            const index = text.toLowerCase().indexOf(searchText.toLowerCase());
            if (index === -1) {
              acc.push(text);
              return acc;
            }
            acc.push(
              text.substr(0, index) +
                "<b>" +
                text.substr(index, searchText.length) +
                "</b>" +
                text.substr(index + searchText.length)
            );
          }
          return acc;
        }, []) || [];
    },
    setPage(state, page) {
      state.page = page;
    },
  },
  actions: {
    async searchText({ commit }, value) {
      const types = [
        "films",
        "people",
        "planets",
        "species",
        "starships",
        "vehicles",
      ];
      types.forEach((type) => {
        commit(`setSearchResult`, {
          type,
          values: [],
        });
      });
      if (!value) return;
      types.forEach(async (type) => {
        commit(`setSearchResult`, {
          type,
          values: await httpService.get(`${type}?search=${value}`),
          searchText: value,
        });
      });
    },
  },
  modules: { people },
});
