const qurbastatics = require ('qurbastatics')
validators = qurbastatics.validators
const User = require('../../models/user')
const validateInputs = require('./validateInput')

/**
 * @param  {} registerInformation_to_validate
 * @return array of errors
 * @desc   check on required inputs, then check if this user is akready exists then validate the register info
 */
module.exports = registerInfoValidator = async (registerInformation) => {
   const return_value = { error: [] };
   //check existence of all required fields
   if (!registerInformation.name || !registerInformation.loginField || !registerInformation.password) {
      return_value.error.push("Please fill in all the fields")
      return return_value.error;
   }

   //check that the credentilas is not already exists in the system DB
   let existingUser = await User.findOne({ loginField: registerInformation.loginField })
   if (existingUser) {
      return_value.error.push("Login field already exists")
      return return_value.error
   }

   //validate inputs
   const validateRegisterInfo = validateInputs.infoValidatorForRegister(registerInformation)
   if (validateRegisterInfo.length > 0) {
      return_value.error = validateRegisterInfo
   }
   return return_value.error;
};

