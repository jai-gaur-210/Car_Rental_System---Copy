import JWT from "jsonwebtoken"
//Protected Routes from token base
export const requireSignin=async (req,res,next)=>{
    try {
        const decode=JWT.verify(req.headers.authorization,'Team210');
        req.user=decode;
        next();
    } catch (error) {
        console.log(error)
    }

}