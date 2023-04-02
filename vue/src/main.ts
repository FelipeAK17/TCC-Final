import { createApp } from "vue";
import router from "./routes";
import App from "./App.vue";
import "./styles.scss";
import Navbar from "./components/navbar.vue";
import Footer from "./components/footer.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});

app
  .component("Footer", Footer)
  .component("Navbar", Navbar)
  .use(vuetify)
  .use(router)
  .mount("#app");
