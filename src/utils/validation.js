const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validate = (data) => {
    const errors = {};

    for (const name in data) {
        const error = validateField(name, data[name], data);

        if (error) {
            errors[name] = error;
        }
    }

    return errors;
};

export const validateField = (name, value, data) => {
    switch (name) {
        case "name":
            if (!value.trim()) {
                return "Enter name";
            }
            break;

        case "email":
            if (!value.trim()) {
                return "Enter email";
            }
            if (!emailRegex.test(value)) {
                return "Invalid email";
            }
            break;

        case "password":
            if (!value.trim()) {
                return "Enter password";
            } else if (value.length < 6) {
                return "The password must contain at least 6 characters";
            }
            break;

        case "confirmPassword":
            if (!value.trim()) {
                return "Confirm password";
            }

            if (data.password !== value) {
                return "Passwords do not match";
            }

            break;

        default:
            break;
    }
};
