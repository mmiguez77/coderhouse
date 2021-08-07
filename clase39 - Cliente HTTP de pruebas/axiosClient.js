const axios = require('axios')

const url = 'http://localhost:8080/api/productos';
const urlModify = 'http://localhost:8080/api/productos/1';


let producto = {
    title: 'Arroz Blanco', 
    price: 200,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/international-food/64/fried_rice-128.png'
}

const axiosGet = async () => {
    try {
        const resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.log(err);
    }
};

const axiosPost = async () => {
    try {
        const resp = await axios.post(url, producto);
        console.log(resp.data);
    } catch (err) {
        console.log(err);
    }
};

const axiosPut = async () => {
    try {
        const resp = await axios.put(urlModify, {stock: 18});
        console.log(resp.data);
    } catch (err) {
        console.log(err);
    }
};

const axiosDelete = async () => {
    try {
        const resp = await axios.delete(`${urlModify}`);
        console.log(resp.data);
    } catch (err) {
        console.log(err);
    }
};

axiosGet();
axiosPost();
axiosPut();
axiosDelete();