<template>
  <div class="container-fluid h-100">
			<div class="row justify-content-center h-100">
				<div class="col-md-8 col-xl-6 chat">
					<div class="card">
						<div class="card-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="user_info">
									<span>Chat with </span>
								</div>
                <input @click.prevent="logout" class="btn btn-danger btn-rounded btn-sm" id="logout_btn" type="button" value="Logout"/>
							</div>
							<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
							<div class="action_menu">
								<ul>
									<li><i class="fas fa-user-circle"></i> View profile</li>
									<li><i class="fas fa-users"></i> Add to close friends</li>
									<li><i class="fas fa-plus"></i> Add to group</li>
									<li><i class="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div class="card-body msg_card_body">
							<div class="d-flex justify-content-start mb-4" v-for="message in messages" :key="message.id">
								<div :class="[message.author === authUser.displayName ? 'msg_sent_container' : 'msg_recieved_cotainer']">
									{{message.message}}
									<span :class="[message.author === authUser.displayName ? 'msg_time_and_username_sent' : 'msg_time_and_username_recieved']">{{message.author}}</span>
								</div>
							</div>
						
						
						</div>
						<div class="card-footer">
							<div class="input-group">
								<textarea @keyup.enter="onSend" v-model="message" name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
								<div class="input-group-append">
									<span class="input-group-text send_btn" @click="onSend"><i class="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'

export default {
  name: 'Home',
  data(){
    return{
      message:null,
      messages:[],
      authUser:{}
    }
  },
  methods:{
	scrollToBottom(){
		let box = document.querySelector('.msg_card_body');
		box.scrollTop = box.scrollHeight
	},
    onSend(){
      //save message to firestore
      db.collection('chat').add({
        message: this.message,
        author: this.authUser.displayName,
        createdAt: new Date()
	  })
	  .then(()=>{
		  this.scrollToBottom()
	  })
      this.message = null
    },

    fetchMessages(){
      db.collection('chat').orderBy('createdAt').onSnapshot(snapShot=>{
        let allMessages=[]
        snapShot.forEach(doc=>{
          allMessages.push(doc.data())
        })
        this.messages = allMessages
	  })
	  setTimeout(()=>{
		  this.scrollToBottom()
	  }, 1500)
    },

    logout(){
      firebase.auth().signOut()
      .then(()=>{
        this.authUser = null
      })
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

   this.fetchMessages()
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          next()
        } else {
          vm.$router.push('/login')
        }
      })
    })
  }
}
</script>

<style>
  	body,html{
			height: 100%;
			margin: 0;
			background: #7F7FD5;
	       background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
	        background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
		}

		.bd-highlight{
			border-bottom: 1px solid rgb(85, 24, 165);
			padding-bottom: 10px
		}

		.chat{
			margin-top: auto;
			margin-bottom: auto;
		}
		.card{
			height: 500px;
			border-radius: 15px !important;
			background-color: rgba(0,0,0,0.4) !important;
		}
		.contacts_body{
			padding:  0.75rem 0 !important;
			overflow-y: auto;
			white-space: nowrap;
		}
		.msg_card_body{
			overflow-y: auto;
		}
		.card-header{
			border-radius: 15px 15px 0 0 !important;
			border-bottom: 0 !important;
		}
	 .card-footer{
		border-radius: 0 0 15px 15px !important;
			border-top: 0 !important;
	}
		.container{
			align-content: center;
		}
		.search{
			border-radius: 15px 0 0 15px !important;
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color:white !important;
		}
		.search:focus{
		     box-shadow:none !important;
           outline:0px !important;
		}
		.type_msg{
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color:white !important;
			height: 60px !important;
			overflow-y: auto;
		}
			.type_msg:focus{
		     box-shadow:none !important;
           outline:0px !important;
		}
		.attach_btn{
	border-radius: 15px 0 0 15px !important;
	background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.send_btn{
	border-radius: 0 15px 15px 0 !important;
	background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.search_btn{
			border-radius: 0 15px 15px 0 !important;
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.contacts{
			list-style: none;
			padding: 0;
		}
		.contacts li{
			width: 100% !important;
			padding: 5px 10px;
			margin-bottom: 15px !important;
		}
	.active{
			background-color: rgba(0,0,0,0.3);
	}
		.user_img{
			height: 70px;
			width: 70px;
			border:1.5px solid #f5f6fa;
		
		}
		.user_img_msg{
			height: 40px;
			width: 40px;
			border:1.5px solid #f5f6fa;
		
		}
	.img_cont{
			position: relative;
			height: 70px;
			width: 70px;
	}
	.img_cont_msg{
			height: 40px;
			width: 40px;
	}
	.online_icon{
		position: absolute;
		height: 15px;
		width:15px;
		background-color: #4cd137;
		border-radius: 50%;
		bottom: 0.2em;
		right: 0.4em;
		border:1.5px solid white;
	}
	.offline{
		background-color: #c23616 !important;
	}
	.user_info{
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 15px;
	}
	.user_info span{
		font-size: 20px;
		color: white;
	}
  #logout_btn{
    margin-left:auto;
    margin-right: 5%;
    height:40px;
    
  }
	.user_info p{
	font-size: 10px;
	color: rgba(255,255,255,0.6);
	}
	.video_cam{
		margin-left: 50px;
		margin-top: 5px;
	}
	.video_cam span{
		color: white;
		font-size: 20px;
		cursor: pointer;
		margin-right: 20px;
	}
	.msg_recieved_cotainer{
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 10px;
		border-radius: 25px;
		background-color: #82ccdd;
		padding: 10px;
		position: relative;
	}

  .msg_sent_container{
    color: aliceblue;
    margin-top:auto;
    margin-bottom:auto;
    margin-left:auto;
    margin-right:20px;
    border-radius: 25px;
    background-color:#293436;
    padding: 10px 20px 10px 20px;
    position:relative
  }

	.msg_cotainer_send{
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 10px;
		border-radius: 25px;
		background-color: #78e08f;
		padding: 10px;
		position: relative;
	}
	.msg_time_and_username_recieved{
		position: absolute;
		left: 0;
		bottom: -20px;
		color: rgba(20, 19, 19, 0.5);
		font-size: 12px;
    font-weight: bold;
	}
  .msg_time_and_username_sent{
    position: absolute;
		left: 50;
		bottom: -20px;
		color: rgba(20, 19, 19, 0.5);
		font-size: 12px;
    font-weight: bold;
  }
	.msg_time_send{
		position: absolute;
		right:0;
		bottom: -15px;
		color: rgba(255,255,255,0.5);
		font-size: 10px;
	}
	.msg_head{
		position: relative;
	}
	#action_menu_btn{
		position: absolute;
		right: 10px;
		top: 10px;
		color: white;
		cursor: pointer;
		font-size: 20px;
	}
	.action_menu{
		z-index: 1;
		position: absolute;
		padding: 15px 0;
		background-color: rgba(0,0,0,0.5);
		color: white;
		border-radius: 15px;
		top: 30px;
		right: 15px;
		display: none;
	}
	.action_menu ul{
		list-style: none;
		padding: 0;
	margin: 0;
	}
	.action_menu ul li{
		width: 100%;
		padding: 10px 15px;
		margin-bottom: 5px;
	}
	.action_menu ul li i{
		padding-right: 10px;
	
	}
	.action_menu ul li:hover{
		cursor: pointer;
		background-color: rgba(0,0,0,0.2);
	}
	@media(max-width: 576px){
	.contacts_card{
		margin-bottom: 15px !important;
	}
  }
</style>