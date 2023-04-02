<template>
  <form class="formContainer" @submit.prevent="handleSubmit">
    <div class="formGroup">
      <h1>Cadastro</h1>
      <div class="inputContainer">
        <label for="cpf">CPF</label>
        <input type="text" required id="email" v-model="cpf" />
      </div>

      <div class="inputContainer">
        <label for="password">Password</label>
        <input required type="password" id="password" v-model="password" />
      </div>

      <div class="inputContainer">
        <label for="confirm-password">Confirm password</label>
        <input
          required
          type="password"
          id="confirm-password"
          v-model="confirmPassword"
        />
      </div>
      <div class="inputContainer">
        <label for="permission-password">Permission password</label>
        <input required type="password" v-model="permission_password" />
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
      cpf: "",
      password: "",
      confirmPassword: "",
      permission_password: "",
    };
  },
  computed: {
    isFormInvalid(): boolean {
      return (
        !this.cpf ||
        !this.password ||
        !this.confirmPassword ||
        this.password !== this.confirmPassword ||
        !this.permission_password
      );
    },
  },
  methods: {
    async handleSubmit() {
      try {
        await api.post("/worker/create", {
          cpf: this.cpf,
          password: this.password,
          permission_password: this.permission_password,
        });
      } catch (err: any) {
        console.log(err.message);
      }
    },
  },
});
</script>
