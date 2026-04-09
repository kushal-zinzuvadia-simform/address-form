let checkBox = document.getElementById("sameAddress");

// Forms
let presentAddress = document.getElementById("present-address");
let permanentAddress = document.getElementById("permanent-address");

// Inputs
let presentFields = document.querySelectorAll(".present-field");
let permanentFields = document.querySelectorAll(".permanent-field");

let copyValues = (destination, source) => {
    for (let i = 0; i < destination.length; i++) {
        destination[i].value = source[i].value;
    }
};

let setReadOnly = (fields, state) => {
    for (const field of fields) {
        field.readOnly = state;
    }
};

checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
        copyValues(permanentFields, presentFields);
        setReadOnly(permanentFields, true);
    } else {
        setReadOnly(permanentFields, false);
    }
});

presentAddress.addEventListener("input", () => {
    if (checkBox.checked) {
        copyValues(permanentFields, presentFields);
    }
})
