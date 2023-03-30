<template>
  <v-btn class="m-2" @click="backPage">back</v-btn>
  <v-btn class="m-2" @click="nextPage">next</v-btn>
  <v-table height="600px" fixed-header >
    <thead>
      <tr>
        <th class="text-left w-th">Name</th>
        <th class="text-left w-6">Gender</th>
        <th class="text-left w-6">Birth year</th>
        <th class="text-left w-6">Height</th>
        <th class="text-left w-6">Mass</th>
        <th class="text-left w-4" ></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in people"
        :key="item.name"
        @mouseover="r_index = index"
        @mouseleave="r_index = -1"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.birth_year }}</td>
        <td >{{ item.height }}</td>
        <td >{{ item.mass }}</td>
        <td class="w-4"  v-if="index==r_index"><button @click="editPerson(item)">Edit</button><button @click="removePerson(item.url)">Delete</button></td>
        <td class="w-4" v-else/>
      </tr>
    </tbody>
  </v-table>
  <v-btn class="m-2" @click="creatPerson">Create</v-btn>
</template>

<script>
export default {
  name: "People",
  created() {
    this.$store.dispatch("initPeople");
  },
  data(){
return {
    r_index:-1,
}
  },
  computed: {
    people() {
      return this.$store.getters.people;
    },
  },
  methods: {
    removePerson(itemUrl) {
      this.$store.dispatch("removePerson", itemUrl);
    },
    editPerson(item) {
      this.$store.commit("setPersonToEdit", item);
    },
    creatPerson() {
      this.$store.commit("setPersonToEdit", {
        name: "",
        gender: "",
        birth_year: "",
        height: "",
        mass: "",
      });
    },
    nextPage() {
      this.$store.dispatch("peopleNextPage");
    },
    backPage() {
      this.$store.dispatch("peopleBackPage");
    },
  },
};
</script>

<style scoped lang="scss">
.w-4{
    min-width: 5.5em;
}
.w-5{
    width: 5em;
}
.w-6{
    width: 6em;
}
.w-th{
    width: 100%;
}
.m-2{
    margin: 2em;
}
</style>