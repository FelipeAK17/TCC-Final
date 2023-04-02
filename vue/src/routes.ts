import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import LoginPage from "./pages/LoginPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductPage from "./pages/ProductPage.vue";
import UpdateProductsPage from "./pages/UpdateProductsPage.vue";
import HomePage from "./pages/HomePage.vue";
import CreateProductPage from "./pages/CreateProductPage.vue";
import SchedullingPage from "./pages/SchedullingPage.vue";
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import SignUpPage from "./pages/SignUpPage.vue";
import WorkerProductPage from "./pages/WorkerProductPage.vue";
import WorkerSignUpPage from "./pages/WorkerSignUpPage.vue";
import WorkerLoginPage from "./pages/WorkerLoginPage.vue";
import WorkerScheduleListPage from "./pages/WorkerScheduleListPage.vue";
import WorkerOptionsPage from "./pages/WorkerOptionsPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/carrinho",
    name: "ShoppingCart",
    component: ShoppingCartPage,
  },
  {
    path: "/funcionario/agendamento",
    name: "WorkerScheduleList",
    component: WorkerScheduleListPage,
  },
  {
    path: "/funcionario/cadastro",
    name: "WorkerSignUp",
    component: WorkerSignUpPage,
  },
  {
    path: "/funcionario/login",
    name: "WorkerLogin",
    component: WorkerLoginPage,
  },
  {
    path: "/funcionario/produto",
    name: "Produto",
    component: WorkerProductPage,
  },
  {
    path: "/funcionario",
    name: "WorkerOptions",
    component: WorkerOptionsPage,
  },
  {
    path: "/agendamento",
    name: "Schedulling",
    component: SchedullingPage,
  },

  {
    path: "/produtos",
    name: "Products",
    component: ProductsPage,
  },
  {
    path: "/produto",
    name: "Product",
    component: ProductPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/cadastro",
    name: "signup",
    component: SignUpPage,
  },
  {
    path: "/sobre",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/product/create",
    name: "CreateProduct",
    component: CreateProductPage,
  },

  {
    path: "/produto/editar",
    name: "UpdateProducts",
    component: UpdateProductsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
