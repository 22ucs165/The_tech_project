let username = document.querySelector('#username');
let login = document.querySelectorAll('.login');
let logout = document.querySelector('.logout');

logout.addEventListener('click',async () => {
    await fetch('./ttp/logout',{
        method:'GET',
        credentials:'same-origin'
    });
    window.location.href = './';
    getUserData();
})

let logo = document.querySelector(".nav>div:nth-child(1)>img");

logo.addEventListener("click",()=>{
    window.location.href = "./";
})

getUserData();

async function getUserData(){
    try {
        let res = await fetch('./ttp/getUserDetails');
        if(res.status == 200){
            user = await res.json()
            // console.log(user);
            username.style.display = 'block';
            username.innerText = user.name;
            for(let elem of login){
                elem.style.display = 'none';
            }
            logout.style.display = 'block'
        }
        else{
            username.style.display = 'none';
            for(let elem of login){
                elem.style.display = 'block';
            }
            logout.style.display = 'none'
        }    
    } catch (error) {
        console.log(error);
    }

}