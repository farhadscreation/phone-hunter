const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch (url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

// এখানে আমরা ফর ইস ব্যবহার করে ফোন এর ইনফরমেশন গুলো ডম এর সাথে কানেক্ট করে ডাইনামিক করেছি। 
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerText = '';
    // display 10 phone only
    const loadMore = document.getElementById('load-more');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10)
        loadMore.classList.remove('d-none'); 
    }

    else{
        loadMore.classList.add('d-none')
    }
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
        <!-- Button trigger modal -->
        <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#phoneDataDetails">Show Details</Button>
        </div>
        </div>
    </div>
        `;
        phonesContainer.appendChild(phoneDiv)
    });
    // stop loader
    toggleSpinner(false)
}

const processSearch = (dataLimit) =>{ 
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// এবারে আমরা সার্চ ফাংশন করব।
// get phone button
// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
})

// search input field in enter key 
document.getElementById('search-field').addEventListener('keypress', function(e){

    if (e.key === 'Enter'){
        processSearch(10);
    }
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

// create load more system 
document.getElementById('btn-load-more').addEventListener('click', function(){
    processSearch();
})

// load the modal for phone details

const loadPhoneDetails = async id =>{ 
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}


// modal phone details 
const displayPhoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDataDetailsLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <h6>Name: ${phone.name}</h6>
        <p class="p-0 m-0">Release Date: ${phone.releaseDate ? phone.releaseDate : 'Not available'}</p>
        <p class="p-0 m-0">Bluetooth: ${phone.others ? phone.others.Bluetooth : 'Not available'}</p>
        <p>Sensor: ${phone.mainFeatures ? phone.mainFeatures.sensors [0] : 'Not available'}</p>
    
    `;
}


loadPhones('apple');