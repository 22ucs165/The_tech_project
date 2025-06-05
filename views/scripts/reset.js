document.querySelector(".reset_form").addEventListener("submit",async(event)=>{
    event.preventDefault();
    let pswd = document.querySelector("#pswd").value;
    let conf_pswd = document.querySelector("#conf_pswd").value;

    if(pswd !== conf_pswd){
        return alert("Passwords do not match");
    }

    const payload = {
        email: localStorage.getItem("verification_email"),
        new_password : pswd
    }

    console.log(payload);

    let prev_text = document.querySelector('.reset_form>button').innerText;
    document.querySelector('.reset_form>button').innerText = 'working...'


    let res = await fetch("./ttp/resetpswd",{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(payload)
    })

    if(res.status !== 200){
        res = await(res.json());
        return alert(res.msg);
    }
    res = await(res.json());

    document.querySelector('.reset_form>button').innerText = prev_text

    alert(res.msg);

    if(res.msg == "successfully updated the password"){
        window.location.href = "./login"
    }
})