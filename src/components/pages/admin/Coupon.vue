<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right m-3">
            <button class="btn btn-sm btn-primary" @click="openModal(true)">新增優惠券</button>
        </div>
        <div class="table-responsive pt-3">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>活動名稱</th>
                    <th>優惠碼</th>
                    <th>折扣百分比</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in coupons" :Key="item.id">
                    <td>{{item.title}}</td>                
                    <td>{{item.code}}</td>
                    <td>{{item.percent}}</td>
                    <td>{{item.due_date}}</td>
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
        <!-- 新增編輯優惠券 Modal -->
        <CouponModal :coupon-title="titleModal" :coupon="couponData" @updataClick="updataProduct"/>
        <!--  -->
        <!-- 刪除商品 Modal -->
        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white py-2">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除優惠碼</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-center py-4">
                    是否確認刪除優惠碼： <strong class="text-danger">{{ couponData.code }}</strong>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="deleteProduct(couponData)">確認刪除</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import CouponModal from './modal/CouponModal'

export default {
    components: {
        CouponModal
    },
    data() {
        return {
            coupons: [], //取得優惠券
            couponData: {}, //新增修改優惠券
            isNew: false,
            titleModal: '新增優惠券',
            isLoading: false,
            paginationData: {}
        };
    },
    methods: {
        getCoupons() { //取得優惠列表
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
            const vm = this;
            vm.isLoading = true
            this.$http.get(api).then(response => {
                console.log(response.data);
                vm.isLoading = false
                vm.coupons = response.data.coupons
                vm.paginationData = response.data.pagination
                if(!response.data.success) {
                    this.$bus.$emit('message:push',response.data.message,'danger');
                }                       
            });
        },
        
        openModal(isNew,item){  //打開新增或編輯 Modal
            // console.log('isNew:'+isNew, 'item:'+item)          
            if(isNew) {
                this.couponData = {}
                this.isNew = true
            }else{
                this.titleModal = '編輯優惠券'
                this.couponData = Object.assign({}, item) //複製 item 的屬性到 couponData 中
                this.isNew = false                
            }
            $('#productModal').modal('show')
        },
        
        updataProduct(){ //新增或編輯商品
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
            let httpMethod = 'post'
            const vm = this;
            if(!vm.isNew){
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.couponData.id}`;
                httpMethod = 'put'
            }
            this.$http[httpMethod](api, {data: vm.couponData}).then(response => {
                // console.log(response.data);
                if(response.data.success) {
                    $('#productModal').modal('hide')
                    vm.getCoupons()
                }else {
                    vm.getCoupons()
                    this.$bus.$emit('message:push',response.data.message,'danger');
                    // console.log('新增失敗')
                }
            });
        },
        openDelModal(item){ //打開詢問是否刪除 Modal
            this.couponData = item
            $('#delCouponModal').modal('show')
        },
        deleteProduct(){ //刪除優惠券
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.couponData.id}`;
            const vm = this;
            this.$http.delete(api).then(response => {          
                if(response.data.success) {
                    $('#delCouponModal').modal('hide')
                    vm.getCoupons()
                }else {
                    vm.getCoupons()
                    this.$bus.$emit('message:push',response.data.message,'danger');
                    // console.log('刪除失敗')
                }
            });
        },
    },
    created() {
        this.getCoupons();
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