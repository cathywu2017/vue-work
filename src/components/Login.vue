<template>
  <div class="login">
    <div class="form-signin" @keyup.enter="signin">
      <!-- <img class="mb-4" src="" alt=""> -->
      <h1 class="h3 mb-3 font-weight-normal text-center">登入帳號</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="text" id="inputEmail" class="form-control" placeholder="Email address" autofocus v-model="user.username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password">
      <button class="btn btn-lg btn-primary btn-block" @click.prevent="signin">登入</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
     user: {
       username: '',
       password: '',
     }
    }
  },
  methods:{
    signin(){
      const api = `${process.env.APIPATH}/admin/signin`
      const vm = this;
      if(!vm.user.username || !vm.user.password) {          
        return alert('請輸入帳號密碼')
      }
      this.$http.post(api,vm.user).then((response) => {
        console.log(response.data)
        if(response.data.success) {
          vm.$router.push('/Admin')
        }else {
          alert('登入失敗')
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  height: 100%;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
