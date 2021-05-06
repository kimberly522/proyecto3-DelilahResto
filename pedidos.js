const Sequelize = require ("sequelize");
const config={
    username: "root",
    password: "root",
    database: "clientes",
    host: "localhost",
    dialect: "mysql"
}

const sequelize = new Sequelize(config);


function insertarPedidoProducto (Id_Pedido,element) {
    let{
        Id_Producto,
        Cantidad
    } =element;
    sequelize.query ('INSERT INTO PedidosFinales (Id_Producto,Id_Pedido,Cantidad) VALUES ( "' + Id_Producto + '","' + Id_Pedido + '","' + Cantidad + '")',{
    type: sequelize.QueryTypes.INSERT
}).then(respuestaInsertarPedido  => {
    return true;
}).catch((error ) => {return false;});
}

module.exports = {

insertarPedidos:async (req,res)=>{
    const{
        Estado,
        Forma_De_Pago,
        Id_Usuario,
        Productos
    }=req.body
const data = new Date ();
const tms = `${data.getFullYear()}-${data.getMonth()}-${data.getDay()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
sequelize.query ('INSERT INTO pedido (Estado,Hora,Forma_De_Pago,Id_Usuario) VALUES  ("' + Estado + '", "' + tms + '", "' + Forma_De_Pago+ '", "' + Id_Usuario+ '")',{
type: sequelize.QueryTypes.INSERT
}).then(respuestaInsertarP => {
    const capturarposicion= respuestaInsertarP[respuestaInsertarP.lenght - 1];
    console.log (respuestaInsertarP);
    if(capturarposicion==0) {
        res.json ({ status:"no se ingreso pedido"});
    }else{
        const Id_Pedido = respuestaInsertarP[0];
        for (let i = 0 ; i < Productos.length; i++){
            insertarPedidoProducto(Id_Pedido,Productos[i]);

    }  
        res.json({status:"se ingreso pedido correctamente"})
    }

}).catch((error) =>{
    res.json({status:"error: " + error})})
},

mostrarPedidoDeUsuario: (req, res) => {
    const usuario = res.locals.usuario;
    sequelize.query ('select * from pedido where Id_usuario = ' + Usuario , {
    }).then(respuestaPedidoUsuario => {
        (respuestaPedidoUsuario.lenght == 0) ?respuesta.json ({status: " No hay pedido con este id "})
        :res.json(respuestaPedidoUsuario)
    }).catch ((error) => {res.json({status:"error: " + error})})

},
mostrarPedidoAdministrador: ( req,res) => {
    const Usuario = res.locals.usuario;
    sequelize.query ('select * from usuarios', {
    }).then(respuestaPedidoAdminsitrador => {
        (respuestaPedidoAdminsitrador.lenght == 0) ?respuesta.json ({status: " No hay pedidos guardados "})
        :res.json(respuestaPedidoAdminsitrador)
    }).catch ((error) => {res.json({status:"error: " + error})})

},
actualizarPedidos: (req,res) => {
    const{
        Estado,
        Id
    }=req.body;
    sequelize.query('update pedido set Estado ="' + Estado +'" where Id = ' +Id, { 
       type: sequelize.QueryTypes.Update
    }).then((resultado) => {
    res.json({ "Status": "Pedido actualizado" });
    }).catch((e) => {
    res.json({ "Status": "Error"+e });
    });
},
eliminarPedidos: (req,res) => {

    const{
       Id
    }=req.body;

sequelize.query('delete from pedido where Id = ' + Id + '', {
    type: sequelize.QueryTypes.Delete
    }).then((resultado) => {
    res.json({ "Status": "Pedido eliminado" });
    }).catch(() => {
    res.json({ "Status": "Error" });
    });
},
}



