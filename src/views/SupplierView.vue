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
                <!-- <router-link class="bg-blue-700 hover:bg-blue-700 rounded-md text-white py-2 px-2" to="/tambah-barang">Tambah Supplier</router-link> -->
            </div>
        </div>
        <div class="flex items-center justify-start pl-3 pt-3 space-x-2">
            Table Rows:
            <div class="bg-black/5 rounded-lg">
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
            <form @submit.prevent="cariBarang" class="pl-1 text-center">
                Cari Barang
                <label for="cari">
                    <input type="text" v-model="search" class="py-[2px] border border-blue-300 rounded-sm leading-tight focus:outline-blue-400" id="cari" name="cari" required>
                </label>
                <span class="pl-2"></span>
                <button type="submit" class="bg-yellow-400 hover:bg-black/25 px-2 py-1 rounded-md">Search</button>
            </form>
            <button onclick="window.location.reload();" class="bg-red-600 text-white hover:bg-black/25 px-2 py-1 rounded-md">Refresh</button>
        </div>
        <div class="px-3 py-3 rounded-lg shadow-lg">
            <table class="w-full border text-left table-auto" v-if="result">
                <thead class="bg-slate-300 text-center">
                    <tr>
                        <th class="border border-black">NO</th>
                        <th class="border border-black">Nama Supplier</th>
                        <th class="border border-black">Alamat</th>
                        <th class="border border-black">NO Telp</th>
                        <th class="border border-black">Action</th>
                    </tr>
                </thead>
                <tbody v-if="hasilCari?.length > 0">
                    <tr v-for="(dataSupp, index) in hasilCari" :key="dataSupp.id">
                        <td class="border border-black text-center">{{index + 1}}</td>
                        <td class="border border-black pl-1">{{dataSupp.namaSupplier}}</td>
                        <td class="border border-black pl-1">{{dataSupp.alamat}}</td>
                        <td class="border border-black pl-1">{{dataSupp.noTelp}}</td>
                        <td class="border border-black pl-1"></td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-for="(dataSupp, index) in result" :key="dataSupp.id">
                        <td class="border border-black text-center">{{(index+awal) + 1}}</td>
                        <td class="border border-black pl-1">{{dataSupp.namaSupplier}}</td>
                        <td class="border border-black pl-1">{{dataSupp.alamat}}</td>
                        <td class="border border-black pl-1">{{dataSupp.noTelp}}</td>
                        <td class="border border-black pl-1"></td>
                    </tr>
                </tbody>
                <tfoot v-if="limit > 15" class="bg-slate-300 text-center">
                    <tr>
                        <th class="border border-black">NO</th>
                        <th class="border border-black">Nama</th>
                        <th class="border border-black">Alamat</th>
                        <th class="border border-black">No Telp</th>
                        <th class="border border-black">Action</th>
                    </tr>
                </tfoot>
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
            search: '',
            hasilCari: [],
            awal : 0
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
                    limit: this.limit
                }
            })
            this.result = await data.data;
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
        cariBarang(){
            const pencarian = this.result.filter((supplier)=>{
                return supplier.namaSupplier.toLowerCase().includes(this.search);
            });
            this.hasilCari = pencarian;
            console.log(search);
            console.log(this.hasilCari);
        }
    }
    
}
</script>

((offset-1*10)-1) 
20-9 = 11
