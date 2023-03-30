<template>
  <v-dialog v-model="open" width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Person</span>
      </v-card-title>
      <v-form @submit.prevent="saveDialog">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="personToEdit.name"
                  label="Name"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="personToEdit.gender"
                  label="Select"
                  :items="['male', 'female', 'n/a']"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="personToEdit.birth_year"
                  label="Birth year"
                  required
                />
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  type="number"
                  v-model="personToEdit.height"
                  label="Height"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  type="number"
                  v-model="personToEdit.mass"
                  label="Mass"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click.passive="closeDialog"
          >
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" type="submit">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalEdit",
  data() {
    return {
      personToEdit: {},
    };
  },
  computed: {
    open: {
      get() {
        return !!this.$store.getters.personToEdit;
      },
      set(val) {
        if (!val) {
          this.closeDialog();
        }
      },
    },
    personfromStore() {
      return this.$store.getters.personToEdit;
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit("setPersonToEdit");
    },
    saveDialog() {
      this.$store.dispatch("savePerson", this.personToEdit);
      this.closeDialog();
    },
  },
  watch: {
    personfromStore(val) {
      this.personToEdit = { ...val } || {};
    },
  },
};
</script>
