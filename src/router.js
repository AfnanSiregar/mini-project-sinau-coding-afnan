import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import BarangView from './views/BarangView.vue'
import SupplierView from './views/SupplierView.vue'

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/barang",
    name: "barang",
    component: BarangView,
  },
  {
    path: "/supplier",
    name: "supplier",
    component: SupplierView,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.url.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token") === null && to.path === "/barang" || 
  localStorage.getItem("token") === null && to.path === "/supplier") {
    router.push("/");
  }else next()
});
export default router;
