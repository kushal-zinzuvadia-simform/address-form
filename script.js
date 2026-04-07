let checkBox = document.getElementById("sameAddress");

// Forms
let presentAddress = document.getElementById("present-address");
let permanentAddress = document.getElementById("permanent-address");


// Inputs
let presentStreet = document.getElementById("street");
let permanentStreet = document.getElementById("street-permanent");

let presentCity = document.getElementById("city");
let permanentCity = document.getElementById("city-permanent");

let presentState = document.getElementById("state");
let permanentState = document.getElementById("state-permanent");

let presentPincode = document.getElementById("pincode");
let permanentPincode = document.getElementById("pincode-permanent");

checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
        permanentStreet.value = presentStreet.value;
        permanentStreet.readOnly = true;

        permanentCity.value = presentCity.value;
        permanentCity.readOnly = true;

        permanentState.value = presentState.value;
        permanentState.readOnly = true;

        permanentPincode.value = presentPincode.value;
        permanentPincode.readOnly = true;
    } else {
        permanentStreet.readOnly = false;
        permanentCity.readOnly = false;
        permanentState.readOnly = false;
        permanentPincode.readOnly = false;
    }
});


