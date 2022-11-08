<template>
    <NavbarVue/>
    <SidebarVue/>
    <section class="flex md:absolute top-0 left-72 flex-col md:max-w-5xl md:w-full py-20 rounded z-[2] bg-white">
        <div class="flex bg-blue-300 rounded-sm p-2">
            <h1 class="font-semibold text-blue-600">Update Barang</h1>
        </div>
        <form @submit.prevent="updateBarang()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                    Nama Supplier
                </label>
                <select v-model="dataBarang.namaSupplier" name="namaSupplier" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="namaSupplier" placeholder="Masukkan No. Telp Supplier">
                    <option class="font-bold" value="">
                        {{name}}
                    </option>
                    <option v-for="data in items" :key="data.id">
                        {{data.namaSupplier}}
                    </option>
                </select>
            </div>
            <div class="flex justify-between">
                <button class="bg-black/75 hover:bg-black/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onclick="history.back()">Kembali</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Update</button>
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
                stok: '',
                harga: '',
                namaSupplier:'',
            },
            name:'',
            id:'',
            items: []
        };
    },
    created(){
        this.findIdBarang();
        this.getSupplier();
    },
    methods:{
        async findIdBarang(){
            const id = this.$route.params.id
            await axios.get(`http://159.223.57.121:8090/barang/find-by-id/${id}`, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            })
            .then(({ data }) => {
                this.dataBarang.namaBarang = data.data.namaBarang
                this.dataBarang.stok = data.data.stok
                this.dataBarang.harga = data.data.harga
                this.name = data.data?.supplier.namaSupplier
                this.id = data.data?.supplier.id
            })
        },
        async getSupplier(){
            const { data } = await axios.get("http://159.223.57.121:8090/supplier/find-all", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            params:{
                offset: 0,
                limit: 15
          },
        });
          this.items = await data.data;
        },
        async updateBarang(){
            const id = this.$route.params.id;
            await axios.put(`http://159.223.57.121:8090/barang/update/${id}`, this.dataBarang, {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            }).then(({ data }) => {
                console.log(data);
                this.$router.push("/barang");
            })
        }
    }
}
</script>