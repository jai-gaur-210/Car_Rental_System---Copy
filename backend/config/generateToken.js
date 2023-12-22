import jwt from 'jsonwebtoken'

const generateToken = async(id)=>{
    try {
        const token=jwt.sign({_id:id},'Team210',{expiresIn:"1h"});
        return token;
    } catch (error) {
        console.log(error);
    }
}
export default generateToken
