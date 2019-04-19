const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePropertyInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : '';
  data.reference = !isEmpty(data.reference) ? data.reference : '';

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Property description is required';
  }

  if (Validator.isEmpty(data.reference)) {
    errors.reference = 'Reference field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
