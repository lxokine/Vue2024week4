export default {
    props:['pagination','getProducts'],
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" :class="{disabled:!pagination.has_pre}" @click="getProducts(page-1)">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" :class="{active:page === pagination.current_page}"
            v-for="page in pagination.total_pages" :key="page + 123" @click="getProducts(page)">
            <a class="page-link" href="#">{{page}}</a>
        </li>
        <li class="page-item" :class="{disabled:!pagination.has_next}" @click="getProducts(page+1)">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>`
}