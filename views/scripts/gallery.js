let cross = document.querySelector('#filter_toggle>img');
let filterdiv = document.querySelector('.filter');
filterdiv.style.display = 'none';
cross.addEventListener('click',() => {
    if(filterdiv.style.display == 'none'){
        cross.style.transform = 'rotate(0deg)';
        filterdiv.style.display = 'flex';
    }
    else{
        cross.style.transform = 'rotate(45deg)';
        filterdiv.style.display = 'none';
    }
})

// ====================================================================================================================

const url = "./ttp/products";
let filters = JSON.parse(localStorage.getItem('tech_project_filters')) || {};
let brandsCheckbox = document.querySelectorAll('#brands input[type=checkbox]');
const series = {
    "samsung":["Galaxy A","Galaxy F", "Galaxy M", "Galaxy S", "Galaxy Z"],
    "oppo":["Find N", "Find X", "Reno", "F Series", "A Series", "K Series"],
    "vivo":["X Series", "V Series", "Y Series", "T Series"],
    "xiaomi":["Xiaomi", "Redmi"],
    "motorola":["Moto G", "Moto E","Moto Edge","Razr"]
}
const container = document.querySelector('.gallery');

renderBrandsseries(filters);

const checkbox = document.querySelectorAll('.filter input[type=checkbox]');
for(let elem of checkbox){
    if(filters[elem.className] && (filters[elem.className] == elem.value || filters[elem.className].includes(elem.value))){
        elem.checked = true;
    }
}

filterdata(url, filters);
addfilterevent();
renderBrandsseries(filters);

async function filterdata(url,filters){
    localStorage.setItem('tech_project_filters',JSON.stringify(filters || {}));
    console.log(filters);
    try {
        let res = await fetch(url);
        res = await res.json();
        // console.log(res);
        if(filters.brand){
            res = res.filter(elem => filters.brand.includes(elem.brand.toLowerCase()));
        }
        if(filters.ram){
            res = res.filter(elem => {
                for(let value of filters.ram){
                    if(elem.performance.RAM.includes(value)){
                        return elem
                    };
                }
            })
        }
        if(filters.storage){
            res = res.filter(elem => {
                for(let value of filters.storage){
                    if(elem.performance.storage.includes(value)){
                        return elem
                    };
                }
            })
        }
        if(filters.series){
            res = res.filter(elem => {
                for(let value of filters.series){
                    if(!value.length || elem.family == value){
                        return elem
                    };
                }
            })
        }
        if(filters.sort){
            res = res.sort((a,b) => {
                return 
            })
        }
        // console.log(filters);
        // console.log(res);
        render(res);
    } 
    catch (error) {
        console.log(error);
    }
}

function render(data){
    container.innerHTML = "";
    if(!data.length){
        let h1 = document.createElement('h1');
        h1.innerText = 'No products found...'
        container.append(h1);
    }
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
            window.location.href = `./Product?id=${event.target.id}`;
        })
        detaildiv.append(title, ram, coloursdiv, button);
        // console.log(detaildiv, imgdiv);
        div.append(imgdiv, detaildiv);
        container.append(div);
    }
}

function applyFilter(elemclass){
    const checkbox = document.querySelectorAll('.filter input[type=checkbox]');
    let filters = {};
    for(let elem of checkbox){
        if(elem.checked){
            if(filters[elem.className] === undefined){
                filters[elem.className] = []
            }
            filters[elem.className].push(elem.value);
        }
    }
    
    filterdata(url, filters);
    if(elemclass == 'brand'){
        renderBrandsseries(filters);
    }
}

function load(){
    let h1 = document.createElement('h1');
    h1.innerText = 'Loading...'
    container.innerHTML = "";
    container.append(h1);
}

function addfilterevent(){
    const checkbox = document.querySelectorAll('.filter input[type=checkbox]');

    for(let elem of checkbox){
        elem.removeEventListener('change',() => {
            load();
            applyFilter();
        })
        elem.addEventListener('change',(event) => {
            load();
            applyFilter(event.target.className);
        })
    }
}

function renderBrandsseries(filters){
    let seriesdiv = document.querySelector('#series');
    let seriesbox = document.querySelectorAll('#series input[type=checkbox]');
    if(filters.brand && filters.brand.length > 1){
        for(let elem of seriesbox){
            elem.disabled = true;
        }
    }
    else if(filters.brand && filters.brand.length == 1 && filters.brand[0] !== 'apple'){
        for(let elem of seriesbox){
            elem.disabled = false;
        }
        seriesdiv.innerHTML = '';
        let h3 = document.createElement('h3');
        h3.innerText = 'Series';
        seriesdiv.append(h3);
        for(let elem of series[filters.brand[0]]){
            let input = document.createElement('input');
            input.type = 'checkbox';
            input.className = 'series';
            input.value = elem;
            input.addEventListener('change',() => {
                load();
                applyFilter();
            })
            let p = document.createElement('p');
            p.innerText = elem;
            let br = document.createElement('br');
            seriesdiv.append(input,p,br);
        }
    }
}