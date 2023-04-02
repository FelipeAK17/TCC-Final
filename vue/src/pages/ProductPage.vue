<template>
  <div class="product" v-bind="product" :key="product.id">
    <h1 class="product-name">{{ product.name }}</h1>
    <div class="display-row">
      <img
        :src="imageSource + '/files/' + product.image"
        alt="Product image"
        class="product-image"
      />
      <div class="display-column">
        <p class="product-old-price">R${{ product.price * 2 }}</p>
        <h3 class="product-price">R${{ product.price * 0.85 }}</h3>
        <span class="payment-information">
          À vista no PIX
          <span>com <b>15%</b> de desconto</span>
        </span>
        <span class="full-price-container">
          <span class="full-price"> R${{ product.price }} </span><br />
          Em até 9x de R$ {{ (product.price / 9).toFixed(2) }} sem juros no
          cartão
        </span>
        <button @click="sendToShoppingCartPage(product.id)">
          <v-icon icon="mdi-cart-arrow-down"></v-icon>Comprar
        </button>
      </div>
    </div>
    <p class="product-description">{{ product.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IProduct } from "../interfaces";
import { api } from "../services/api";

export default defineComponent({
  data() {
    return {
      product: {} as IProduct,
    };
  },
  setup() {
    const imageSource = import.meta.env.VITE_BASEURL;
    return {
      imageSource,
    };
  },
  async mounted() {
    const product = localStorage.getItem("get_product");
    const response = await api.get(`/product/${product}`);
    this.product = response.data;
  },
  methods: {
    async sendToShoppingCartPage(product_id: string) {
      const token = localStorage.getItem("token");
      token === "" ? this.$router.push("login") : null;

      try {
        await this.sendToShoppingCart(product_id);
      } catch (err: any) {
        console.log(err.message);
      }
      this.$router.push("/carrinho");
    },

    async sendToShoppingCart(product_id: string) {
      try {
        const token = localStorage.getItem("token");

        const payload = {
          product: product_id,
          quantity: 1,
        };
        await api.post("/shoppingcart/create", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err: any) {
        console.log(err.message);
      }
    },
  },
});
</script>

<style src="./styles/Product.scss" scoped />
