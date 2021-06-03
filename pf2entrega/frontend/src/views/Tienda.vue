<template>
  <div>
    <div class="container mb-5">
      <div class="container" style="margin-top: 50px">
        <div class="row">
          <div class="col-md-3 mb-4" v-for="(item, index) in productos" :key="index">
            <div class="card-sl">
              <div class="card-image">
                <img
                  :src="item.thumbnail"
                />
              </div>

              <a class="card-action" href="#"><img src="../assets/heart.png" alt=""></a>
              <div class="card-heading">{{ item.title }}</div>
              <div class="card-text">
                <p>{{item.description}}</p>
              </div>
              <div class="card-text">$ {{item.price}} </div>
              <div>
                <a href="#" type="submit" @click="addCart(item._id)"><img src="../assets/shopping-cart.png" alt="" class="my-1 mx-4"></a>
                <a href="#"><img src="../assets/magnifying-glass.png" alt="" class="my-1 mx-4"></a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>


export default {
  
  data() {
    return {
      productos: [],
      cart: [],
    };
  },
  created() {
    this.viewAll();
  },
  methods: {
    viewAll() {
      this.axios.get("/api/productos")
        .then((res) => {
          console.log(res.data);
          this.productos = res.data
        })
        .catch((error) => {
          console.log(error.response);
        })
    },
    async addCart(id){
      this.axios.post(`/cart/${_id}`)
    }
  }
}
</script>

<style>
/*  Helper Styles */
body {
  font-family: Varela Round;
  background: #f1f1f1;
}

a {
  text-decoration: none;
}

/* Card Styles */

.card-sl {
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.card-image img {
  max-height: 100%;
  max-width: 100%;
  border-radius: 8px 8px 0px 0;
}

.card-action {
  position: relative;
  float: right;
  margin-top: -55px;
  margin-right: 20px;
  z-index: 2;
  color: #f3f0f0;
  background: #fff;
  border-radius: 100%;
  padding: 15px;
  font-size: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19);
}

.card-action:hover {
  color: #fff;
  background: #f0f0f0;
  -webkit-animation: pulse 1.5s infinite;
}

.card-heading {
  font-size: 18px;
  font-weight: bold;
  background: #fff;
  padding: 10px 15px;
}

.card-text {
  padding: 10px 15px;
  background: #fff;
  font-size: 14px;
  color: #636262;
}

.card-button {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
  background-color: #1f487e;
  color: #fff;
  border-radius: 0 0 8px 8px;
}

.card-button:hover {
  text-decoration: none;
  background-color: #1d3461;
  color: #fff;
}

@-webkit-keyframes pulse {
  0% {
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  70% {
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -webkit-transform: scale(1);
    transform: scale(1);
    box-shadow: 0 0 0 50px rgba(90, 153, 212, 0);
  }

  100% {
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
  }
}
</style>
