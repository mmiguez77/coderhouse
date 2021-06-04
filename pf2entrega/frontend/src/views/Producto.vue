<template>
  <div>
    <div class="container mb-5">
      <div class="container-fluid px-1 py-1 mx-auto">
        <div class="row d-flex justify-content-center">
          <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center px-2">
            <div class="card">
              
    <!-- Inicio Formulario Actualizar -->
    <form @submit.prevent="edit(productosUpdate)" class="form-card mx-2" v-if="editar" autocomplete="off">
      <h3 class="mt-1">Formulario para <b>editar</b> producto</h3>
        <p class="text-center mt-2 mb-4 mx">Por favor complete todos los campos</p>
          <div class="row justify-content-between text-left">
                  <!--  -->
                  <div class="form-group col-12 flex-column d-flex mb-2">
                    <label class="form-control-label px-3"
                      >Nombre del Producto<span class="text-danger"> *</span></label>
                    <input type="text" class="form-control" id="title" name="title" placeholder="Ejemplo: Cafe" 
                    v-model="productosUpdate.title" required/>
                  </div>
                  <!--  -->
                  <div class="form-group col-sm-6 flex-column d-flex mb-2">
                    <label class="form-control-label px-3">Precio<span class="text-danger"> *</span></label>
                    <input type="number" class="form-control" id="price" name="price" placeholder="Ejemplo: 1500" v-model.number="productosUpdate.price" required/>
                  </div>
                  <!--  -->
                  <div class="form-group col-sm-6 flex-column d-flex">
                    <label class="form-control-label px-3">Código<span class="text-danger"> *</span></label>
                    <input type="text" class="form-control" id="code" name="code" placeholder="Ejemplo: PC-23" v-model="productosUpdate.code" required/>
                  </div>
                  <!--  -->
                  <div class="row justify-content-between text-left mb-2">
                    <div class="form-group col-sm-6 flex-column d-flex">
                      <label class="form-control-label px-3">Stock<span class="text-danger"> *</span></label>
                      <input type="number" class="form-control" id="stock" name="stock" placeholder="Ejemplo: 10" 
                      v-model.number="productosUpdate.stock" required/>
                    </div>
                  </div>
                  <!--  -->
                  <div class="form-group col-12 flex-column d-flex mb-2">
                    <label class="form-control-label px-3">Imagen (url) <span class="text-danger"> *</span></label>
                    <input type="text" class="form-control" id="thumbnail" name="thumbnail"
                    placeholder="Ejemplo: https://linkalaimagen.com" v-model="productosUpdate.thumbnail" required/>
                  </div>
                  <!--  -->
                  <div class="row justify-content-between text-left">
                    <div class="form-group col-12 flex-column d-flex">
                      <label class="form-control-label px-3">Descripción<span class="text-danger"> *</span></label>
                      <textarea name="description" id="description" rows="10" v-model="productosUpdate.description" required></textarea>
                    </div>
                  </div>
                </div>
                <!--  -->
                <div class="row justify-content-end">
                  <div class="form-group col-sm-12 my-2">
                    <button type="submit" class="btn-sm btn-warning mx-2">Editar</button>
                    <button type="submit" class="btn-sm btn-primary mx-2" @click="editar=false">Cancelar</button>
                  </div>
                  <!--  -->
                </div>
              </form>
    <!-- Fin Formulario Actualizar -->
    
    <!-- Inicio Formulario Agregar -->
            <form @submit.prevent="add()" class="form-card mx-2" v-if="!editar" autocomplete="off">
              <h3 class="mt-1">Formulario para <b>agregar</b> producto</h3>
              <p class="text-center mt-2 mb-4 mx">Por favor complete todos los campos</p>
                <div class="row justify-content-between text-left">
                  <!--  -->
                  <div class="form-group col-12 flex-column d-flex mb-2">
                    <label class="form-control-label px-3"
                      >Nombre del Producto<span class="text-danger"> *</span></label>
                    <input type="text" class="form-control" id="title" name="title" placeholder="Ejemplo: Cafe" 
                    v-model="inputProducto.title" required/>
                  </div>
                  <!--  -->
                  <div class="form-group col-sm-6 flex-column d-flex mb-2">
                    <label class="form-control-label px-3">Precio<span class="text-danger"> *</span></label>
                    <input type="number" class="form-control" id="price" name="price" placeholder="Ejemplo: 1500" v-model.number="inputProducto.price" required/>
                  </div>
                  <!--  -->
                  <div class="form-group col-sm-6 flex-column d-flex">
                    <label class="form-control-label px-3">Código<span class="text-danger"> *</span></label>
                    <input type="text" class="form-control" id="code" name="code" placeholder="Ejemplo: PC-23" v-model="inputProducto.code" required/>
                  </div>
                  <!--  -->
                  <div class="row justify-content-between text-left mb-2">
                    <div class="form-group col-sm-6 flex-column d-flex">
                      <label class="form-control-label px-3">Stock<span class="text-danger"> *</span></label>
                      <input type="number" class="form-control" id="stock" name="stock" placeholder="Ejemplo: 10" 
                      v-model.number="inputProducto.stock" required/>
                    </div>
                  </div>
                  <!--  -->
                  <div class="form-group col-12 flex-column d-flex mb-2">
                    <label class="form-control-label px-3">Imagen (url) <span class="text-danger"> *</span></label>
                    <input type="text" class="form-control" id="thumbnail" name="thumbnail"
                    placeholder="Ejemplo: https://linkalaimagen.com" v-model="inputProducto.thumbnail" required/>
                  </div>
                  <!--  -->
                  <div class="row justify-content-between text-left">
                    <div class="form-group col-12 flex-column d-flex">
                      <label class="form-control-label px-3">Descripción<span class="text-danger"> *</span></label>
                      <textarea name="description" id="description" rows="5" v-model="inputProducto.description" required></textarea>
                    </div>
                  </div>
                </div>
                <!--  -->
                <div class="row justify-content-end">
                  <div class="form-group col-sm-12 my-2">
                    <button type="submit" class="btn btn-success">Agregar</button>
                  </div>
                  <!--  -->
                </div>
              </form>
        <!-- Fin Formulario Agregar -->

            </div>
          </div>
        </div>
      </div>
    </div>

 

    <div class="container">
      <b-alert :show="dismissCountDown" :variant= "mensaje.color" @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged">
        <p>{{ mensaje.texto }}</p>
        <b-progress :variant= "mensaje.color" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
      </b-alert>
    </div>

    <div class="container mt-4">
      <div class="row">
        <div class="col-md-3" v-for="(items, index) in productos" :key="index">
          <div class="card-sl mb-4">
            <div class="card-image">
              <img :src="items.thumbnail" alt="imagenProducto" />
            </div>
            <div class="card-heading">{{ items.title }}</div>
            <div class="card-description">
              <p>{{ items.description }}</p>
            </div>
            <div class="card-text">Precio: $ {{ items.price }}</div>
            <div class="card-text">Código: {{ items.code }}</div>
            <div class="card-text">Stock: {{ items.stock }}</div>
            <div>
              <button class="btn-sm btn-warning m-2" @click="activarBtn(items._id)">Actualizar</button>
              <button class="btn-sm btn-danger m-2" @click="deleteProd(items._id)">Eliminar</button>
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
      dismissSecs: 3,
      dismissCountDown: 0,
      mensaje: { color: "", texto: "" },
      inputProducto: {title: '', price: '', stock: '', thumbnail: '', code: '', description: '' },
      editar: false,
      productosUpdate: {}
    };
  },
  created() {
    this.viewAll();
  },
  methods: {
    viewAll() {
      this.axios
        .get("/api/productos")
        .then((res) => {
          console.log(res.data);
          this.productos = res.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },add(){
      //console.log(this.inputProducto)
      this.axios.post('/api/productos', this.inputProducto)
      .then(res =>{
        this.productos.push(res.data)
        this.inputProducto.title= ''; 
        this.inputProducto.price= '',
        this.inputProducto.stock= ''; 
        this.inputProducto.thumbnail= '';
        this.inputProducto.code= ''; 
        this.inputProducto.description='';
        this.mensaje.color = "success",
        this.mensaje.texto = 'Producto agregado con éxito',
        this.showAlert();      
      }).catch(error => {
        console.log(error.response);
        this.mensaje.color = "danger",
        this.mensaje.texto = 'Error',
        this.showAlert();  
      })
    },
    deleteProd(id){
      console.log(id)
      this.axios.delete(`/api/productos/${id}`)
      .then(res => {
        const index = this.productos.findIndex(prod => prod._id === res.data._id );
        this.productos.splice(index, 1)
        this.mensaje.color = "success",
        this.mensaje.texto = 'Producto eliminado con éxito',
        this.showAlert();     
      })
      .catch(error => {
        console
      })
    },
    activarBtn(id){
     this.editar = true;
     console.log(id)
     this.axios.get(`/api/productos/${id}`)
     .then(res => {
       this.productosUpdate = res.data;
     })
     .catch(error => {
       console.log(error)
     })
    },
    edit(prodUpdate){
      this.axios.put(`/api/productos/${prodUpdate._id}`, prodUpdate)
      .then(res => {
        console.log(res)
        // let index = this.productos.findIndex(prod => prod._id === res.data._id );
        // this.productos[index].title= res.data.title; 
        // this.productos[index].price= res.data.price,
        // this.productos[index].stock= res.data.stock; 
        // this.productos[index].thumbnail= res.data.thumbnail;
        // this.productos[index].code= res.data.code; 
        // this.productos[index].description=res.data.description;
        // this.mensaje.color = "success",
        // this.mensaje.texto = 'Producto modificado con éxito',
        // this.showAlert();         
        // this.editar = false
      })
      .catch(error => {
        console.log(error)
      })
    },
    alerta() {
      this.mensaje.color = "success",
      this.mensaje.texto = "Test",
      this.showAlert();
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
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

.card-image {
  max-height: 100%;
  max-width: 100%;
  border-radius: 8px 8px 0px 0;
  background:#fff;
}

.card-image img {
  max-height: 100%;
  max-width: 100%;
  border-radius: 8px 8px 0px 0;
  background:#fff;
}

.card-heading {
  font-size: 18px;
  font-weight: bold;
  background: #fff;
  padding: 10px 15px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.281);
}

.card-text {
  padding: 10px 15px;
  background: #fff;
  font-size: 14px;
  color: #636262;
}

.card-description {
  padding: 10px 15px;
  background: #fff;
  font-size: 14px;
  color: #636262;
}
</style>
