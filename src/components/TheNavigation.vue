<template>
    <router-link to="/barang" class="px-5 hover:text-blue-500 hover:border-b">
        Barang
    </router-link>
    <router-link to="/supplier" class="px-5 hover:text-green-500 hover:border-b">
        Supplier
    </router-link>
</template>
<style lang="css">
    .active-link{
        color: red;
        border-bottom: 1px solid red;        
    }
    :hover.active-link{
        border-bottom: 1px solid blueviolet;
    }
</style>