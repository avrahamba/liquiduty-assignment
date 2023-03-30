<template>
  <div>
    <v-text-field v-model="searchText" label="Label"></v-text-field>
    <ul>
      <li v-for="searchResult in searchResultList" :key="searchResult.name">
        {{ searchResult.name }}
        <ul>
          <li v-for="res in searchResult.results" :key="res" v-html="res" />
          <router-link :to="searchResult.name" v-text="'View all -->'"/>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import debounce from "debounce";
export default {
  name: "Home",
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    searchResultList() {
      return this.$store.getters.searchResult.filter(
        (res) => res.results.length
      );
    },
  },
  watch: {
    searchText: debounce(function (val) {
      this.$store.dispatch("searchText", val);
    }, 200),
  },
};
</script>
