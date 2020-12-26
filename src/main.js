import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
//required for side effects
require('firebase/firestore')

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyAX0b2qGiHAOyjIDTY1pJgNJhpKa5TTZ_w",
  authDomain: "chat-app-abc78.firebaseapp.com",
  projectId: "chat-app-abc78",
  storageBucket: "chat-app-abc78.appspot.com",
  messagingSenderId: "278471432011",
  appId: "1:278471432011:web:f81fb96a0502480d2fface",
  measurementId: "G-L5EK55NFYD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//initialize firestore throught firebase
const db = firebase.firestore()
window.db = db
//Disable depracated features
db.settings({
  timestampsInSnapshots: true
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
