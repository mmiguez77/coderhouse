let num = []
//console.log(num)

function generarObj(titulo, precio, imagen) {


    let obj = new Object(),
        title = titulo,
        price = precio,
        thumbnail = imagen,


        obj['Title'] = title,
            obj['Price'] = price,
            obj['Thumbnail'] = thumbnail;

    const numId = () => {
        for (let i = 1; i < 5; i++) {
            let n = num.length - 1
            n++
            //num.push(n)
            //console.log(n)
        }

    }
    id = numId();
    obj['id'] = numId();

    let objArray = JSON.stringify(obj);
    //console.log(objArray)
    num.push(objArray);

}
generarObj('Regla', 10, 'regla.jpg')
generarObj('Lapiz', 45, 'lapiz.jpg')
generarObj('Bic', 50, 'bic.jpg')

console.log(num)

