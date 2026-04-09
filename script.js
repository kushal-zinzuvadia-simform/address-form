let checkBox = document.getElementById("sameAddress");

let presentFields = document.querySelectorAll(".present-field");
let permanentFields = document.querySelectorAll(".permanent-field");

const allFields = Array.from(document.querySelectorAll(".present-field, .permanent-field"));

const fieldConfigs = allFields.map((field) => {
    const errorElement = document.getElementById(`${field.id}-error`);
    return {
        input: field,
        error: errorElement,
        type: field.id.includes("pincode") ? "pincode" : "text",
    };
});

const findConfig = (input) => fieldConfigs.find((config) => config.input === input);

const setError = (errorElement, message) => {
    errorElement.textContent = message;
};

const clearError = (errorElement) => {
    errorElement.textContent = "";
};

const validateTextField = (fieldConfig) => {
    const value = fieldConfig.input.value.trim();

    if (!value) {
        setError(fieldConfig.error, "Required");
        return false;
    }

    clearError(fieldConfig.error);
    return true;
};

const validatePincodeField = (fieldConfig) => {
    const value = fieldConfig.input.value.trim();

    if (!value) {
        setError(fieldConfig.error, "Required");
        return false;
    }

    if (!/^\d{6}$/.test(value)) {
        setError(fieldConfig.error, "Pin code must be 6 digits");
        return false;
    }

    clearError(fieldConfig.error);
    return true;
};

const validateField = (fieldConfig) => {
    if (fieldConfig.type === "pincode") {
        return validatePincodeField(fieldConfig);
    }
    return validateTextField(fieldConfig);
};

const validateAllFields = () => {
    let valid = true;

    fieldConfigs.forEach((fieldConfig) => {
        if (!fieldConfig.input.disabled) {
            const fieldIsValid = validateField(fieldConfig);
            if (!fieldIsValid) {
                valid = false;
            }
        } else {
            clearError(fieldConfig.error);
        }
    });

    return valid;
};

let copyValues = (destination, source) => {
    for (let i = 0; i < destination.length; i++) {
        destination[i].value = source[i].value;
    }
};

let setDisabled = (fields, state) => {
    for (const field of fields) {
        field.disabled = state;
    }
};

const syncPermanentAddress = () => {
    copyValues(permanentFields, presentFields);
    fieldConfigs.forEach((config) => {
        if (config.input.disabled) {
            clearError(config.error);
        }
    });
};

checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
        syncPermanentAddress();
        setDisabled(permanentFields, true);
    } else {
        setDisabled(permanentFields, false);
        validateAllFields();
    }
});

presentFields.forEach((field) => {
    field.addEventListener("input", () => {
        const config = findConfig(field);
        if (config) {
            validateField(config);
        }

        if (checkBox.checked) {
            syncPermanentAddress();
        }
    });
});

permanentFields.forEach((field) => {
    field.addEventListener("input", () => {
        const config = findConfig(field);
        if (config) {
            validateField(config);
        }
    });
});

validateAllFields();