export async function registerController (req,res,next){
    try {
        //  throw new Error('user already exist')
        console.log(user);
        
    } catch (error) {
        error.status=500
        next(error)
    }
       
}