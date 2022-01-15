export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        const passwordRegExp = /[A-Z]+/g;
        const digitRegExp = /\d+/g;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isEmail":
                statusValidate = !emailRegExp.test(data);
                break;
            case "isCapitalSymbol":
                statusValidate = !passwordRegExp.test(data);
                break;
            case "isContainDigit":
                statusValidate = !digitRegExp.test(data);
                break;
            case "min":
                statusValidate = data.length < config.value;
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
