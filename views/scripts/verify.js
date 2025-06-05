const inputs = document.querySelectorAll('.otp>div>input');

console.log(inputs[0]);

for(let x = 0; x < inputs.length; x++){
    inputs[x].addEventListener('input',() => {
        if(inputs[x+1]){
            inputs[x+1].focus();
        }
        if(inputs[x].value.length > 1){
            inputs[x].value = inputs[x].value[inputs[x].value.length-1]
        }
    })
}

document.querySelector(".email").addEventListener("submit",async (event)=>{
    event.preventDefault();
    const email = document.querySelector("#email").value;
    localStorage.setItem("verification_email",email);
    const payload = {
        email
    }

    let prev_text = document.querySelector(".email>button").innerText;
    document.querySelector(".email>button").innerText = "Working..."
    let res = await fetch("./ttp/getcode",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(payload)
    })

    res = await(res.json());

    document.querySelector(".email>button").innerText = prev_text

    alert(res.msg);
})

document.querySelector(".otp").addEventListener("submit",async (event)=>{
    event.preventDefault();
    const email = localStorage.getItem("verification_email");
    let code = [];
    for(let elem of inputs){
        code.push(elem.value);
    }

    code = code.join("");

    const payload = {
        email,
        code
    }

    console.log(payload);

    let prevtext = document.querySelector(".otp>button").innerText;
    document.querySelector(".otp>button").innerText = "Working..."

    let res = await fetch("./ttp/verifycode",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(payload),
        credentials:'same-origin'
    })

    res = await(res.json());

    document.querySelector(".otp>button").innerText = prevtext

    alert(res.msg);

    if(res.msg == "verification successful"){
        window.location.href = "./reset_pswd"
    }

})

document.querySelector('.back_button').addEventListener('click',() => {
    window.history.back();
})