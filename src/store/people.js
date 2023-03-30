import httpService from "../services/httpService";
import { makeid } from "../helpers";

export default {
  state: () => ({
    people: [],
    personToEdit: null,
    page: 1,
  }),
  getters: {
    people: ({ people }) => people,
    personToEdit: ({ personToEdit }) => personToEdit,
    page: ({ page }) => page,
  },
  mutations: {
    setPeople(state, people) {
      state.people = people;
    },
    removePersonByUrl({ people }, url) {
      const index = people.findIndex((p) => p.url === url);
      people.splice(index, 1);
    },
    setPersonToEdit(state, personToEdit) {
      state.personToEdit = personToEdit;
    },
    setPage(state, page) {
      state.page = page;
    },
    savePerson({ people }, person) {
      if (person.url) {
        const index = people.findIndex((p) => p.url === person.url);
        people.splice(index, 1, person);
      } else {
        person.url = makeid(5);
        people.unshift(person);
      }
    },
  },
  actions: {
    async initPeople({ commit, state, getters }) {
      const result = await httpService.get(`people?page=${getters.page}`);
      commit("setPeople", result.results);
    },
    removePerson({ commit }, url) {
      commit("removePersonByUrl", url);
    },
    savePerson({ commit }, person) {
      commit("savePerson", person);
    },
    async peopleNextPage({ dispatch, commit, getters }) {
      if (getters.page === 9) return;
      commit("setPage", getters.page + 1);
      dispatch("initPeople");
    },
    async peopleBackPage({ dispatch, commit, getters }) {
      if (getters.page === 1) return;
      commit("setPage", getters.page - 1);
      dispatch("initPeople");
    },
  },
};
