<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="table-responsive pt-4">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>購買時間</th>
                    <th>E-mail</th>
                    <th>購買品項</th>
                    <th>應付金額</th>
                    <th>是否付款</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="item in orders" :Key="item.id">
                        <td>{{item.create_at}}</td>
                        <td>{{item.user.email}}</td>
                        <td>
                            <div v-for="detail in item.products" :Key="detail.id">
                                {{detail.product.title}} - {{detail.qty}}
                            </div>
                        </td>
                        <td>{{item.total}}</td>
                        <td>
                            <div v-if="item.is_paid" class="text-success">已付款</div>
                            <div v-else>尚未付款</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination :pagination="paginationData" @getpagination="getOrders" v-if="orders.length !== 0" />
    </div>
</template>

<script>
import Pagination from '../../Pagination'

export default {
    components: {
        Pagination
    },
    data() {
        return {
            orders: [], //取得訂單
            isLoading: false,
            paginationData: {}
        };
    },
    methods: {
        getOrders(page = 1) { //取得訂單列表
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
            const vm = this;
            vm.isLoading = true
            this.$http.get(api).then(response => {
                // console.log(response.data);
                vm.isLoading = false
                vm.orders = response.data.orders
                vm.paginationData = response.data.pagination
                if(!response.data.success) {
                    this.$bus.$emit('message:push',response.data.message,'danger');
                }                       
            });
        },
    },
    created() {
        this.getOrders();
    }
}
</script>

<style lang="scss" scoped>
tbody tr td{
    vertical-align: middle;
}
</style>