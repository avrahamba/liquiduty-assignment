<template>
    <v-table theme="dark">
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            birth_year
          </th>
          <th class="text-left">
            eye_color
          </th>
          <th class="text-left">
            gender
          </th>
          <th class="text-left">
            hair_color
          </th>
          <th class="text-left">
            height
          </th>
          <th class="text-left">
            mass
          </th>
          <th class="text-left">
            skin_color
          </th>
          <th class="text-left">
            homeworld
          </th>
          <th class="text-left">
            films
          </th>
          <th class="text-left">
            species
          </th>
          <th class="text-left">
            starships
          </th>
          <th class="text-left">
            vehicles
          </th>
          <th class="text-left">
            url
          </th>
          <th class="text-left">
            created
          </th>
          <th class="text-left">
            edited
          </th>
        </tr>
    </thead>
    <tbody>
        <tr
        v-for="item in people"
        :key="item.name"
        >
        <td>{{ item.name }}</td>
        <td>{{ item.birth_year }}</td>
        <td>{{ item.birth_year }}</td>
        <td>{{item.eye_color}}</td>
        <td>{{item.gender}}</td>
    <td>{{item.hair_color}}</td>
    <td>{{item.height}}</td>
    <td>{{item.mass}}</td>
    <td>{{item.skin_color}}</td>
    <td>{{item.homeworld}}</td>
    <td>{{item.films}}</td>
    <td>{{item.species}}</td>
    <td>{{item.starships}}</td>
    <td>{{item.vehicles}}</td>
    <td>{{item.url}}</td>
    <td>{{item.created}}</td>
    <td>{{item.edited}}</td>
        </tr>
      </tbody>
    </v-table>
  </template>

<script>
export default{
    name:'People',
    created(){
        this.$store.dispatch('initPeople')
    },
    computed:{
        people(){
            return this.$store.getters.people
        }
    }
}
</script>