<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light fixed-top bg-white shadow">
        <router-link class="navbar-brand" to="/"><strong>好日子</strong></router-link>
        <button class="navbar-toggler no-border" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/Shop">商品列表</router-link>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#"  @click.prevent="openCouModal()">優惠券</a>
            </li>
          </ul>
          <div class="form-inline my-2 my-lg-0">
            <router-link to="/Cart" tag="button" class="btn my-2 my-sm-0 cart-btn">
              <span>購物車</span>
              <i class="fas fa-shopping-cart"></i>
            </router-link>
            <router-link to="/Admin" class="nav-link">管理</router-link>
          </div>
        </div>        
      </nav>
      <div class="modal fade" id="openCouModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white py-2">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>優惠碼</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-center py-4">
                    優惠碼： <strong class="text-danger">coupon</strong>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-dark" data-dismiss="modal">確認</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: '',
  data () {
    return {
      coupons: [],
    }
  },
  methods: {
    openCouModal(item){ //打開詢問是否刪除 Modal
      $('#openCouModal').modal('show')
    },
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
</style>
