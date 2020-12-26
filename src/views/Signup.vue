<template>
      <div class="container">
        <p class="h2 text-center">Signup</p>
        <form @submit="signUp">
            <div class="form-group">
                <label>Full Name:</label>
                <input v-model="fullName" class="form-control" type="text" name="fullname" required placeholder="Enter Your Full Name"/>
                <span class="Error"></span>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input v-model="email" class="form-control" type="email" name="email" required placeholder="Enter Your Email"/>
                <span class="Error"></span>
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input v-model="password" class="form-control" type="password" name="password" required placeholder="Enter Password"/>
                <span class="Error"></span>
            </div>
            <span class="Error" ></span>
            <div type="text" disabled  class="Error"> {{errorMsg}} </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit"> Submit </button>
                <a href="/login">Aready have an account?</a>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name:'Login',
    data(){
        return{
            fullName: null,
            email: null,
            password: null,
            user: {},
            errorMsg: null,
            photoUrl: "http://simpleicon.com/wp-content/uploads/account.png"
        }
    },
    methods:{
        signUp(e){
            e.preventDefault()
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user=>{
                user.user.updateProfile({
                    displayName: this.fullName,
                    photoURL: this.photoUrl
                })
                this.user = user
                this.$router.push('/')
            })
            .catch(error=>{
                this.errorMsg = error.message
            })
            
        },
        photoPrompt(){
            this.photoUrl = prompt("Enter link to your photo")
        }
    },
    created(){
        this.errorMsg = null
    }
}
</script>


<style scoped>

.container
{
    width: auto;
    margin: 40px auto auto;
}

.form-group
{
    width:  250px;
    margin: 10px auto;
}

.form-group input
{
    transition: 0.3s linear;
}

.form-group input:focus
{
    border: 1px solid crimson;
    box-shadow: 0 0 0 0;
}

.Error
{
    width: 70%;
    color: crimson;
    font-size: 13px;
    margin-left: auto;
    margin-right: auto;
}
</style>