<template>
    <NavbarVue/>
    <SidebarVue/>
    <section class="flex md:absolute top-0 left-72 flex-col md:max-w-5xl md:w-full py-20 rounded z-[2] bg-white">
        <div class="flex bg-blue-300 rounded-md p-2">
            <h1 class="font-semibold text-blue-600">Dashboard</h1>
        </div>
        <div class="flex flex-row justify-between items-center p-2 bg-inherit font-semibold">
            <h1 class="text-2xl">Supplier</h1>
            <div class="flex justify-end">
                <router-link class="bg-blue-600 hover:bg-blue-700 rounded-md text-white py-2 px-2" to="/tambah-supplier">Tambah Supplier</router-link>
            </div>
        </div>
        <div class="md:flex items-center justify-between pl-3 pt-3 space-x-2">
            <div class="justify-start">
                Table Rows:
                <button class="rounded-md hover:bg-black/25 px-2" @click="add10Limit()">
                    10
                </button>
                <button class="rounded-md hover:bg-black/25 px-2" @click="add15Limit()">
                    15
                </button>
                <button class="rounded-md hover:bg-black/25 px-2" @click="add20Limit()">
                    20
                </button>
            </div>
            <form @submit.prevent="getSupplier" class="space-x-1 pr-5">
                Cari Supplier
                <label for="cari">
                    <input type="text" v-model="search" class="py-[2px] border border-blue-300 rounded-sm leading-tight focus:outline-blue-400" id="cari" placeholder="Search.." name="cari" required>
                </label>
                <span class="pl-2"></span>
                <button type="submit" class="bg-yellow-400 hover:bg-black/25 px-2 py-1 rounded-md">
                    <ion-icon name="search" class="animate-bounce"></ion-icon>
                </button>
                <button @click="this.$router.go()" class="bg-red-600 text-white hover:bg-black/25 px-2 py-1 rounded-md">Refresh</button>
            </form>
        </div>
        <div class="px-3 py-3 rounded-lg shadow-lg">
            <table>
                <thead class="bg-slate-300 text-center">
                    <tr>
                        <th>NO</th>
                        <th>Nama Supplier</th>
                        <th>Alamat</th>
                        <th>NO Telp</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="result < 1">
                    <tr class="text-center">
                        <td colspan="8">Tidak ada data</td>
                    </tr>
                </tbody>
                <tbody class="pl-2">
                    <tr v-for="(dataSupp, index) in result" :key="dataSupp.id">
                        <td class="text-center">{{(index+awal) + 1}}</td>
                        <td class="pl-1">{{dataSupp.namaSupplier}}</td>
                        <td class="pl-1">{{dataSupp.alamat}}</td>
                        <td class="text-center">{{dataSupp.noTelp}}</td>
                        <td class="text-center space-x-1">
                            <button class="hover:text-red-800 underline py-1 text-md text-red-500"
                                @click="deleteSupplier(dataSupp.id)">
                                <ion-icon name="trash-outline" class="text-3xl hover:animate-pulse"></ion-icon>
                            </button>
                            <router-link class="hover:text-indigo-800 py-1 text-md text-indigo-500 underline"
                                :to="`/update-supplier/${dataSupp.id}`">
                                <ion-icon name="arrow-redo-outline" class="text-3xl hover:animate-pulse"></ion-icon>                            
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex items-center space-x-4 justify-end py-2">
                <button class="bg-gray-200 hover:bg-black/25 p-2 rounded-md" @click="prev()">
                    Prev
                </button>
                <span class="bg-blue-600 py-1 px-3 rounded-lg text-bold text-white">{{offset}}</span>
                <button class="bg-gray-200 hover:bg-black/25 p-2 rounded-md"  @click="next()">
                    Next
                </button>
            </div>
        </div>
    </section>
</template>
<script>
import NavbarVue from '../components/Navbar.vue';
import SidebarVue from '../components/Sidebar.vue';
import axios from 'axios';

export default {
    components:{
        NavbarVue,
        SidebarVue,
    },
    data: function(){
        return{
            offset: 1,
            result: [],
            limit: 10,
            awal : 0,
            search: []
        }
    },
    created(){
        this.getSupplier()
    },
    methods:{
        async getSupplier(){
            const { data } = await axios.get("http://159.223.57.121:8090/supplier/find-all",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                params:{
                    offset: this.offset,
                    limit: this.limit,
                    search: this.search
                }
            })
            this.result = await data.data;
            console.log(this.result);
            if(this.offset > 1){
                this.awal = (this.offset*this.limit) - this.limit
            }else{
                this.awal = 0
            }
        },
        next(){
            this.offset++;
            this.getSupplier();
        },
        prev(){
            if (this.offset > 1) {
                this.offset --;
                this.getSupplier();
            } else {
                this.offset = 1 ;
            }
        },
        add20Limit(){
            this.limit = 20;
            this.getSupplier()
        },
        add15Limit(){
            this.limit = 15;
            this.getSupplier()
        },
        add10Limit(){
            this.limit = 10;
            this.getSupplier()
        },
        async deleteSupplier(id){
            if (window.confirm('Yakin Hapus Data?')){
                await axios.delete("http://159.223.57.121:8090/supplier/delete/" + id,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }).then(async (response)=>{
                    await response.data;
                    this.$router.go()
                })
            }
        }
    }
}
</script>