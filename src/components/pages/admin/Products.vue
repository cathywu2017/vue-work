<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right m-3">
            <button class="btn btn-sm btn-primary" @click="openModal(true)">新增商品</button>
        </div>
        <div class="table-responsive pt-3">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>分類</th>
                    <th>商品圖片</th>
                    <th>商品名稱</th>
                    <th>原價</th>
                    <th>售價</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in products" :Key="item.id">
                    <td>{{item.category}}</td>
                    <td width="100">
                        <img class="itemImg" :src="item.imageUrl">
                    </td>
                    <td>{{item.title}}</td>                  
                    <td>{{item.origin_price | currency}}</td>
                    <td>{{item.price | currency}}</td>
                    <td>
                        <span v-if="item.is_enabled">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary" @click="openModal(false,item)">編輯</button>
                            <button class="btn btn-sm btn-outline-danger" @click="openDelModal(item)">刪除</button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 新增修改商品 Modal -->
        <AddEditModal :modal-title="titleModal" :modal-data="tempProduct" @updataClick="updataProduct" />
        <!-- 刪除商品 Modal -->
        <DelModal :delmodal-data="tempProduct" @delClick="deleteProduct" />
        <!-- <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled': !pagination.has_pre}">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in pagination.total_pages" :key="page" 
                    :class="{'active': pagination.current_page === page}">
                    <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
                </li>
                <li class="page-item" :class="{'disabled': !pagination.has_next}">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav> -->
        <Pagination :pagination="paginationData" @getpagination="getProducts" v-if="products.length !== 0" />
    </div>
</template>

<script>
import $ from 'jquery'
import AddEditModal from './modal/AddEditModal'
import DelModal from './modal/DelModal'
import Pagination from '../../Pagination'

export default {
    components: {
        AddEditModal, DelModal, Pagination
    },
    data() {
        return {
            products: [], //取得商品
            tempProduct: {}, //新增修改商品
            isNew: false,
            titleModal: '新增商品',
            isLoading: false,
            paginationData: {}
        };
    },
    methods: {
        getProducts(page = 1) { //取得商品列表
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
            const vm = this;
            vm.isLoading = true
            this.$http.get(api).then(response => {
                console.log(response.data);
                vm.isLoading = false
                vm.products = response.data.products
                vm.paginationData = response.data.pagination
                if(!response.data.success) {
                    vm.$router.push('/Login')
                    this.$bus.$emit('message:push',response.data.message,'danger');

                }                       
            });
        },
        openModal(isNew,item){  //打開新增或編輯 Modal
            // console.log('isNew:'+isNew, 'item:'+item)          
            if(isNew) {
                this.tempProduct = {}
                this.isNew = true
            }else{
                this.titleModal = '編輯商品'
                this.tempProduct = Object.assign({}, item) //複製 item 的屬性到 tempProduct 中
                this.isNew = false                
            }
            $('#productModal').modal('show')
        },
        updataProduct(){ //新增或編輯商品
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
            let httpMethod = 'post'
            const vm = this;
            if(!vm.isNew){
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
                httpMethod = 'put'
            }
            this.$http[httpMethod](api, {data: vm.tempProduct}).then(response => {
                // console.log(response.data);
                if(response.data.success) {
                    $('#productModal').modal('hide')
                    vm.getProducts()
                }else {
                    vm.getProducts()
                    this.$bus.$emit('message:push',response.data.message,'danger');
                    // console.log('新增失敗')
                }
            });
        },
        openDelModal(item){ //打開詢問是否刪除 Modal
            this.tempProduct = item
            $('#delProductModal').modal('show')
        },
        deleteProduct(){ //刪除商品
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`;
            const vm = this;
            this.$http.delete(api).then(response => {          
                if(response.data.success) {
                    $('#delProductModal').modal('hide')
                    vm.getProducts()
                }else {
                    vm.getProducts()
                    this.$bus.$emit('message:push',response.data.message,'danger');
                    // console.log('刪除失敗')
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
.itemImg {
    max-width: 100%;
}
tbody tr td{
    vertical-align: middle;
}
</style>