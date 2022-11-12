<template>
    <nav class="shadow-md w-full fixed top-0 left-0 z-[3]">
        <div class="flex bg-blue-300 items-center py-3 px-2">
            <h1 class="font-bold text-blue-500 px-1">MARKETPLACE</h1>
            <img src="../assets/sinaucoding.png" class="w-16 md:w-28" alt="logo">
        </div>
        <div @click="open += 1" class="text-3xl text-black absolute right-8 top-3 cursor-pointer">
            <ion-icon v-if="open % 2 == 1" name="close-outline"></ion-icon>
            <ion-icon v-else name="menu"></ion-icon>
        </div>
        <ul v-if="open % 2 == 1" class="md:items-center md:py-5 absolute md:static text-white bg-blue-400 right-0 md:w-full w-full md:pl-0 pl-9 transition-all duration-75 ease-in">
            <li class="text-right pr-10 md:ml-8 text-xl md:my-0 my-7">
                <the-navigation/>
            </li>
        </ul>
    </nav>
</template>
<script>
import { ref } from 'vue';
import TheNavigation from './TheNavigation.vue';
export default{
    components: { TheNavigation },
    setup(){
        return{
            open: ref(0)
        }
    }
}

</script>