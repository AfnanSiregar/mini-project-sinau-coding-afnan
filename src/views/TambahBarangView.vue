<template>
    <NavbarVue/>
    <SidebarVue/>
    <section class="flex md:absolute top-0 left-72 flex-col md:max-w-5xl md:w-full py-20 rounded z-[2] bg-white">
        <div class="flex bg-blue-300 rounded-sm p-2">
            <h1 class="font-semibold text-blue-600">Tambah Barang</h1>
        </div>
        <form @submit.prevent="tambahBarang()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="namaBarang">
                    Nama Barang
                </label>
                    <input type="text" v-model="dataBarang.namaBarang" name="namaBarang" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="namaBarang" placeholder="Masukkan Nama Barang" required>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="stok">
                    Stok
                </label>
                <input type="number" v-model="dataBarang.stok" name="stok" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stok" placeholder="Masukkan Stok" required>
            </div>
            <div class="mb-8">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="harga">
                    Harga
                </label>
                <input type="number" v-model="dataBarang.harga" name="harga" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="harga" placeholder="Masukkan Harga" required>
            </div>
            <div class="mb-10">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="harga">
                    Supplier Barang
                </label>
                <select v-model="dataBarang.supplier" name="harga" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="noTelp" placeholder="Masukkan No. Telp Supplier" required>
                    <option value="" disabled selected>Pilih Supplier</option>
                    <option v-for="(data) in dataSupplier" v-bind:key="data" :value="data">
                        {{data.namaSupplier}}
                    </option>
                </select>
            </div>
            <div class="flex justify-between">
                <button class="bg-black/75 hover:bg-black/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onclick="history.back()">Kembali</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Tambah</button>
            </div>
        </form>
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
        return{
            dataBarang:{
                namaBarang: '',
                harga: '',
                stok: '',
                supplier: '',
            },
            dataSupplier:[]
        };
    },
    created(){
        this.getSupplier();
    },
    methods:{
        async getSupplier(){
            const { data } = await axios.get("http://159.223.57.121:8090/supplier/find-all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },params:{
            offset: 0,
            limit: 100
          },
        });
          this.dataSupplier = await data.data;
        },
        async tambahBarang(){
            await axios.post("http://159.223.57.121:8090/barang/create", this.dataBarang, {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            }).then(() => {
                console.log(this.dataBarang);
                this.$router.push("/barang");
            })
        }
    }
}
</script>