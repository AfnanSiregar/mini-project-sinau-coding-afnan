<template>
    <router-link to="/barang" class="px-5 hover:text-blue-500 hover:no-underline">
        Barang
    </router-link>
    <router-link to="/supplier" class="px-5 hover:text-green-500">
        Supplier
    </router-link>
</template>
<style lang="css">
    .active-link{
    color: red;
    border-bottom: 1px solid red;        
    }
    :hover.active-link{
        border:none;
    }
</style>