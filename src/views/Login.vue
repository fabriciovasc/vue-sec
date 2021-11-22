<template>
  <form @submit.prevent="login">
    <h2>Login</h2>
    <div class="form-group">
      <label for="username">Usuário</label>
      <input type="text" id="username" class="form-control" required autofocus v-model="nome">
    </div>
    <div class="form-group">
      <label for="inputPassword">Senha</label>
      <input type="password" id="inputPassword" class="form-control" required v-model="senha">
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Ok</button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'
import HttpService from '@/services/HttpService';

export default {
  name: 'login',
  data() {
    return {
      nome: '',
      senha: ''
    }
  },
  methods: {
    ...mapMutations([
      'setUsuario',
      'setToken'
    ]),
    async login() {
      const data = {
        username: this.nome,
        password: this.senha
      }
      const {user} = await HttpService.login(data) || {};
      this.setUsuario(user);
      this.setToken(user.token);
      await this.$router.push('/');
    }
  }
}
</script>
