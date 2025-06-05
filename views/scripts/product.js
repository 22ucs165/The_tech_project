const id = document.querySelector('.main').id;

let writing = false;

const icons = {
    "apple":"https://raw.githubusercontent.com/shrvn12/tech_project_images/ea49a0fb9c42b3cf1e416256087b6887fc8bf6db/Smartphones/Apple/Icons/apple.svg",
    "asus":"https://raw.githubusercontent.com/shrvn12/tech_project_images/ea49a0fb9c42b3cf1e416256087b6887fc8bf6db/Smartphones/Asus/Icons/asus-rog.svg",
    "motorola":"https://raw.githubusercontent.com/shrvn12/tech_project_images/ea49a0fb9c42b3cf1e416256087b6887fc8bf6db/Smartphones/Motorola/Icons/Motorola.svg",
    "oppo":"https://raw.githubusercontent.com/shrvn12/tech_project_images/ea49a0fb9c42b3cf1e416256087b6887fc8bf6db/Smartphones/Oppo/Icons/Oppo_svg.svg",
    "samsung":"https://raw.githubusercontent.com/shrvn12/tech_project_images/ea49a0fb9c42b3cf1e416256087b6887fc8bf6db/Smartphones/Samsung/Icons/samsung.svg",
    "vivo":"https://raw.githubusercontent.com/shrvn12/tech_project_images/ea49a0fb9c42b3cf1e416256087b6887fc8bf6db/Smartphones/Vivo/Icons/vivo.svg",
    "xiaomi":"https://raw.githubusercontent.com/shrvn12/tech_project_images/ea49a0fb9c42b3cf1e416256087b6887fc8bf6db/Smartphones/Xiaomi/Icons/xiaomi.svg"
}

let heart = document.querySelector("#heart")
let path = document.querySelector("#path")
heart.style.fill = "#000000"
path.style.stroke = "#000000"
checkinwishlist();

heart.addEventListener("click",(event) => {
    if(heart.style.fill == "rgb(255, 0, 0)"){
        removefromwishlist();
        
    }
    else{
        addtowishlist();
    }
})

const url = `./ttp/products/${id}`;

async function getdata(url){
    try {
        let res = await fetch(url);
        res = await res.json();
        console.log(res);
        render(res);
        renderImages(res);
    } 
    catch (error) {
        console.log(error);
    }
}

getdata(url);

let container = document.querySelector('.specs');

function render(data){
    document.querySelector('#title').innerText = data.title;
    document.title = data.title
    document.querySelector('#icon').src = icons[data.brand.toLowerCase()];
    container.innerHTML = "";
    for(let key in data){
        if(key == '_id' || key == 'images' || key == 'price_range' || key == 'brand' || key == 'category' || key == 'title' || key == "__v" || key == 'family' || key == 'experiences' || key == 'colors'){
            continue;
        }
        let div = document.createElement('div');
        div.className = 'info_div';
        div.id = key;
        let titlediv = document.createElement('div');
        let p = document.createElement('p');
        p.innerText = key.split("_").join(" ");
        titlediv.append(p);
        let innerdiv = document.createElement('div');
        for(let elem in data[key]){
            let detail_div = document.createElement('div');
            let heading = document.createElement('p');
            heading.className = 'heading';
            heading.innerText = elem.split("_").join(" ");
            let detail = document.createElement('p');
            detail.className = 'detail';
            if(data[key][elem].join){
                detail.innerText = data[key][elem].join(" | ");
            }
            else if(elem == 'network_bands'){
                let text = "";
                for(let band in data[key][elem]){
                    text += `${band}: ${data[key][elem][band]} \n \n`
                }
                detail.innerText = text;
            }
            else{
                detail.innerText = data[key][elem];
            }
            detail_div.append(heading,detail);
            innerdiv.append(detail_div);
        }
        div.append(titlediv,innerdiv);
        container.append(div);
    }
}

let colors_container = document.querySelector('#device_colors');

function renderImages(data){
    let images = document.querySelector('.images');
    let main_images = document.querySelector('.main_img>div:nth-child(1)');

    let defaultcolor = Object.keys(data.images)[0];
    let selectedcolor = null;
    let colorName = document.querySelector('#color_name')
    main_images.innerHTML = '';
    images.innerHTML = '';
    for(let elem of data.images[defaultcolor]){
        let img = document.createElement('img');
        img.src = elem;
        img.id = defaultcolor;
        selectedcolor = defaultcolor;
        colorName.innerText = selectedcolor.split("_").join(" ");
        let img2 = document.createElement('img');
        img2.src = elem;
        main_images.append(img);
        images.append(img2);
    }
    colors_container.innerHTML = '';
    for(let key in data.images){
        let img = document.createElement('img');
        img.className = 'color';
        img.id = key;
        img.title = key;
        img.src = data.images[key][0];
        img.addEventListener('click',(event) => {
            selectedcolor = event.target.id
            colorName.innerText = selectedcolor.split("_").join(" ");
            for(let elem of colors_container.childNodes){
                if(elem.id == selectedcolor){
                    elem.style.border = "1px solid white";
                }
                else{
                    elem.style.border = "0px";
                }
            }
            main_images.innerHTML = '';
            images.innerHTML = '';
            for(let elem of data.images[event.target.id]){
                let img = document.createElement('img');
                img.src = elem;
                img.id = event.target.id;
                let img2 = document.createElement('img');
                img2.src = elem;
                img2.id = event.target.id;
                main_images.append(img);
                images.append(img2);
            }
            addfunctionality();
        })
        colors_container.append(img);
        for(let elem of colors_container.childNodes){
            if(elem.id == selectedcolor){
                elem.style.border = "1px solid white";
            }
            else{
                elem.style.border = "0px";
            }
        }
    }
    addfunctionality();
}

