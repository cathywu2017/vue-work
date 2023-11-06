<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mt-3">
      <CartStep />   
      <div>
        <div class="row justify-content-center">
          <form class="col-md-8" @submit.prevent="payOrder">
            <h6 class="mt-3"><strong>▼購買清單</strong></h6>
            <table class="table border">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }}</td>
                  <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right text-success">總計 {{ order.total }}</td>
                </tr>
              </tfoot>
            </table>
            <h6 class="mt-4"><strong>▼購買人資料</strong></h6>
            <table class="table border">
              <tbody>
                <tr>
                  <th width="130">Email</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-center" v-if="order.is_paid === false">
              <button class="btn btn-danger">確認付款去</button>
            </div>
          </form>
        </div>
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
      orderId: '',
      order: {
        user: {}
      },
    };
  },
  methods: {
    getOrder() {
      //取得訂單列表
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.order = response.data.order
        vm.isLoading = false;
      });
    },
    payOrder(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        if(response.data.success) {
          vm.getOrder();
        }
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId
    this.getOrder();
  }
};
</script>

<style lang="scss" scoped>
main {
    padding-top: 3.5rem
}
</style>