<script>
import FooterVue from './components/Footer.vue';
export default{
  components:{
    FooterVue,
  },
  data(){
    return{
      active: true,
      token: ''
    }
  },
  created(){
    this.token = localStorage.getItem('token')
  }
}
</script>
<template>
  <router-view/>
  <FooterVue/>
</template>