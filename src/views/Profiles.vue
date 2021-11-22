<template>
  <div class="profiles">
    <div class="row">
      <h1>Perfis</h1>
    </div>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Hash único</th>
          <th scope="col">UUID</th>
          <th scope="col">Duplicados</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="profile in profiles" :key="profile.id">
          <td>{{ profile.id }}</td>
          <td>{{ profile.uniqueHash }}</td>
          <td>{{ profile.uuid }}</td>
          <td>{{ profile.registrations.length }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import HttpService from '@/services/HttpService';

export default {
  name: 'profiles',
  data() {
    return {
      profiles: []
    }
  },
  methods: {
    async refresh() {
      this.profiles = await HttpService.get('profile');
      console.log(this.profiles)
    }
  },
  created () {
    console.log('teste')
    this.refresh();
  }
}
</script>
