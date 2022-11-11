<template>
    <section class="flex md:flex-row flex-col justify-center p-4 md:p-0 h-screen items-center md:gap-10">
        <div class="p-4 md:max-w-md w-full">
            <div class="flex flex-col">
                <img src="../assets/logo_sinaucoding.png" width="100%" height="100%" alt="logo">
                <div class="text-center">
                    <h1 class="text-blue-600 text-4xl font-bold">
                        Selamat Datang
                    </h1>
                    <p class="text-blue-600 font-bold">
                        MARKETPLACE Sinau Coding
                    </p>
                </div>
            </div>
        </div>
        <div class="shadow-lg w-full md:max-w-lg">
            <div class="bg-blue-300 rounded py-3">
                <h1 class="text-blue-600 text-center">
                    Login
                </h1>
            </div>
            <form @submit.prevent="login" class="flex flex-col p-4 gap-4 rounded-lg shadow">
                <label for="username">
                    Username
                    <input type="text" v-model="username" id="username" name="username" class="w-full border shadow py-2 px-3 focus:outline-blue-300" placeholder="Enter Username" required>
                </label>
                <label for="password">
                    Password
                    <input type="password" v-model="password" id="password" name="password" class="w-full border shadow py-2 px-3 focus:outline-blue-300" placeholder="Enter Password" required>
                </label>
                <div class="flex flex-col items-center">
                    <button type="submit" class="bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded-md text-white">Masuk</button>
                    <router-link to="/register" class="pt-5 underline text-blue-400 hover:text-blue-600">Belum punya akun</router-link>
                </div>
            </form>
        </div>
    </section>
    
</template>

<script>
import axios from "axios"
export default {
    data: function(){
        return{
            username: '',
            password: '',
            profileName: ''
        }
    },
    methods:{
        async login(){
            await axios.post('http://159.223.57.121:8090/auth/login',{
                username: this.username,
                password: this.password
            }).then(async (response)=>{
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("profileName", response.data.data.profileName);
                alert("Login Berhasil!");
                this.$router.push('/barang');
            }).catch(() => {
                alert('Username atau Password salah!');
            })
        },
    }
}
</script>