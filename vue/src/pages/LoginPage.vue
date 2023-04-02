<template>
  <form className="formContainer" @submit.prevent="sendData">
    <div className="formGroup">
      <h1>Login</h1>

      <div className="inputContainer">
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          placeholder="ex: johndoe@johndoe.com"
          v-model="email"
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          placeholder="ex: !@#$%1542test"
          v-model="password"
        />
      </div>
      <router-link to="/cadastro">Não tem conta?</router-link>
      <span v-if="fail === true">Falha ao logar</span>
      <button type="submit">Enviar</button>
    </div>
  </form>
</template>

<style src="./styles/Login.scss" scoped />

<script lang="ts">
import { defineComponent } from "vue";
import { api } from "../services/api";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      fail: false,
    };
  },
  methods: {
    async sendData() {
      try {
        const response = await api.post("/client/login", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        this.$router.back();
      } catch (error) {
        console.error(error);
        this.fail = true;
      }
    },
  },
});
</script>
