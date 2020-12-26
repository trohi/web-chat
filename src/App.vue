<template>
  <div id="app">
    <div id="nav">
      <div v-if="!authUser">
        <router-link to="/signup"><button class="btn btn-dark">Sign up</button></router-link> |
        <router-link to="/login"><button class="btn btn-dark">Log in</button></router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script> 
import firebase from 'firebase'
export default {
  data(){
    return{
      authUser:null
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.authUser = user
      } else {
        this.authUser = null
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
