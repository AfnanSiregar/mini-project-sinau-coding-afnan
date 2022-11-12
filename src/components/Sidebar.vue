<template>
    <section class="w-full md:fixed top-2 pt-14 pb-2 md:max-w-xs justify-center md:pl-2 md:pr-24 z-[1]">
        <div class="shadow-2xl py-2">
            <div class="rounded-md flex flex-col md:max-w-xs">
                <div class="p-8 mx-auto">
                    <img src="../assets/profile.png" alt="person" class="hover:animate-pulse">
                </div>
            </div>
        </div>
        <div class="bg-blue-300 w-auto rounded text-center shadow-xl py-2">
            <h1 class="font-semibold text-blue-600">
                {{profileName}}
            </h1>
        </div>
    </section>
    <section class="w-full md:fixed top-[340px] md:max-w-xs items-center md:pl-2 md:pr-24 md:pb-2 z-[1]">
        <div class="shadow-xl py-2 bg-blue-300 text-center rounded">
            <h1 class="font-semibold text-blue-600">Menu</h1>
        </div>
        <div class="bg-white shadow-2xl text-center py-2">
            <the-navigation/>
            <button @click="logout" class="px-5 hover:text-red-600 rounded-lg">
                <ion-icon name="log-out-outline"></ion-icon>
                Logout
            </button>
        </div>
    </section>  
    <section class="w-full md:fixed top-[450px] md:max-w-xs items-center md:pl-2 md:pr-24 z-[1] text-center">
        <div class="shadow-2xl py-2 bg-blue-300 text-center rounded">
            <h1 class="font-semibold text-blue-600">Online
                <ion-icon name="power-outline" class="text-xl"></ion-icon>
            </h1>
        </div>
        <div class=" bg-white shadow-xl text-center py-2 flex flex-col px-6">
            Date and Time: <br>
            {{timestamp}}
        </div>
    </section>
</template>
<script>
import TheNavigation from './TheNavigation.vue';
export default {
  components: { TheNavigation },
    created(){
        this.showProfileName();
        setInterval(this.getNow, 1000);
    },
    data: function(){
        return{
            profileName: '',
            timestamp: ''
        }
    },
    methods:{
        logout(){
            if(window.confirm('Yakin Logout?')){
                localStorage.removeItem("token");
                localStorage.removeItem("profileName");
                this.$router.push('/');
            }
        },
        showProfileName(){
            this.profileName = localStorage.getItem('profileName')
        },
        getNow: function(){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.timestamp = dateTime;
        }
    },
}
</script>