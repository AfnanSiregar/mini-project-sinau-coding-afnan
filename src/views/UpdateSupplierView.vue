<template>
    <NavbarVue/>
    <SidebarVue/>
    <section class="flex md:absolute top-0 left-72 flex-col md:max-w-5xl md:w-full py-20 rounded z-[2] bg-white">
        <div class="flex bg-blue-300 rounded-sm p-2">
            <h1 class="font-semibold text-blue-600">Update Supplier</h1>
        </div>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 justify-between">
            <form @submit.prevent="updateSupplier()">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="namaBarang">
                        Nama Barang
                    </label>
                        <input type="text" v-model="dataSupplier.namaSupplier" name="namaSupplier" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="namaSupplier" placeholder="Masukkan Nama Supplier" required>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="stok">
                        Alamat
                    </label>
                    <input type="text" v-model="dataSupplier.alamat" name="alamat" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="alamat" placeholder="Masukkan Alamat" required>
                </div>
                <div class="mb-8">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="harga">
                        No. Telp Supplier
                    </label>
                    <input type="number" v-model="dataSupplier.noTelp" name="noTelp" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="noTelp" placeholder="Masukkan no Telp Supplier" required>
                </div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Update</button>
            </form>
            <button class="md:absolute bottom-32 right-10 bg-black/75 hover:bg-black/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onclick="history.back()">Kembali</button>
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
        return{
            dataSupplier:{ namaSupplier:'', alamat: '', noTelp: ''},
        };
    },
    created(){
        this.findIdSupplier();
    },
    methods:{
        async findIdSupplier(){
            const id = this.$route.params.id
            await axios.get(`http://159.223.57.121:8090/supplier/find-by-id/${id}`, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            })
            .then(({ data }) => {
                this.dataSupplier.alamat = data.data.alamat
                this.dataSupplier.namaSupplier = data.data.namaSupplier
                this.dataSupplier.noTelp = data.data.noTelp                
            })    
        },
        async updateSupplier(){
            if(window.confirm("Update Data?")){
                const id = this.$route.params.id;
                await axios.put(`http://159.223.57.121:8090/supplier/update/${id}`, this.dataSupplier, {
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }).then(({ data }) => {
                    console.log(data);
                    this.$router.push("/supplier");
                }) 
            }
        }
    }
}
</script>