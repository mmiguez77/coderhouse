import path from 'path';
const __dirname = path.resolve();

function upload(req) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return console.log('Ningun archivo cargado para subir.');
    }

    sampleFile = req.files.avatar;
    uploadPath = path.join(__dirname + '/uploads/' + sampleFile.name);
  
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return console.error(err);
        } else { 
            //const data = sampleFile.data
            console.log('Imagen cargada correctamente');
            //return data
        }       
    });
};

export default upload;