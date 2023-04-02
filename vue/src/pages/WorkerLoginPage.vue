<template>
  <form class="formContainer" @submit.prevent="handleSubmit">
    <div class="formGroup">
      <h1>Login</h1>
      <div class="inputContainer">
        <label for="cpf">CPF</label>
        <input type="text" required id="email" v-model="cpf" />
      </div>

      <div class="inputContainer">
        <label for="password">Password</label>
        <input required type="password" id="password" v-model="password" />
      </div>
      <router-link to="/funcionario/cadastro">
        <p>Não tem conta?</p>
      </router-link>
      <span v-if="fail === true">Seu login falhou</span>
      <button :disabled="isFormInvalid">Enviar</button>
    </div>
  </form>
</template>

<style src="./styles/WorkerLogin.scss" scoped />
<script lang="ts">
import { defineComponent } from "vue";
import { api } from "../services/api";

export default defineComponent({
  data() {
    return {
      cpf: "",
      password: "",
      fail: false,
    };
  },
  computed: {
    isFormInvalid(): boolean {
      return !this.cpf || !this.password;
    },
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await api.post("/worker/login", {
          cpf: this.cpf,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push("/funcionario/agendamento");
      } catch (err: any) {
        console.log(err.message);
        this.fail = true;
      }
    },
  },
});
</script>
