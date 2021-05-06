const express = require('express');

const app = express();
app.use(express.json());
const PORT = 4454;

const swaggerUI=require ("swagger-ui-express")
const swaggerDocument=require("./swagger.json");
app.use('/documentacion-api',swaggerUI.serve,swaggerUI.setup(swaggerDocument))




const {insertarUsuarios,validarUsuarioContraseña,mostrarUsuarios} = require('./clientes');
const{insertarProductos,mostrarProductos,actualizarProductos,borrarProductos} =require('./productos');
const{insertarPedidos,actualizarPedidos,eliminarPedidos} = require ('./pedidos');
const {ValidarDatosIngresados,ValidarDatosDeSesion,validarPermisos} = require('./validaciones');



//clientes//
app.post('/usuario',ValidarDatosIngresados,insertarUsuarios);
app.post ('/ingresar-sesion',ValidarDatosDeSesion,validarUsuarioContraseña);
app.get ('/mostrarUsuarios',validarPermisos,mostrarUsuarios);


//producto//
app.post('/insertarProductos',validarPermisos,insertarProductos);  
app.put('/actualizarProductos',validarPermisos,actualizarProductos);
app.delete('/eliminarProducto',validarPermisos,borrarProductos);
app.get('/mostrarProductos',validarPermisos,mostrarProductos);

//Pedido//
app.post('/insertarPedidos',insertarPedidos);
app.get ('/mostrarPedido',validarPermisos);
app.put ('/actualizarPedidos',validarPermisos,actualizarPedidos);
app.delete('/eliminarPedidos',validarPermisos,eliminarPedidos);



app.listen(PORT,()=>console.log("servidor funcionando " + PORT));