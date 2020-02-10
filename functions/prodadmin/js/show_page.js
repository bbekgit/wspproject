function show_page() {
    show_page_secured()
}
 
let products; // list of products read from db
 
async function show_page_secured() {
    glPageContent.innerHTML = '<h1>Show Products</h1>'
    glPageContent.innerHTML += `
        <a href='/home' class="btn btn-outline-primary">Home</a>    
        <a href='/add' class="btn btn-outline-primary">Add A Product</a>
        <br>
        <br>
    `;
 
    try {
        products = []
        const snapshot = await firebase.firestore().collection(COLLECTION).get()
        snapshot.forEach(doc => {
            const {name, summary, price, image, image_url} = doc.data()
            const p = {docId: doc.id, name, summary, price, image, image_url}
            products.push(p)
        })
    } catch (e) {
        glPageContent.innerHTML = 'Firestore access error. Try again later!<br>' + e
        return 
    }
 
    // console.log(products)
 
    if (products.length == 0) {
        glPageContent += '<h1>No product in the database</h1>'
        return
    }
 
    for (let index = 0; index < products.length; index++) {
        const p = products[index]
        glPageContent.innerHTML += `
        <div id="${p.docId}"class="card" style="width: 18rem; display: inline-block">
            <img src="${p.image_url}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">${p.price}<br/>${p.summary}</p>
            </div>
        </div>
        `;
    }
}
