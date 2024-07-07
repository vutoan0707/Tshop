const BASE_URL = "https://6612a16153b0d5d80f660be4.mockapi.io";

const formId = document.getElementById("id");
const formLicensePlate = document.getElementById("license-plate");
const formRepairDate = document.getElementById("repair-date");
const formCustomerName = document.getElementById("customer-name");
const formCatalog = document.getElementById("catalog");
const formCarMaker = document.getElementById("car-maker");
const form = document.getElementById("car-update-form");
const tbody = document.getElementById("cars");
const loading = document.getElementById("loading");

form.addEventListener("submit", async function(e){
    e.preventDefault();
    await update();
    findAll();
    this.reset();
});

findAll();

async function findAll() {
    showLoading();
    const response = await fetch(`${BASE_URL}/api/v1/cars`, {
        method: "GET",
        headers: {
            "Conttent-Type": "application/json"
        }
    });
    const body = await response.json();
    console.log(body);

    showAllCars(body);
    hideLoading();
}

async function showAllCars(cars) {
    tbody.innerHTML = "";
    for (const car of cars) {
        const row = tbody.insertRow();

        const licensePlate = document.createTextNode(car.licensePlate);
        row.insertCell().appendChild(licensePlate); 

        const repairDate = car.repairDate;
        row.insertCell().innerText = repairDate;

        const customerName = car.customerName;
        row.insertCell().innerText = customerName;

        const catalog = car.catalog;
        row.insertCell().innerText = catalog;

        const carMaker = car.carMaker;
        row.insertCell().innerText = carMaker;

        const btnEdit = document.createElement("button");
        btnEdit.innerText = "⚙";
        btnEdit.addEventListener("click", function() {
            formId.value = car.id;
            formLicensePlate.value = car.licensePlate;
            formRepairDate.value = car.repairDate;
            formCustomerName.value = car.customerName;
            formCatalog.value = car.catalog;
            formCarMaker.value = car.carMaker;
        });
        const btnDelete = document.createElement("button");
        btnDelete.innerText = "🗑";
        btnDelete.addEventListener("click", async function() {
            const confirmed = confirm("Do you want to delete this car?");
            if(confirmed) {
                showLoading();
                await deleteById(car.id);
                tbody.removeChild(row);
                hideLoading();
            }
        });
        row.insertCell().append(btnEdit, btnDelete);
    }
}

async function update() {
    const id = formId.value;
    const response = await fetch(`${BASE_URL}/api/v1/cars/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            licensePlate: formLicensePlate.value,
            repairDate: formRepairDate.value,
            customerName: formCustomerName.value,
            catalog: formCatalog.value,
            carMaker: formCarMaker.value
        })
    });
    const body = await response.json();
    console.log(body);
}

async function deleteById (id) {
    const response = await fetch(`${BASE_URL}/api/v1/cars/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const body = await response.json();
    console.log(body);
}

function showLoading() {
    loading.style.display = "flex";
}

function hideLoading() {
    setTimeout(function () {
        loading.style.display = "none";
    }), Math.random() * 2000;
}    

