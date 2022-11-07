<template>
    <section class="w-full md:fixed top-0 pt-14 pb-2 md:max-w-xs justify-center md:pl-2 md:pr-24 z-[1]">
        <div class="shadow-2xl py-2">
            <div class="rounded-md flex flex-col md:max-w-xs">
                <div class="p-8 mx-auto">
                    <img src="../assets/profile.png" alt="person" class="">
                </div>
            </div>
        </div>
        <div class="bg-blue-300 w-auto rounded text-center shadow-xl py-2">
            <h1 class="font-semibold text-blue-600">
                Afnan
            </h1>
        </div>
    </section>
    <section class="w-full md:fixed top-[330px] md:max-w-xs items-center md:pl-2 md:pr-24 md:pb-2 z-[1]">
        <div class="shadow-xl py-2 bg-blue-300 text-center rounded">
            <h1 class="font-semibold text-blue-600">Menu</h1>
        </div>
        <div class="bg-white shadow-2xl text-center py-2">
            <router-link to="/barang" class="px-5 hover:bg-blue-500 rounded-lg">
                Barang
            </router-link>
            <router-link to="/supplier" class="px-5 hover:bg-blue-500 rounded-lg">
                Supplier
            </router-link>
            <button @click="logout" class="px-5 hover:bg-blue-500 rounded-lg">
                Logout
            </button>
        </div>
    </section>
    <section class="w-full md:fixed bottom-[44px] md:max-w-xs md:pl-2 md:pr-24 z-[1]">
        <div class="shadow-2xl py-2 bg-blue-300 text-center rounded">
            <h1 class="font-semibold text-blue-600">Online</h1>
        </div>
        <div class=" bg-white shadow-xl text-center py-2 flex flex-col px-6">
            <label for="date" class="py-3">
                Hari Online
                <input type="date">
            </label>
            <label for="time">
                Waktu Online
                <input type="time">
            </label>
        </div>
    </section>
</template>
<script>
export default {
    methods:{
        logout(){
            if(window.confirm('Yakin Logout?')){
                localStorage.removeItem("token");
                this.$router.push('/');
            }
        },
        // showAlert(){
        //     alert("Berhasil Logout!");
        // }
    }
}
</script>