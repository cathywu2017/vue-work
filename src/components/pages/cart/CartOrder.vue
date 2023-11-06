<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mt-3">
      <CartStep /> 
      <div class="row cartOrder">
        <div class="col-md-3 shadow mb-4 mb-md-0">
          <table class="table">
            <thead>          
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">            
                <td class="align-middle">
                  {{ item.product.title }}              
                </td>
                <td class="align-middle">{{ item.qty }}</td>
                <td class="align-middle">{{ item.final_total }}</td>            
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right text-success">總付款金額</td>
                <td class="text-right text-success">{{ Math.round(cart.final_total) }}</td>
              </tr>
            </tfoot>
          </table>
        </div> 
        <div class="col-md-9">
          <p class="h5 mb-3 pb-2 border-bottom"><strong>填寫收件</strong></p>
          <div class="row justify-content-center">
            <form class="col" @submit.prevent="createOrder">
              <div class="form-group">
                <label for="useremail">Email</label>
                <input type="text" class="form-control" name="email" id="useremail" placeholder="請輸入 Email"
                  v-model="form.user.email" v-validate="'required|email'" :class="{'is-invalid': errors.has('email')}">
                <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
            
              <div class="form-group">
                <label for="username">收件人姓名</label>
                <input type="text" class="form-control" name="name" id="username" placeholder="輸入姓名"
                  v-model="form.user.name" :class="{'is-invalid': errors.has('name')}" v-validate="'required'">
                <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
              </div>
            
              <div class="form-group">
                <label for="usertel">收件人電話</label>
                <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
              </div>
            
              <div class="form-group">
                <label for="useraddress">收件人地址</label>
                <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                  placeholder="請輸入地址" :class="{'is-invalid': errors.has('address')}" v-validate="'required'">
                <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
              </div>
            
              <div class="form-group">
                <label for="comment">留言</label>
                <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
              </div>
              <div class="text-right">
                <button class="btn btn-danger">送出訂單</button>
              </div>
            </form>
          </div>        </div>
               
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
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      }
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
    createOrder(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form
      this.$validator.validate().then((result) => {
        if(result) {
            this.$http.post(api,{data: order}).then(response => {
              if (response.data.success) {          
                // this.$bus.$emit("message:push", response.data.message, "success")
                vm.$router.push(`/CartCheck/${response.data.orderId}`)
              }else {
                this.$bus.$emit("message:push", response.data.message, "danger")
              }
            })
        }else {
            console.log('欄位不完整')
            this.$bus.$emit("message:push",'欄位不完整', "danger")
        }
      })
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
.cartOrder {
  flex-direction: row-reverse;
}
</style>