const jsonWebToken = require('jsonwebtoken');
const myJWTSecretKey = 'my_clave_secreta';

module.exports ={

    descodificar: (token) => {
        const TokenDecodeData = jsonWebToken.verify(token,myJWTSecretKey,function(error,dato){
            if (dato){
                return dato;
            }
            else{
                return error.message;
            }
           
    
        });
     return TokenDecodeData;
    
    },
    
    codificar:( Usuario, Contraseña, Rol, Id) =>{
        const payload = {
            "Usuario": Usuario,
            "Contraseña":  Contraseña,
            "Rol": Rol,
            "Id" : Id
        } 
        const token = jsonWebToken.sign(payload, myJWTSecretKey);
        return token;
    },
    }