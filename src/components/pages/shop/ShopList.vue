<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container-fluid">
      <div class="banner"></div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-2 mb-3 mb-md-0 categoryList">
          <div class="border-bottom p-2" @click="filter = ''">所有商品</div>
          <div class="border-bottom p-2" v-for="(value,index) in category" :key="index" @click="filter = value">
            {{value}}
          </div>
        </div>
        <div class="col-md-10">
          <div class="row">
            <div tag="div" class="col-md-4 mb-5 pro-Item" v-for="item in categoryArray" :key="item.id">
              <div class="card border-0">
                <router-link tag="div" :to="`/ShopDetail/${item.id}`" class="card-img"
                  style="height: 180px; background-size: cover; background-position:top center"
                  :style="{backgroundImage:`url(${item.imageUrl})`}">
                  <div class="mask d-flex justify-content-center align-items-center">
                    <div class="mask-text d-flex justify-content-center align-items-center">
                      <h6 class="text-white">詳細介紹</h6>                  
                    </div>
                  </div>
                </router-link >
                <div class="card-body p-3">
                  <h5 class="card-title">
                    <span class="text-dark"><strong>{{item.title}}</strong></span>
                  </h5>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h6" v-if="Number(item.origin_price) == Number(item.price)">NT {{item.origin_price | currency}} 元</div>
                    <del class="h6" v-if="Number(item.origin_price) > Number(item.price)">NT {{item.origin_price | currency}} 元</del>
                    <div class="h6" :class="{'text-danger': Number(item.origin_price) > Number(item.price)}" v-if="Number(item.origin_price) > Number(item.price)">優惠價 NT {{item.price | currency}} 元</div>
                  </div>
                  <span class="badge badge-secondary">{{item.category}}</span>
                  <button type="button" class="btn btn-danger btn-sm ml-auto float-right" @click="addCart(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    <!--  -->
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Pagination :pagination="paginationData" @getpagination="getProducts" v-if="products.length !== 0 && filter == ''" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../../Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      products: [], //取得商品
      isLoading: false,
      status: {
        loadingItem: ''
      },
      paginationData: {},
      category: [], //類別
      filter: '',
    };
  },
  methods: {
    getProducts(page = 1) {
      //取得商品列表
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.paginationData = response.data.pagination
        vm.category = vm.products.map(el => el.category).filter(function(el,index,arr){
          return arr.indexOf(el) === index
        })
        if (!response.data.success) {
          this.$bus.$emit("message:push", response.data.message, "danger")
        }
      });
    },
    addCart(id,qty = 1){
        const vm = this;
        let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
        vm.status.loadingItem = id;
        const cart = {
            product_id: id,
            qty
        }
        this.$http.post(api, {data: cart}).then(response => {
            console.log(response);
            vm.status.loadingItem = ''
            vm.getCart()
            if (response.data.success) {
                this.$bus.$emit("message:push", response.data.message, "success");
            }
        });
    },
    getCart(){
      //取得購物車列表
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
      });
    }
  },
  computed: {
    categoryArray(){
      const vm = this;
      if(vm.filter == '') {
        return vm.products
      }else {
        return vm.products.filter(el => el.category == vm.filter)
      }
    }
    

  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>

<style lang="scss" scoped>
.banner {
  background-image: url('../../../assets/images/banner.jpg')
}
.categoryList {
  div {
    cursor: pointer;
    &:hover {
      background: #ced4da;
    }
    &:last-child {
      border-bottom: 0 !important;
    }
  }
}
</style>