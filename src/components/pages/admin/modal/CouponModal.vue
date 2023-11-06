<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{couponTitle}}</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="title">活動名稱</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="coupon.title"
                  placeholder="請輸入活動名稱"
                />
              </div>
              <div class="form-group">
                <label for="code">優惠碼</label>
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  v-model="coupon.code"
                  placeholder="請輸入優惠碼"
                />
              </div>
              <div class="form-group">
                <label for="percent">折扣百分比</label>
                <input
                  type="text"
                  class="form-control"
                  id="percent"
                  v-model="coupon.percent"
                  placeholder="請輸入折扣"
                />
              </div>
              <div class="form-group">
                <label for="date">到期日</label>
                <input
                  type="date"
                  class="form-control"
                  id="date"
                  v-model="coupon.due_date"
                  placeholder=""
                />
              </div>              
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="coupon.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updataModal">更新優惠券</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    coupon: {
        type: Object,
        default: {}
    },
    couponTitle: {
        type: String,
        default: ''
    }
  },
  data(){
    return {
    }
  },
  methods:{
    updataModal(){
      this.$emit('updataClick')
    },
  },
}
</script>