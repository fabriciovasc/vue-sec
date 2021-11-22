<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="usuario">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="usuario.auth === 'ROLE_ADMIN'">
            <router-link class="nav-link" to="/profiles">Perfis</router-link>
          </li>
        </ul>
        <div class="navbar-text">
          <a style="cursor: pointer;" v-on:click="logout">Sair</a>
        </div>
      </div>
    </nav>
    <div class="container-fluid p-5">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState([
      'usuario'
    ])
  },
  methods: {
    ...mapMutations([
      'logout'
    ])
  },
  created() {
    console.log('usuario', this.usuario)
  }
}
</script>
