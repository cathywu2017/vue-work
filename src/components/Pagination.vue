<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled': !pagination.has_pre}">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="getPage(pagination.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in pagination.total_pages" :key="page" 
                    :class="{'active': pagination.current_page === page}">
                    <a class="page-link" href="#" @click.prevent="getPage(page)">{{page}}</a>
                </li>
                <li class="page-item" :class="{'disabled': !pagination.has_next}">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="getPage(pagination.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: ['pagination'],
    methods:{
        getPage(pg){
            this.$emit('getpagination', pg)
        }
    },
}
</script>