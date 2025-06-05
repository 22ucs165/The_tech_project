const validate = (arr)=>{
    return (req,res,next)=>{
        const data = req.body
        for(let elem of arr){
            if(!data[elem]){
                res.send({msg:`please provide ${elem}`})
                return;
            }

            if(elem == "email"){
                if(!email(data.email)){
                    res.send({msg:"please enter valid email"});
                    return;
                }
            }

            if(elem == "password"){
                if(!password(data.password)){
                    res.send({msg:"password should be of minimum 5 characters"})
                    return;
                }
            }

            if(elem == "first_name"){
                if(!name(data.name)){
                    res.send({msg:"please provide first_name"});
                    return;
                }
            }

        }

        next();
    }
}

function email(data){
    let response = true;
    data = data.split("");
    // console.log(data);
    if(!data.includes("@") || !data.includes(".")){
        response = false;
    }
    return response;
}

function password(data){
    let response = true;
    if(data.length < 5){
        response = false;
    }
    return response;
}

function name(data){
    let response = true;
    if(data.length === 0){
        response = false;
    }
    return response;
}

module.exports = {
    validate
}