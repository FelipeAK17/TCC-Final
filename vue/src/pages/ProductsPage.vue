<template>
  <div class="product-container">
    <h1>Produtos</h1>
    <input
      class="searchBar"
      type="search"
      v-model="searchValue"
      @keyup="search()"
    />
    <div class="product-list">
      <div
        v-if="searchValue.length === 0"
        v-for="product in products"
        :key="product.id"
        class="product"
      >
        <figure>
          <img
            :src="imageSource + '/files/' + product.image"
            alt="Product image"
            class="product-image"
          />
        </figure>

        <div class="product-details">
          <p class="product-name" @click="getProductDetails(product.id)">
            {{ product.name }}
          </p>
          <p class="product-old-price">R${{ product.price * 2 }}</p>
          <h3 class="product-price">R${{ product.price }}</h3>
          <button @click="sendToShoppingCartPage(product.id)">
            <v-icon icon="mdi-cart-arrow-down" />Comprar
          </button>
        </div>
      </div>
      <div
        v-if="searchValue.length > 0"
        v-for="product in searchProducts"
        :key="product.id"
        class="product"
      >
        <figure>
          <img
            :src="imageSource + '/files/' + product.image"
            alt="Product image"
            class="product-image"
          />
        </figure>

        <div class="product-details">
          <p class="product-name" @click="getProductDetails(product.id)">
            {{ product.name }}
          </p>
          <p class="product-old-price">R${{ product.price * 2 }}</p>
          <h3 class="product-price">R${{ product.price }}</h3>
          <button @click="sendToShoppingCartPage(product.id)">
            <v-icon icon="mdi-cart-arrow-down" />Comprar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IProduct } from "../interfaces";
import { api } from "../services/api";

export default defineComponent({
  data() {
    return {
      products: [] as IProduct[],
      searchValue: "",
      searchProducts: [] as IProduct[],
    };
  },
  setup() {
    const imageSource = import.meta.env.VITE_BASEURL;

    return {
      imageSource,
    };
  },

  async mounted() {
    const response = await api.get<IProduct[]>("/product");
    this.products = response.data;
  },
  methods: {
    async search() {
      const filteredProducts = this.products.filter((i) => {
        if (this.searchValue === "") {
          this.searchProducts.length = 0;
        }
        return i.name.toLowerCase().includes(this.searchValue.toLowerCase());
      });

      this.searchProducts = filteredProducts;
    },
    async sendToShoppingCartPage(product_id: string) {
      const token = localStorage.getItem("token");
      token === "" ? this.$router.push("login") : null;

      try {
        await this.sendToShoppingCart(product_id);
      } catch (err: any) {
        console.error(err.message);
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
    async getProductDetails(product_id: string) {
      localStorage.setItem("get_product", product_id);
      this.$router.push("/produto");
    },
  },
});
</script>

<style src="./styles/Products.scss" lang="scss" scoped />
