const Sequelize = require ("sequelize");
const config={
    username: "root",
    password: "root",
    database: "clientes",
    host: "localhost",
    dialect: "mysql"
}

const sequelize = new Sequelize(config);

/*sequelize.authenticate()
.then(() => {
    console.log('Funciona!');
})
.catch(error => {
    console.error('No funciona, porque:', error);
});
*/

module.exports = {

insertarProductos: (req,res) => {
    const{
        Nombre_producto,
        precio
    }=req.body;

    console.log(req.body)
    
sequelize.query('INSERT INTO producto (Nombre_producto,precio) VALUES ("' + Nombre_producto + '", "' + precio + '")', {
    type: sequelize.QueryTypes.INSERT
    }).then((resultado) => {
        res.json({ "Status": "Producto ingresado"});
    }).catch((e) => {
    res.json({ "Status": "Error" +e});
    });
},

 mostrarProductos: (req,res) => {
    sequelize.query ('select * from producto ', {
        type: sequelize.QueryTypes.SELECT})
    .then(mostrarProductos =>{
        (mostrarProductos.lenght== 0) ?res.json({status:"no hay productos registrados"}) :res.json ({status:mostrarProductos});
    }).catch((e) => {
            res.json({ "Status": "Error" +e}) })
    
    },

actualizarProductos: (req,res) => {
        const{
            Nombre_producto,
            precio,
            Id
        }=req.body;
        sequelize.query('update producto set precio =' +precio +', Nombre_producto ="' + Nombre_producto +'" where Id = ' +Id, { 
           type: sequelize.QueryTypes.Update
        }).then((resultado) => {
        res.json({ "Status": "Producto Actualizado" });
        }).catch((e) => {
        res.json({ "Status": "Error"+e });
        });
},
borrarProductos: (req,res) => {

    const{
       Id
    }=req.body;

sequelize.query('delete from producto where Id = ' + Id + '', {
    type: sequelize.QueryTypes.Delete
    }).then((resultado) => {
    res.json({ "Status": "Producto Eliminado" });
    }).catch(() => {
    res.json({ "Status": "Error" });
    });
},

ValidarProductos: (Nombre_producto) =>{
    const resultado =  sequelize.query ('select Nombre_producto from producto where Nombre_producto = "' + Nombre_producto + '"',{
        type: sequelize.QueryTypes.SELECT
    }).catch((error) => {
        console.log("error");
    });
    return resultado;
},
}
