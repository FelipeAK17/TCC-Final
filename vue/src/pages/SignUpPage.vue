<template>
  <form class="formContainer" @submit.prevent="handleSubmit">
    <div class="formGroup">
      <h1>Cadastro</h1>
      <div class="inputContainer">
        <label for="email">Email:</label>
        <input type="email" required id="email" v-model="email" />
      </div>

      <div class="inputContainer">
        <label for="password">Password:</label>
        <input required type="password" id="password" v-model="password" />
      </div>

      <div class="inputContainer">
        <label for="confirm-password">Confirm Password:</label>
        <input
          required
          type="password"
          id="confirm-password"
          v-model="confirmPassword"
        />
      </div>
      <button :disabled="isFormInvalid">Enviar</button>
    </div>
  </form>
</template>

<style src="./styles/SignUp.scss" scoped />
<script lang="ts">
import { defineComponent } from "vue";
import { api } from "../services/api";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    isFormInvalid(): boolean {
      return (
        !this.email ||
        !this.password ||
        !this.confirmPassword ||
        this.password !== this.confirmPassword ||
        !this.isEmailValid
      );
    },
    isEmailValid(): boolean {
      // basic email validation regex
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(this.email);
    },
  },
  methods: {
    async handleSubmit() {
      const response = await api.post("/client", {
        email: this.email,
        password: this.password,
      });
      console.log(response.data);
    },
  },
});
</script>
