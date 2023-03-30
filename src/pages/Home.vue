<template>
  <div class="home-container d-flex align-center flex-column">
    <v-card class="card">
      <v-text-field
        density="compact"
        variant="solo"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        v-model="searchText"
        label="Label"
      />
      <v-table fixed-header>
        <tbody>
          <tr v-for="(searchResult, index) in searchResultList" :key="index">
            <td
              class="title"
              v-if="searchResult.type === 'title'"
              v-text="searchResult.text"
            />
            <td
              v-if="searchResult.type === 'text'"
              v-html="searchResult.text"
            />
            <td
              class="router-link-container"
              v-if="searchResult.type === 'btn'"
            >
              <router-link class="router-link" :to="searchResult.text"
                ><span>View all</span> <v-icon icon="mdi-arrow-right"></v-icon
              ></router-link>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
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
  methods: {
    onClick() {
      console.log("1 :>> ", 1);
    },
  },
  computed: {
    searchResultList() {
      return this.$store.getters.searchResult
        .filter((res) => res.results.length)
        .reduce((acc, res) => {
          acc.push(
            ...[
              { type: "title", text: res.name },
              ...res.results.map((text) => ({ type: "text", text })),
              { type: "btn", text: res.name },
            ]
          );
          return acc;
        }, []);
    },
  },
  watch: {
    searchText: debounce(function (val) {
      this.$store.dispatch("searchText", val);
    }, 200),
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  padding-top: 5em;
  .card {
    width: 40em;
    padding: 2em;
  }
}
.title {
  font-size: 1.2em;
  font-weight: 500;
}

.router-link-container {
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}
.router-link {
  font-size: 1.2em;
  display: flex;
  align-items: center;
  & > * {
    margin-inline-end: 0.5em;
  }
}
</style>
<style lang="scss" scoped>
.home-container
  .v-table
  .v-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border-bottom: none;
}
</style>
