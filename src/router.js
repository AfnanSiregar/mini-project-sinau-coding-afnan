import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: ()=>import("./views/RegisterView.vue"),
  },
  {
    path: "/barang",
    name: "barang",
    component: ()=>import("./views/BarangView.vue"),
  },
  {
    path: "/supplier",
    name: "supplier",
    component: ()=>import("./views/SupplierView.vue"),
  },
  {
    path: "/tambah-supplier",
    name: "tambah-supplier",
    component: ()=>import("./views/TambahSupplierView.vue")
  },
  {
    path: "/tambah-barang",
    name: "tambah-barang",
    component: ()=>import("./views/TambahBarangView.vue"),
  },
  {
    path: "/update-barang/:id",
    name: "update-barang",
    component: ()=>import("./views/UpdateBarangView.vue"),
  },
  {
    path: "/update-supplier/:id",
    name: "update-supplier",
    component: ()=>import("./views/UpdateSupplierView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: ()=> import('./views/NotFound.vue')
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.url.BASE_URL),
  linkActiveClass: 'active-link',
  routes,
  scrollBehavior (to, from, savedPosition){
    return savedPosition || new Promise((resolve) => {
      setTimeout(()=> resolve({ top: 0, behavior: 'smooth'}), 100)
    })
  }
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token") === null && to.path === "/barang" || 
    localStorage.getItem("token") === null && to.path === "/supplier" || 
    localStorage.getItem("token") === null && to.path === "/tambah-barang" || 
    localStorage.getItem("token") === null && to.path === "/tambah-supplier") {
      router.push("/");
  }else next()
});

export default router;
