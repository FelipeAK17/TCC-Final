<template>
  <div class="container">
    <form v-if="workerRole === true" @submit.prevent="handleSubmit">
      <h1>Registrar produto</h1>
      <div class="input-container">
        <p>Nome</p>
        <input type="text" v-model="name" />
      </div>
      <div class="input-container">
        <p>Preço</p>
        <input type="text" v-model="price" />
      </div>

      <div class="input-container">
        <p>Quantidade</p>
        <input type="text" v-model="quantity" />
      </div>

      <div class="input-container">
        <p>Descrição</p>
        <input type="text" v-model="description" />
      </div>
      <div class="input-container">
        <span>Imagem</span>
        <label for="input-file" type="file">
          Escolher arquivo <v-icon icon="mdi-upload" />
        </label>
        <input
          type="file"
          class="input-file"
          id="input-file"
          @change="handleFileChange"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    <h1 v-if="workerRole === false" class="client-error">
      Você não tem permissão pra acessar essa página.
    </h1>
  </div>
</template>

<style src="./styles/WorkerProduct.scss" scoped />

<script lang="ts">
import { defineComponent } from "vue";
import { api } from "../services/api";

export default defineComponent({
  data() {
    return {
      name: "",
      picture: null as File | null,
      price: null,
      description: "",
      quantity: null,
      workerRole: false,
    };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    const isWorker = await api.get("/worker", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (isWorker.data !== null) {
      this.workerRole = true;
    }
  },
  methods: {
    async handleFileChange(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.picture = file;
      }
    },
    async handleSubmit() {
      if (!this.picture) {
        return;
      }
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.picture);
      formData.append("price", String(this.price));
      formData.append("description", this.description);
      formData.append("quantity", String(this.quantity));

      try {
        const token = localStorage.getItem("token");
        await api.post("/product", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Picture uploaded successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to upload picture.");
      }
    },
  },
});
</script>
