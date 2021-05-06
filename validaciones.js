const {validarUsuarios,mostrarUsuarios,mostrarUsuariosRegistrados} = require('./clientes');
const{ValidarProductos } =require('./productos');
const {descodificar} = require('./token');
const{mostrarPedidoDeUsuario,mostrarPedidoAdministrador} = require ('./pedidos');

module.exports ={
    ValidarDatosIngresados:(req,res,next) => {
        
        const{
            Usuario,
            NombreCompleto,
            Estado,
            Direccion,
            Correo,
            Contraseña,
            Celular
        }=req.body;
        if (Usuario!=""&&NombreCompleto!=""&&Estado!=""&&Direccion!=""&&Correo!=""&&Contraseña!=""&&Celular!=""){
            next()   
        } else {
            res.json({ "Status": "ingresar datos" });
        }
    },
    ValidarDatosDeSesion: (req,res,next) =>{
        const{
            Usuario,
            Contraseña
        }=req.body;
        if (Usuario!=""&&Contraseña!=""){
            next()   
        } else {
            res.json({ "Status": "ingresar datos" });
        }
    },
    
    validarPermisos: async (req,res,next) => {
    
        const token = req.headers.autenticacion;
    
        if (!token) {
            res.json({status: "token invalido"})
        }
        else{
            const Usuario = descodificar(token);
            console.log(Usuario)
            if (!Usuario){
               return res.json({estado: "No tienes Acesso"})
            }
            else {
                const {
                    Id,
                    Rol
                } = Usuario;
            
               if(  Rol == "admin"){
                switch (req.path) {
            case 'insertar-productos':
            const {
                Nombre_producto
            } = req.body;
          
            await ValidarProductos(Nombre_producto)
            .then (respuestavalidar => {
                if (respuestavalidar.length == 0){
                    next ();
                }else{
                    res.json({status:"El nombre del producto ya esta registrado"})
                }
            }).catch((error) => {
                res.json ({
                status:"error: " + error }) 
            })
                break; 
            case '/mostrarPedido':
                mostrarPedidoAdministrador(req,res);
                break;
                
            case'/mostrarUsuarios':
                mostrarUsuarios(req,res);
                break;
        
                default:next();
                break;
            }
        } else {
           /*"usuarios"*/
           switch (req.path){
               case '/mostrarProductos':
                   next();
                   break;
    
               case '/insertarPedidos':
                next ();
                break;
                
                case '/mostrarUsuarios':
                    console.log("-->" + Id)
                    res.locals.usuario = Id;
                    mostrarUsuariosRegistrados(req,res)
                    break;
    
    
                    case'/mostrarPedido':
                    res.locals.usuario = Id;
                    console.log(Usuario)
                    mostrarPedidoDeUsuario(req,res)
                    break;
                    
                    default: res.json ({status: "No tienes Acceso"})
                    break;
           }
        }
        }
    }
    },
    }
