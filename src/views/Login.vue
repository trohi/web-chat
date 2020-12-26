<template>
     <div class="container">
        <p class="h2 text-center">Login</p>
        <form @submit.prevent="Login">
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
            <div type="text" disabled class="Error"> {{errorMsg}} </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit" value="Submit"> Submit </button>
                <a href="/signup">Create new account?</a>
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
            user:{},
            errorMsg:null
        }
    },
    methods:{
        Login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user=>{
                this.user = user
                this.$router.push('/')
            })
            .catch(error=>{
                this.errorMsg = error.message
            })
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

.preview
{
    padding: 10px;
    position: relative;
}

.preview i
{
    color: white;
    font-size: 35px;
    transform: translate(50px,130px);
}

.preview-img
{
    border-radius: 100%;
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.7);
}

.browse-button
{
    width: 200px;
    height: 200px;
    border-radius: 100%;
    position: absolute; /* Tweak the position property if the element seems to be unfit */
    top: 10px;
    left: 132px;
    background: linear-gradient(180deg, transparent, black);
    opacity: 0;
    transition: 0.3s ease;
}

.browse-button:hover
{
    opacity: 1;
}

.browse-input
{
    width: 200px;
    height: 200px;
    border-radius: 100%;
    transform: translate(-1px,-26px);
    opacity: 0;
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

.Back
{
    font-size: 25px;
}
</style>