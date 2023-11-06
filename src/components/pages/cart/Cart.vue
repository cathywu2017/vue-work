<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mt-3">
      <CartStep />      
      <table class="table">
        <thead>          
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">            
            <td class="align-middle">
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">
                已套用優惠券
              </div>
            </td>
            <td class="align-middle">{{ item.qty }}</td>
            <td class="align-middle">{{ item.final_total }}</td>
            <td class="align-middle  text-right">
              <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ Math.round(cart.final_total) }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCoupon">套用優惠碼</button>
        </div>
      </div>
      <div class="text-center clearfix">
        <router-link to="/CartOrder" tag="button" class="btn btn-danger float-md-right " type="button">確認結帳</router-link>
      </div>
    </div>    
  </div>
</template>

<script>
import CartStep from './CartStep'

export default {
  components: {
    CartStep
  },
  data() {
    return {
      isLoading: false,
      cart: [],
      coupon_code: '',
    };
  },
  methods: {
    getCart() {
      //取得購物車列表
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
    removeCartItem(id){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        // console.log(response.data);
        vm.getCart()
        vm.isLoading = false;        
      });
    },
    addCoupon(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
          code: vm.coupon_code
      }
      vm.isLoading = true;
      this.$http.post(api,{data: coupon}).then(response => {
        console.log(response.data);
        vm.getCart()
        vm.isLoading = false;        
        if (!response.data.success) {
          this.$bus.$emit("message:push", response.data.message, "danger")
        }
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>

<style lang="scss" scoped>
main {
    padding-top: 3.5rem
}
</style>