function addfunctionality(){
    let back = document.querySelector('.back');
    let front = document.querySelector('.front');
    let images = document.querySelector('.images');
    let main_images = document.querySelector('.main_img>div:nth-child(1)');
    let allimages = document.querySelectorAll('.images>img')
    let allmain_images = document.querySelectorAll('.main_img>div:nth-child(1)>img');

    var index = 0;
    allimages[index].style.borderColor = "white";
    main_images.scrollBy(0,0);

    front.addEventListener('click',() => {
        if(allimages[index+1]){
            images.scrollBy(100,0);
            removeborder(index);
            index++;
            main_images.scrollTo(index*allmain_images[0].width,0)
            addBorder(index)
        }
    })

    back.addEventListener('click',() => {
        if(allimages[index-1]){
            images.scrollBy(-100,0);
            removeborder(index);
            index--;
            main_images.scrollTo(index*allmain_images[0].width,0);
            addBorder(index);
        }
    })

    for(let x = 0; x < allimages.length; x++){
        allimages[x].addEventListener('click', () => {
            removeborder(index)
            index = x;
            addBorder(index)
            images.scrollTo((index+(index*0.2))*allimages[0].width,0);
            main_images.scrollTo(index*allmain_images[0].width,0);
        })
    }

    function removeborder(index){
        allimages[index].style.borderColor = "transparent";
    }

    function addBorder(index){
        allimages[index].style.borderColor = "white";
    }
}

async function checkinwishlist(){
        let res = await fetch("./ttp/wishlist")
    
        if(res.status == 200){
            res = await res.json();
        
            console.log(res);
        
            if(res.includes(id)){
                heart.style.fill = "#ff0000"
                path.style.stroke = "#ff0000"
            }
            else{
                heart.style.fill = "#ffffff"
                path.style.stroke = "#ffffff"
            }
        }
        else{
            heart.style.fill = "#ffffff"
            path.style.stroke = "#ffffff"
        }
}

async function addtowishlist(){
    try {
        const url = `./ttp/addtowishlist/${id}`
        let response = await fetch(url,{
            method:"PATCH",
            headers:{
                "content-type":"application/json",
            }
        })

        response = await response.json();
        console.log(response);
        heart.style.fill = "#ff0000"
        path.style.stroke = "#ff0000"
    } catch (error) {
        alert("Try logging in again");
        console.log(error);
    }
}

async function removefromwishlist(){
    try {
        const url = `./ttp/removefromwishlist/${id}`
        let response = await fetch(url,{
            method:"DELETE",
            headers:{
                "content-type":"application/json",
            }
        })

        response = await response.json();
        console.log(response);
        heart.style.fill = "#ffffff";
        path.style.stroke = "#ffffff";
    } catch (error) {
        alert("Try logging in again");
        console.log(error);
    }
}

function write(text, component){
    if(!component.innerText || writing){
        return;
    }
    let prev_text = component.innerText;
    const erase = setInterval(() => {
        component.innerText = component.innerText.substring(0, component.substring.length-1);
        if(!component.innerText.length){
            clearInterval(erase);
            
        }
    }, 100)
}

/*
wishlistbutton.addEventListener("click",async ()=>{
    if(wishlistbutton.innerText == "Add to wishlist"){

        try {
            const url = `./ttp/addtowishlist/${res._id}`
            let response = await fetch(url,{
                method:"PATCH",
                headers:{
                    "content-type":"application/json",
                    "authorization": cur_user.token
                }
            })

            response = await response.json();

            if(response.msg == "added to wishlist"){
                wishlistbutton.innerText = "Remove from wishlist";
            }

            alert(response.msg);
        } catch (error) {
            alert("Try logging in again");
            console.log(error);
        }

    }
    else{
        
        try {
            const url = `./ttp/removefromwishlist/${res._id}`
            let response = await fetch(url,{
                method:"DELETE",
                headers:{
                    "content-type":"application/json",
                    "authorization": cur_user.token
                }
            })

            response = await response.json();

            wishlistbutton.innerText = "Add to wishlist";

            console.log(response);

            alert(response.msg);
        } catch (error) {
            alert("Try logging in again");
            console.log(error);
        }

    }
    
})
*/