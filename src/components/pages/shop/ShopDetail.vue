<template>
  <div>
    <div class="container pt-5">
      <div class="row pt-md-3">
        <div class="col-md-6">
          <!-- <div style="background-size: cover; background-position: center"
          :style="{backgroundImage:`url(${product.imageUrl})`}"></div> -->
          <img :src="product.imageUrl" alt="" width="100%">
        </div>
        <div class="col-md-6">
          <div class="card border-0">
            <div class="card-body">
              <h3 class="card-title text-dark mb-3">
                {{product.title}}
              </h3>
              <span class="badge badge-secondary mb-3">{{product.category}}</span>
              <p class="card-text mb-3">{{product.description}}</p>              
              <div class="d-flex justify-content-between align-items-baseline mb-3">
                <div class="h5" v-if="Number(product.origin_price) == Number(product.price)">
                  原價 NT{{product.origin_price | currency}} 元
                </div>
                <del class="h6" v-if="Number(product.origin_price) > Number(product.price)">
                  原價 NT{{product.origin_price | currency}} 元
                </del>
                <div class="h5" :class="{'text-danger': Number(product.origin_price) > Number(product.price)}" v-if="Number(product.origin_price) > Number(product.price)">
                  現在只要 NT{{product.price | currency}} 元
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <select class="mb-0" v-model="product.num">
                  <option :value="num" v-for="num in 10" :key="num">
                      {{num}}
                  </option>
                </select>
                <button type="button" class="btn btn-danger" @click="addCart(product.id,product.num)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>
                  加到購物車
                </button>
              </div>
            </div>
            <div class="card-footer d-flex">
              <p class="card-text">{{product.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopDetailId: "", //產品 Id
      product: {},
      status: {
        loadingItem: ''
      },
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.shopDetailId}`;
      this.$http.get(api).then(response => {
        console.log(response.data);
        response.data.product.num = 1
        vm.product = response.data.product;
        if (!response.data.success) {
          this.$bus.$emit("message:push", response.data.message, "danger");
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
            // console.log(response);
            vm.status.loadingItem = '';
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
        // console.log(response.data);
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.shopDetailId = this.$route.params.id;
    this.getProduct();
    this.getCart();
  }
};
</script>