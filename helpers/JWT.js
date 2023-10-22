const JWT = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload ={uid, name};
        JWT.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '2h'
        }, (err, token)=>{
            if (err) {
                console.log(err);
                reject('No JWT token generated');
            }else{
                resolve(token);
            }
        })
    })
};

module.exports ={
    generateJWT
}