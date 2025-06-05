document.querySelector('#Oppo button').addEventListener('click',() => {
    window.location.href = './Oppo'
})

document.querySelector('#Samsung button').addEventListener('click',() => {
    window.location.href = './Samsung'
})

document.querySelector('#Xiaomi button').addEventListener('click',() => {
    window.location.href = './Xiaomi'
})

document.querySelector('#Vivo button').addEventListener('click',() => {
    window.location.href = './Vivo'
})

document.querySelector('#Motorola button').addEventListener('click',() => {
    window.location.href = './Motorola'
})

function redirect(id){
    localStorage.setItem('tech_project_product_id',id);
    window.location.href = `./Product?id=${id}`
}