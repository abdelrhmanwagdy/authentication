
/**
 * @param   {} infoValidator
 * @return  array of errors
 * @desc    validate inputs 
 */
infoValidatorForRegister =  (infoValidator) => {
    let errors = []
    validators.validateName(infoValidator.name)
        ? true
        : (errors.push("Name not validated"));
    validators.validateLoginField(infoValidator.loginField)
        ? true
        : (errors.push("Login field not validated"));
    validators.validatePassword(infoValidator.password)
        ? true
        : (errors.push("Password not validated"));
    return errors;
}

/**
 * @param   {} infoValidator
 * @return  array of errors
 * @desc    validate inputs 
 */
infoValidatorForLogin =  (infoValidator) => {
    let errors = []
    validators.validateLoginField(infoValidator.loginField)
        ? true
        : (errors.push("Login field not validated"));
    validators.validatePassword(infoValidator.password)
        ? true
        : (errors.push("Password not validated"));
    return errors;
}

module.exports = { infoValidatorForRegister, infoValidatorForLogin };