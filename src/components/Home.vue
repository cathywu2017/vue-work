<template>
  <div>
    <Header />
    <main role="main">
      <div class="container-fluid">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../assets/images/carousel-01.jpg" class="d-block w-100" alt="">
            </div>
            <div class="carousel-item">
              <img src="../assets/images/carousel-02.jpg" class="d-block w-100" alt="">
            </div>
            <div class="carousel-item">
              <img src="../assets/images/carousel-03.jpg" class="d-block w-100" alt="">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="container mt-5">
        <h3 class="mb-4">推薦商品</h3>
        <div class="row">
          <router-link tag="div" :to="`/ShopDetail/${item.id}`" class="col-md-3 mb-3 pro-Item" v-for="(item,index) in products" :key="item.id"  
          v-if="index < 4">
            <div class="card border-0">
              <div class="card-img"
                style="height: 180px; background-size: cover; background-position: top center"
                :style="{backgroundImage:`url(${item.imageUrl})`}">
                <div class="mask d-flex justify-content-center align-items-center">
                  <div class="mask-text d-flex justify-content-center align-items-center">
                    <h6 class="text-white">詳細介紹</h6>                  
                  </div>
                </div>
              </div>
              <div class="card-body p-3">
                <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                <h5 class="card-title">
                  <span class="text-dark"><strong>{{item.title}}</strong></span>
                </h5>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="h6" v-if="Number(item.origin_price) == Number(item.price)">NT {{item.origin_price | currency}} 元</div>
                  <del class="h6" v-if="Number(item.origin_price) > Number(item.price)">NT {{item.origin_price | currency}} 元</del>
                  <div class="h6" :class="{'text-danger': Number(item.origin_price) > Number(item.price)}" v-if="Number(item.origin_price) > Number(item.price)">優惠價 NT {{item.price | currency}} 元</div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './shell/Header'
import Footer from './shell/Footer'

export default {
  name: 'Home',
  components:{
    Header, Footer
  },
  data () {
    return {
      products: [], //取得商品
    }
  },
  methods:{
    getProducts() {
      //取得商品列表
      // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
      const vm = this;
      this.$http.get(api).then(response => {
        // console.log(response.data);
        vm.products = response.data.products;
        // vm.paginationData = response.data.pagination
        if (!response.data.success) {
          this.$bus.$emit("message:push", response.data.message, "danger")
        }
      });
    },
  },  
  created() {
    this.getProducts();
  }
}
</script>

<style lang="scss" scoped>
.no-border {
  border: 0
}
main {
  margin: 3.5rem 0 1rem;
  padding: 0rem 0 2rem; 
  // border-top: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
}

</style>
