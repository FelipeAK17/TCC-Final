<template>
  <Navbar />
  <div class="router-class">
    <router-view />
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "./routes";

export default defineComponent({
  name: "App",
  router,
});
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  max-width: 100vw;
}
</style>
