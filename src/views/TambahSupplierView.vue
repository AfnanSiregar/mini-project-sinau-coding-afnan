<template>
    <NavbarVue/>
    <SidebarVue/>
    <section class="flex md:absolute top-10 left-72 flex-col md:max-w-5xl md:w-full py-20 rounded z-[2] bg-white">
        <div class="flex bg-blue-300 rounded-sm p-2">
            <h1 class="font-semibold text-blue-600">Tambah Supplier</h1>
        </div>
        <div  class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <form @submit.prevent="tambahSupplier()">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="namaSupplier">
                        Nama Supplier
                    </label>
                        <input type="text" v-model="dataSupplier.namaSupplier" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="namaSupplier" placeholder="Masukkan Nama Supplier" required>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="alamat">
                        Alamat Supplier
                    </label>
                        <input type="text" v-model="dataSupplier.alamat" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="alamat" placeholder="Masukkan Alamat Supplier" required>
                </div>
                <div class="mb-8">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="noTelp">
                        No. Telp Supplier
                    </label>
                        <input type="number" v-model="dataSupplier.noTelp" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="noTelp" placeholder="Masukkan No. Telp Supplier" required>
                </div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Tambah</button>
            </form>
            <button class="md:absolute bottom-32 right-10 bg-black/75 hover:bg-black/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="$router.back()">Kembali</button>
        </div>
    </section>
</template>
<script>
import NavbarVue from '../components/Navbar.vue';
import SidebarVue from '../components/Sidebar.vue';
import axios from 'axios'

export default { 
    components:{
        NavbarVue,
        SidebarVue
    },   
    data: function(){
        return {
            dataSupplier: { namaSupplier: '', alamat: '', noTelp: '' }
        }
    },
    methods:{
        async tambahSupplier(){
            if(window.confirm("Tambahkan Data?")){
                await axios.post("http://159.223.57.121:8090/supplier/create", this.dataSupplier, {
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    alert('Tambah Data Berhasil!')
                    this.$router.push("/supplier");
                }).catch(()=>{
                    alert('Gagal menambahkan data!');
                })
            }
        }
    }
}
</script>