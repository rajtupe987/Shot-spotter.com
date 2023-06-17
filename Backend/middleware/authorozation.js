
  const role=(passedRole)=>{
    return (req,res,next)=>{
        const userrole=req.role;

        if(passedRole.includes(userrole)){
            next();
        }else{
            return res.status(500).send({"msg":"You are Unauthorised"})
        }
    }
};


module.exports=role
