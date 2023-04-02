<template>
  <div class="shopping-cart-container">
    <h1 v-if="state.shoppingCart.length <= 0">Adicione produtos no carrinho</h1>
    <div v-if="state.shoppingCart.length > 0" class="product-list">
      <div v-for="item in state.shoppingCart" :key="item.id" class="product">
        <div class="product-details">
          <div class="row-details">
            <img
              :src="imageSource + '/files/' + item.product.image"
              alt="Product Image"
              class="product-image"
            />
            <div class="description-group">
              <h3 class="product-name">{{ item.product.name }}</h3>

              <p class="product-price">R${{ item.product.price }}</p>

              <div class="product-discount">
                <p>
                  Com desconto no PIX: R${{ item.product.price - 35 }} Parcelado
                  no cartão em até 10x sem juros: R${{ item.product.price }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="product-quantity">
          <p>Quant.</p>
          <span class="quantity-arrow-group">
            <button
              @click="updateQuantity(item.productId, -1)"
              :disabled="item.quantity === 1"
            >
              <v-icon icon="mdi-chevron-left" />
            </button>
            <span>{{ item.quantity }}</span>
            <button>
              <v-icon
                icon="mdi-chevron-right"
                @click="updateQuantity(item.productId, 1)"
              />
            </button>
          </span>
          <span class="deleteButton" @click="deleteProduct(item.productId)">
            <v-icon icon="mdi-delete" />remover</span
          >
        </div>
      </div>
    </div>
    <div v-if="state.shoppingCart.length > 0" class="right-group">
      <div class="shipment">
        <h3>Endereço</h3>
        <label for="address">Endereço completo</label>
        <input type="text" name="address" v-model="address" />
        <label for="zipcode">Cep (somente números)</label>
        <input type="text" name="zipcode" v-model="zipcode" />

        <label for="reference">Ponto de referência (opcional)</label>
        <input type="text" name="reference" v-model="reference" />
        <button
          type="submit"
          @click="sumShipmentPrice"
          :disabled="isShipmentFormValid"
        >
          Calcular frete
        </button>

        <!-- <div class="gray-line"></div> -->
      </div>
      <div class="payment">
        <h3>Pagamento</h3>
        <select class="flag" v-model="creditCard">
          <option value="" disabled selected>Selecione a bandeira</option>
          <option value="Visa">Visa</option>
          <option value="Master Card">Master Card</option>
          <option value="Maestro">Maestro</option>
        </select>
        <label for="cardNumber">Número do cartão</label>
        <input type="text" name="cardNumber" v-model="cardNumber" />
        <label for="cardSecretNumber">Código de segurança do cartão</label>
        <input type="text" name="cardSecretNumber" v-model="cardSecretNumber" />
        <label for="cellphone">Celular</label>
        <input type="text" name="cellphone" v-model="cellphone" />
        <label for="socialSecutiryNumber">CPF</label>
        <input
          type="text"
          name="socialSecutiryNumber"
          v-model="socialSecutiryNumber"
        />
      </div>
      <div class="summary">
        <div class="gray-line"></div>
        <p>Frete: R${{ state.shipmentPrice }}</p>
        <p>produtos: R${{ totalPrice.toFixed(2) }}</p>
        <p>
          total: R${{
            (
              Number(state.shipmentPrice) + Number(totalPrice.toFixed(2))
            ).toFixed(2)
          }}
        </p>
      </div>
      <button @click="payment" :disabled="state.shipmentPrice === 0">
        Pagar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { IShoppingCart } from "../interfaces";
import { api } from "../services/api";

export default defineComponent({
  data() {
    return {
      creditCard: "",
      cardNumber: "",
      cardSecretNumber: "",
      cellphone: "",
      socialSecutiryNumber: "",
      address: "",
      zipcode: "",
      reference: "",
      flag: "",
    };
  },
  setup() {
    const state = reactive({
      shoppingCart: [] as IShoppingCart[],
      shipmentPrice: 0,
    });
    const imageSource = import.meta.env.VITE_BASEURL;

    const router = useRouter();

    onMounted(async () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        router.push("/login");
      }
      const isUserClient = await api.get("/client/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (isUserClient.data === null) {
        router.push("/login");
      }
      const { data } = await api.get<IShoppingCart[]>("/shoppingcart/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      state.shoppingCart.push(...data);
    });

    const totalPrice = computed(() => {
      return state.shoppingCart.reduce((acc, item) => {
        return Number(acc) + Number(item.product.price) * Number(item.quantity);
      }, 0);
    });

    return {
      state,
      totalPrice,
      imageSource,
    };
  },
  computed: {
    isShipmentFormValid(): boolean {
      return !this.zipcode || !this.address;
    },
    isPaymentFormValid(): boolean {
      return (
        !this.creditCard ||
        !this.cardSecretNumber ||
        !this.cardNumber ||
        !this.socialSecutiryNumber ||
        !this.cellphone ||
        this.state.shipmentPrice === 0
      );
    },
  },
  methods: {
    async updateQuantity(productId: string, quantity: number) {
      try {
        const token = localStorage.getItem("token");
        const payload = { productId, quantity };
        await api.patch("/shoppingcart/patch", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = await api.get<IShoppingCart[]>("/shoppingcart/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.state.shoppingCart.length = 0;
        this.state.shoppingCart.push(...data);
      } catch (err: any) {
        console.log(err.message);
      }
    },
    async payment() {
      alert("Pagamento feito com sucesso");
    },
    async deleteProduct(productId: string) {
      try {
        const token = localStorage.getItem("token");

        await api.delete(`/shoppingcart/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.state.shoppingCart.length = 0;
        this.getProduts();
      } catch (err: any) {
        console.log(err.message);
      }
    },
    async getProduts() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get<IShoppingCart[]>("/shoppingcart/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.state.shoppingCart.push(...data);
      } catch (err: any) {
        if (err.response.data.includes("Invalid JWT")) {
          this.$router.push("/login");
        }
        console.log("error-message", err.response);
      }
    },
    async sumShipmentPrice() {
      this.state.shipmentPrice = Math.floor(
        Math.random() * (800 - 100 + 1) + 100
      );
    },
  },
});
</script>

<style src="./styles/ShoppingCart.scss" scoped />
