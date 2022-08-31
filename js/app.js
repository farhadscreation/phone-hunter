const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch (url);
    const data = await res.json();
    displayPhones(data.data)
}

// এখানে আমরা ফর ইস ব্যবহার করে ফোন এর ইনফরমেশন গুলো ডম এর সাথে কানেক্ট করে ডাইনামিক করেছি। 
const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerText = '';
    // display 20 phone only
    phones = phones.slice(0, 20)
    // display no phone found
    const noPhone = document.getElementById('no-phone-found')
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none')
    }
    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
    <div class="col">
        <div class="card p-3">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <h5>Brand: ${phone.brand}</h5>
        <h6 class="card-text">Slug: ${phone.slug}</h6>
        </div>
        </div>
    </div>
        `;
        phonesContainer.appendChild(phoneDiv)
    });
    // stop loader
    toggleSpinner(false)
}

// এবারে আমরা সার্চ ফাংশন করব।
// get phone button
// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    toggleSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);

})

// loader function
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('search-loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

// loadPhones();