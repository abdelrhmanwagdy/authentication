const qurbastatics = require ('qurbastatics')
validators = qurbastatics.validators
const validateInputs = require('./validateInput')

/**
 * @param  {} registerInformation_to_validate
 * @return array of errors
 * @desc   check on required inputs, then validate the register info
 */
module.exports = loginInfoValidator = async (loginInfoValidator) => {
   const return_value = { error: [] };
   //check existence of all required fields
   if (!loginInfoValidator.loginField || !loginInfoValidator.password) {
      console.log(loginInfoValidator);
      return_value.error.push("Please fill in all the fields")
      return return_value.error;
   }

   //validate inputs
   const validateLoginInfo = validateInputs.infoValidatorForLogin(loginInfoValidator)
   if(validateLoginInfo.length > 0){
      return_value.error = validateLoginInfo
   }
   return return_value.error;
};

