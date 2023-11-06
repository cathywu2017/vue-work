<template>
  <div class="admin">    
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand py-0" href="#">管理</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item d-md-none d-block">
            <router-link class="nav-link py-1" to="/Admin">商品列表</router-link>
          </li>
          <li class="nav-item d-md-none d-block">
            <router-link class="nav-link py-1" to="/Admin/Coupon">優惠券</router-link>
          </li>
          <li class="nav-item d-md-none d-block">
            <router-link class="nav-link py-1" to="/Admin/Order">我的訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link py-1" to="/">購物網站</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link py-1" href="#" @click.prevent="signout">登出</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column pt-2">
              <li class="nav-item">
                <router-link to="/Admin" class="nav-link" :class="{'active': $route.name == 'products'}">
                  <!-- <font-awesome-icon  icon="user-secret" /> -->
                  商品列表
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Admin/Coupon" class="nav-link" :class="{'active': $route.name == 'coupon'}">
                  <!-- <font-awesome-icon  icon="user-secret" /> -->
                  優惠券
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Admin/Order" class="nav-link" :class="{'active': $route.name == 'order'}">
                  <!-- <font-awesome-icon  icon="user-secret" /> -->
                  訂單列表
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
          <!-- <Products />           -->
          <router-view></router-view>
        </main>        
      </div>
    </div>    
  </div>
</template>

<script>
import Products from './pages/admin/Products'


export default {
  components:{
    Products, 
  },
  data() {
    return {      
    };
  },
  methods: {
    signout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          alert("您已登出管理");
          vm.$router.push("/");
        }
      });
    },    
    
  },
};
</script>


