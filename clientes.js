const Sequelize = require('sequelize');
const config={
    username: "root",
    password: "root",
    database: "clientes",
    host: "localhost",
    dialect: "mysql"
}

const sequelize = new Sequelize(config);


const {codificar} = require('./token');

module.exports = {

    validarUsuarios:(Usuario)=>{
        const resultado = sequelize.query ('select usuario from usuarios where usuario = "' + Usuario + '"',{
            type: sequelize.QueryTypes.SELECT
        })
    },
    insertarUsuarios: (req,res) =>{
        const{
            NombreCompleto,
            Usuario,
            Correo,
            Celular,
            Direccion,
            Contraseña,
            Rol
        }=req.body;
    
    sequelize.query('INSERT INTO Usuarios (NombreCompleto, Usuario,Correo,Celular,Direccion,Contraseña,Rol) VALUES ("' +  NombreCompleto + '", "' + Usuario + '", "' + Correo + '", "' + Celular + '", "' + Direccion + '","' + Contraseña + '","' + Rol + '")', {
        type: sequelize.QueryTypes.INSERT
        }).then((resultado) => {
            console.log (resultado);
            const usuarioCodificado = resultado[0];
            const token = codificar( Usuario, Contraseña, Rol, usuarioCodificado);
            res.json({ estado: "Usuario registrado", token: token });
        }).catch((error) => {
        res.json({"estado":error});
        });
    },
    validarUsuarioContraseña: (req,res) =>{
        const{
            Usuario,
            Contraseña
         
        }=req.body;
       
        var query = 'select Id,Rol from usuarios where Usuario = "'+ Usuario + '" and Contraseña ="'+ Contraseña+'"'
        sequelize.query (query, {
            type: sequelize.QueryTypes.SELECT
            }).then(respuestavalidar => {
                console.log(respuestavalidar)
                if(respuestavalidar.length == 1){
                    const {Id,Rol} = respuestavalidar[0];
                    const token = codificar( Usuario, Contraseña, Rol,Id);
                    (token) ?res.json({status:"usuario autenticado",token}) :res.json ({status:"usuario no autenticado"});
                } else{res.json ({status:"usuario o clave invalida"});
    
                }
            }).catch((e) => {
            res.json({ "Status": "Error" +e}) });
    
    },
    
    mostrarUsuarios: (req,res) => {
        console.log(123)
        sequelize.query ('select * from usuarios',{
            type: sequelize.QueryTypes.SELECT})
        .then(mostrarUsuarios =>{
            (mostrarUsuarios.lenght== 0) ?res.json({status:"no hay usuarios registrados"}) :res.json ({status:mostrarUsuarios});
        }).catch((e) => {
                res.json({ "Status": "Error" +e}) })
        
        },
    mostrarUsuariosRegistrados:(req,res) => {
        const id = res.locals.usuario;
    
        console.log(res.locals)
    
        sequelize.query ('select * from usuarios where id = '+ id +'',{
    type: sequelize.QueryTypes.select})
    .then(mostrarUsuario =>{
        (mostrarUsuario.lenght== 0) ?res.json({status:"no hay usuarios registrados"}) :res.json ({status:mostrarUsuario});
        }).catch((e) => {
                res.json({ "Status": "Error" +e}) })
        
        },
    }

















