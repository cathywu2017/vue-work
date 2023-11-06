<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{modalTitle}}</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="modalData.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="form-group">
                <label for="customFile">
                  或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="fileLoading"></i>
                </label>
                <input type="file" id="customFile" class="form-control" ref="files" @change="updataFile" />
              </div>
              <img
                img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                class="img-fluid"
                :src="modalData.imageUrl"
                alt
              />
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="modalData.title"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    v-model="modalData.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input
                    type="unit"
                    class="form-control"
                    id="unit"
                    v-model="modalData.unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    v-model="modalData.origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model="modalData.price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="modalData.description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="content"
                  v-model="modalData.content"
                  placeholder="請輸入產品說明內容"
                ></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="modalData.is_enabled"
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
          <button type="button" class="btn btn-primary" @click="updataModal">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modalData: {
        type: Object,
        default: {}
    },
    modalTitle: {
        type: String,
        default: ''
    }
  },
  data(){
    return {
      fileLoading: false
    }
  },
  methods:{
    updataModal(){
      this.$emit('updataClick')
    },
    updataFile(){
      console.log(this)
      const uploadFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload',uploadFile)
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
      vm.fileLoading = true
      this.$http.post(url,formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log(response.data)
        vm.fileLoading = false
        if(response.data.success) {
          // vm.modalData.imageUrl = response.data.imageUrl
          // console.log(vm.modalData)
          vm.$set(vm.modalData, 'imageUrl' , response.data.imageUrl)
        }else {
          this.$bus.$emit('message:push',response.data.message,'danger');
        }
      })
    }
  },
}
</script>