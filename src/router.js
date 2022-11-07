import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import BarangView from './views/BarangView.vue'
import SupplierView from './views/SupplierView.vue'
import TambahSupplierView from './views/TambahSupplierView.vue'
import TambahBarangView from './views/TambahBarangView.vue'
import UpdateBarangView from './views/UpdateBarangView.vue'
import UpdateSupplierView from './views/UpdateSupplierView.vue'

const routes = [
  {
    path: "/",
    component: LoginView,
  },
  {
    path: "/register",
    component: RegisterView,
  },
  {
    path: "/barang",
    component: BarangView,
  },
  {
    path: "/supplier",
    component: SupplierView,
  },
  {
    path: "/tambah-supplier",
    component: TambahSupplierView,
  },
  {
    path: "/tambah-barang",
    component: TambahBarangView,
  },
  {
    path: "/update-barang/:id",
    component: UpdateBarangView,
  },
  {
    path: "/update-supplier/:id",
    component: UpdateSupplierView,
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.url.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token") === null && to.path === "/barang" || 
    localStorage.getItem("token") === null && to.path === "/supplier" || 
    localStorage.getItem("token") === null && to.path === "/tambah-barang" || 
    localStorage.getItem("token") === null && to.path === "/tambah-supplier" || 
    localStorage.getItem("token") === null && to.path === "/update-barang"|| 
    localStorage.getItem("token") === null && to.path === "/update-supplier") {
      router.push("/");
  }else next()
});

export default router;
