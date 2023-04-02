<template>
  <div class="container">
    <div class="links">
      <h1>FUNCIONARIO</h1>
      <router-link to="/funcionario/login">
        <h2>Login</h2>
      </router-link>
      <router-link to="/funcionario/agendamento">
        <h2>Agendamentos</h2>
      </router-link>
      <router-link to="/funcionario/produto">
        <h2>Insira um produto</h2>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WorkerOptions",
});
</script>
<style src="./styles/WorkerOptions.scss" scoped />
