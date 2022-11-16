<template>
    <NavbarVue />
    <SidebarVue />
    <section class="flex md:absolute top-0 left-72 flex-col md:max-w-5xl md:w-full py-20 rounded z-[2] bg-white">
        <div class="flex bg-blue-300 rounded-md p-2">
            <h1 class="font-semibold text-blue-600">Dashboard</h1>
        </div>
        <div class="flex flex-row justify-between items-center p-2 bg-inherit font-semibold">
            <h1 class="text-2xl">Barang</h1>
            <div class="flex justify-end">
                <router-link class="bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2 px-2" to="/tambah-barang">
                    Tambah Barang</router-link>
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
            <form @submit.prevent="getBarang" class="space-x-1 pr-5">
                Cari Barang
                <label for="cari">
                    <input type="text" v-model="search"
                        class="py-[2px] border border-blue-300 rounded-sm leading-tight focus:outline-blue-400"
                        id="cari" placeholder="Search.." name="cari" required>
                </label>
                <span class="pl-2"></span>
                <button type="submit" class="bg-yellow-400 hover:bg-black/25 px-2 py-1 rounded-md">
                    <ion-icon name="search" class="animate-bounce"></ion-icon>
                </button>
                <button @click="this.$router.go()"
                    class="bg-red-600 text-white hover:bg-black/25 px-2 py-1 rounded-md">Refresh</button>
            </form>
        </div>
        <div class="px-3 py-3 rounded-lg shadow-lg">
            <table>
                <thead class="bg-slate-300 text-center">
                    <tr>
                        <th>NO</th>
                        <th>Nama Barang</th>
                        <th>Stock</th>
                        <th>Harga</th>
                        <th>Nama Supplier</th>
                        <th>Alamat Supplier</th>
                        <th>No Telp Supplier</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="result < 1">
                    <tr class="text-center">
                        <td colspan="8">Tidak ada data</td>
                    </tr>
                </tbody>
                <tbody class="pl-2">
                    <tr v-for="(dataTable, index) in result" :key="dataTable.id">
                        <td class="text-center">{{ (index + awal) + 1 }}</td>
                        <td class="pl-1">{{ dataTable.namaBarang }}</td>
                        <td class="text-center">{{ dataTable.stok }}</td>
                        <td class="text-center">{{ dataTable.harga }}</td>
                        <td class="pl-1">{{ dataTable?.supplier?.namaSupplier }}</td>
                        <td class="pl-1">{{ dataTable?.supplier?.alamat }}</td>
                        <td class="text-center">{{ dataTable?.supplier?.noTelp }}</td>
                        <td class="text-center space-x-1">
                            <button class="hover:text-red-800 underline py-1 text-md text-red-500"
                                @click="deleteBarang(dataTable.id)">
                                <ion-icon name="trash-outline" class="text-3xl hover:animate-pulse"></ion-icon>
                            </button>
                            <router-link class="hover:text-indigo-800 py-1 text-md text-indigo-500 underline"
                                :to="`/update-barang/${dataTable.id}`">
                                <ion-icon name="arrow-redo-outline" class="text-3xl hover:animate-pulse"></ion-icon>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex items-center space-x-4 justify-end py-2">
                <button class="bg-gray-200 hover:bg-black/25 px-2 py-2 rounded-md" @click="prev()">
                    Prev
                </button>
                <span class="bg-blue-600 py-1 px-3 rounded-lg text-bold text-white">{{ offset }}</span>
                <button class="bg-gray-200 hover:bg-black/25 px-2 py-2 rounded-md" @click="next()">
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
    components: {
        NavbarVue,
        SidebarVue,
    },
    data: function () {
        return {
            offset: 1,
            result: [],
            limit: 10,
            search: [],
            awal: 0
        }
    },
    created() {
        this.getBarang()
    },
    methods: {
        async getBarang() {
            const { data } = await axios.get("http://159.223.57.121:8090/barang/find-all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                params: {
                    offset: this.offset,
                    limit: this.limit,
                    search: this.search
                }
            })
            this.result = await data.data;
            if (this.offset > 1) {
                this.awal = (this.offset * this.limit) - this.limit
            } else {
                this.awal = 0
            }
        },
        next() {
            this.offset++;
            this.getBarang();
        },
        prev() {
            if (this.offset > 1) {
                this.offset--;
                this.getBarang();
            } else {
                this.offset = 1;
            }
        },
        add20Limit() {
            this.limit = 20;
            this.getBarang()
        },
        add15Limit() {
            this.limit = 15;
            this.getBarang()
        },
        add10Limit() {
            this.limit = 10;
            this.getBarang()
        },
        async deleteBarang(id) {
            if (window.confirm('Yakin Hapus Data?')) {
                await axios.delete("http://159.223.57.121:8090/barang/delete/" + id, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }).then(async (response) => {
                    await response.data;
                    this.$router.go()
                })
            }
        }
    }
}
</script>