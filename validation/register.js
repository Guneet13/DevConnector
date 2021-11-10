const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){

    let errors = {}; //to collect errors

    //check user name
    if (isEmpty(data.name)){
        errors.name = 'Name field is required';
    }else if (!Validator.isLength(data.name,{min:2,Max:30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    //check email
    if(isEmpty(data.email)){
        errors.email = 'Email field is required';
    }else if(!Validator.isEmail(data.email)){
        errors.email = 'Please put in a valid email';
    }

    //check password
    if(isEmpty(data.password)){
        errors.password = 'password field is required';
    }else if(!Validator.isLength(data.password, {min:8, Max:30})){
        errors.password = 'Password must be between 8 and 30 characters';
    }

    //check confirmed password
    if (isEmpty(data.passwordConfirm)){
        errors.passwordConfirm = 'Confirm Password field is required';
      }else if(!Validator.equals(data.password, data.passwordConfirm)){
        errors.passwordConfirm = 'Passwords doesn\'t match';
    }

    return {
      errors,
      isValid: isEmpty(errors)//^^true or false;for easier check externally.
    };
}