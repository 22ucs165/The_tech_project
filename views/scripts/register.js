const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirm_password = document.querySelector("#confirm_password");
const button = document.querySelector('.submit')
const prev_text = button.value;

/*
var insert = true;
var remove = true;

async function change(text){
    if(button.value){
        if(!remove){
            return;
        }
        insert = false;
        setTimeout(() => {
            // console.log(button.value);
            button.value = button.value.slice(0,-1);
            change(text);
        },50)
    }
    else{
        insert = true;
        write(text);
    }
}

async function write(text){
    if(!insert){
        return;
    }
    remove = false;
    text = text.split("");
    if(text.length){
        setTimeout(() => {
            // console.log(value);
            button.value += text.shift();
            write(text.join(""));
        },50);
    }
}
*/

username.addEventListener('input',() => {

    if(username.value.length < 3 && username.value.length){
        button.style.color = 'lightcoral';
        button.value = 'Username too short';
        // remove = true;
        // change('Username too short');
        button.disabled = true;
    }
    else{
        button.style.color = 'white';
        button.value = prev_text;
        // remove = true;
        // change(prev_text);
        button.disabled = false;
    }
})

email.addEventListener('input',() => {
    const elements = email.value.split("");
    if((!elements.includes('@') || !elements.includes('.')) && elements.length){
        button.style.color = 'lightcoral';
        button.value = 'Invalid Email';
        // change('Invalid_Email');
        button.disabled = true;
    }
    else{
        button.style.color = 'white';
        button.value = prev_text;
        // change(prev_text);
        button.disabled = false;
    }
})

password.addEventListener('input',() => {
     if(password.value.length < 5 && password.value.length){
        button.style.color = 'lightcoral';
        button.value = 'Password too short';
        // change('Password_too_short');
        button.disabled = true;
    }
    else{
        button.style.color = 'white';
        button.value = prev_text;
        // change(prev_text);
        button.disabled = false;
    }
})

confirm_password.addEventListener('input',() => {
     if(confirm_password.value !== password.value && confirm_password.value.length){
        button.style.color = 'lightcoral';
        button.value = 'Passwords do not match';
        // change("Passwords_do_not_match");
        button.disabled = true;
    }
    else{
        button.style.color = 'white';
        button.value = prev_text;
        // change(prev_text);
        button.disabled = false;
    }
})

document.querySelector(".registration_form").addEventListener("submit",(event)=>{
    event.preventDefault();

    button.value = 'Working...'

    let url = "./ttp/register"

    let payload = {
        name : username.value,
        email : email.value,
        password : password.value
    }

    register(url);

    async function register(url){
        let res = await fetch(url,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(payload)
        })

        res = await res.json()

        button.value = prev_text;

        alert(res.msg);

        if(res.registered){
            let url = "./ttp/login";

            const loginpayload = {
                email:email.value,
                password:password.value
            }
            console.log(loginpayload);

            await login(url);
        
            async function login(url){
                let res = await fetch(url,{
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body: JSON.stringify(loginpayload)
                })
        
                res = await res.json();

                console.log(res);

                const cur_user = {
                    name: username.value,
                    token: res.token
                }
        
                localStorage.setItem("cur_user",JSON.stringify(cur_user));
        
            }
            window.location.href = "./"
        }
    }
})

document.querySelector('.back_button').addEventListener('click',() => {
    window.history.back();
})