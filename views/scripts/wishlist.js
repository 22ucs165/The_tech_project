let url = "./ttp/wishlist";

let container = document.querySelector(".gallery");

getitems();

async function getitems(){

    let res = await fetch(url);

    if(res.status !== 200){
        alert('Something went wrong, Please Login again');
        window.location.href = './login'
    }

    res = await res.json();

    if(res.length){
        let data = [];
        
        for(let elem of res){
            let url = `./ttp/products/${elem}`;
            const res = await (await fetch(url)).json();
            console.log(res);
            data.push(res);
        }
        render(data);
    }
    else{
        container.innerHTML = "";
        let h1 = document.createElement("h1");
        h1.innerText = "Your wishlist is empty...";
        container.append(h1);
    }

}

function render(data){
    container.innerHTML = "";
    for(let elem of data){
        let div = document.createElement('div');
        let imgdiv = document.createElement('div');
        let mainimg = document.createElement('img');
        let src = elem.images[Object.keys(elem.images)[0]][0];
        mainimg.src = src;
        imgdiv.append(mainimg);
        let detaildiv = document.createElement('div');
        let title = document.createElement('h3');
        title.innerText = elem.title;
        let ram = document.createElement('h3');
        ram.innerText = `${elem.performance.RAM} RAM`
        let coloursdiv = document.createElement('div');
        coloursdiv.className = 'colours';
        let colours = Object.keys(elem.images);
        for(let color of colours){
            let div = document.createElement('div');
            let img = document.createElement('img');
            img.addEventListener('mouseenter',(event) => {
                mainimg.src = event.target.src;
            })
            img.src = elem.images[color][0];
            div.append(img);
            coloursdiv.append(div);
        }
        let button = document.createElement('button');
        button.innerText = 'View';
        button.id = elem._id;
        button.addEventListener('click',(event) => {
            localStorage.setItem('tech_project_product_id',event.target.id);
            window.location.href = './product';
        })

        let remove = document.createElement('button');
        remove.innerText = 'Remove'
        remove.id = elem._id;
        remove.addEventListener('click',(event) => {
            event.target.innerText = "Working..."
            removefromwishlist(event.target.id);
        })
        detaildiv.append(title, ram, coloursdiv, button, remove);
        div.append(imgdiv, detaildiv);
        container.append(div);
    }
}

async function removefromwishlist(id){
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
        getitems();
    } catch (error) {
        alert("Something went wrong, Please try again later");
        console.log(error);
    }
}