import httpService from "../services/httpService";

export default {
  state: () => ({
    people: [],
  }),
  getters: {
    people: ({ people }) => people,
  },
  mutations: {
    setPeople(state, people) {
      state.people = people;
    },
  },
  actions: {
    initPeople({ commit, state }) {
        if (state.people.length) return;
        Promise.all([1,2,3,4,5,6,7,8,9].map(n=>httpService.get(`people?page=${n}`)))
        .then(httpResList=>{
            const result = httpResList.reduce((acc,httpRes)=>{
                acc.push(...httpRes.results)
                return acc
            },[])
            commit('setPeople',result)
        })
        // const resHttp =  await httpService.get(`people?page=1`)
        // console.log('resHttp :>> ', resHttp);
        // commit('setPeople',[1])
    },
  },
};
