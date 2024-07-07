const BASE_URL = "https://6612a16153b0d5d80f660be4.mockapi.io";

const formLicensePlate = document.getElementById("license-plate");
const formRepairDate = document.getElementById("repair-date");
const formCustomerName = document.getElementById("customer-name");
const formCatalog = document.getElementById("catalog");
const formCarMaker = document.getElementById("car-maker");
const form = document.getElementById("car-create-form");

form.addEventListener("submit", async function(e){
    e.preventDefault();
    await create();
    this.reset();
});


async function create() {
    const response = await fetch(`${BASE_URL}/api/v1/cars`, {
        method: "POST",
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


