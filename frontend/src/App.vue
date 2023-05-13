<template>
  <v-app>
    <v-container>
        <Vuetable/>
    </v-container>
  </v-app>
</template>

<script>

import Vuetable from '@/views/Table.vue'


export default {
  name: 'App',
  data(){
    return {
    }
  },
  components: {
    Vuetable    
  }
};
</script>
