<template>
  <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ delmodalData.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delModal()">確認刪除</button>
        </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: {
      delmodalData: {
          type: Object,
          default: {}
      },
    },
    methods:{
        delModal(){
            this.$emit('delClick')
        }
    }
}
</script>