let email = document.querySelector("#email");
let password = document.querySelector("#password");
let button = document.querySelector('button')
const prev_text = button.innerText;

email.addEventListener('input',() => {
    const elements = email.value.split("");
    if((!elements.includes('@') || !elements.includes('.')) && elements.length){
        button.style.color = 'lightcoral';
        button.innerText = 'Invalid Email';
        button.disabled = true;
    }
    else{
        button.style.color = 'white';
        button.innerText = prev_text;
        button.disabled = false;
    }
})

password.addEventListener('input',() => {
    if(password.value.length < 5 && password.value.length){
       button.style.color = 'lightcoral';
       button.innerText = 'Password too short';
       button.disabled = true;
   }
   else{
       button.style.color = 'white';
       button.innerText = prev_text;
       button.disabled = false;
   }
})

document.querySelector(".login_form").addEventListener("submit",(event)=>{
    event.preventDefault();

    button.innerText = 'Working...'

    let payload = {
        email: email.value,
        password: password.value
    }

    let url = "./ttp/login";

    login(url);

    async function login(url){
        let res = await fetch(url,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(payload)
        })

        res = await res.json();

        const cur_user = {
            name: res.name,
            token: res.token
        }

        localStorage.setItem("cur_user",JSON.stringify(cur_user));

        button.innerText = prev_text;

        alert(res.msg);

        if(res.logged_in){
            window.location.href = "./";
        }

    }
})

document.querySelector('.back_button').addEventListener('click',() => {
    window.history.back();
})