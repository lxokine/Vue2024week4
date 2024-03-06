
import Pagination from "../components/Pagination.js";  //  import module 
import ProductModal from "../components/ProductModal.js"; //  import module 
import DelProductModal from "../components/DelProductModal.js"; // import module 

const url = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "vue3-lxokine-api";

const app = Vue.createApp({
    data(){
      return {
        products: [],
        tempProduct: {
          imageUrl: [],
        },
        isNew: false,
        pagination: {}, //分頁
        productModal : null,
        delProductModal : null,
      }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexVueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.check();
      },
    methods:{
        check(){
            axios.post(`${url}/api/user/check`)
            .then(()=>{
                this.getProducts();
            })
            .catch((err) => {
                alert(err.data.message);
                window.location = 'index.html';
            });
        },
        getProducts(page =1){
            axios.get(`${url}/api/${apiPath}/admin/products?page=${page}`)
            .then((res)=>{
              console.log(res);
              this.products = res.data.products;
              this.pagination = res.data.pagination; 
            })
            .catch((err)=>{
              alert(err.res.data.message);
            })
        },
          openModal(isNew, item) {
            if (isNew === 'new') {
              this.tempProduct = {imagesUrl: [],};
              this.isNew = true;
              this.$refs.pModel.openModal();
            } else if (isNew === 'edit') {
              this.tempProduct = { ...item };
              this.isNew = false;
              this.$refs.pModel.openModal();
            } else if (isNew === 'delete') {
              this.tempProduct = { ...item };
              this.$refs.dModel.openModal();
            }
          },
        updateProduct() {
          let api = `${url}/api/${apiPath}/admin/product`;
          let method = 'post'

          if (!this.isNew) {
              api = `${url}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
              method = 'put'
          }

          axios[method](api, { data: this.tempProduct })
              .then(res => {
                alert(res.data.message);
                this.getProducts();
                this.$refs.pModel.closeModal();
                this.tempProduct = {}
              }).catch((err) => {
                  alert(err.response.data.message);
              })
      },
      deleteProduct() {
          let api = `${url}/api/${apiPath}/admin/product/${this.tempProduct.id}`;

          axios.delete(api, { data: this.tempProduct })
              .then(res => {
                  // api取產品資料 存products陣列
                  alert(res.data.message);
                  this.getProducts();
                  this.$refs.dModel.close();
                  this.tempProduct = {}
              }).catch((err) => {
                  alert(err.response.data.message);
              })
              }
      },   
    //元件
    components: {
      Pagination, 
      ProductModal, 
      DelProductModal 
    },      
  });
  app.mount('#app');