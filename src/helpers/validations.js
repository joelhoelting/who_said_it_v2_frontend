const isValidEmail = email => {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return re.test(String(email).toLowerCase());
};

const isValidPassword = password => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};

export const isValidAuthForm = (originalThis, email, password, password_confirmation = false) => {
  let containsErrors = false;
  let { errors } = originalThis;

  // Clear errors array
  errors.errorsArray = [];

  if (!isValidEmail(email)) {
    // console.log('invalid email');
    errors.errorsArray.push('Email is invalid');
    containsErrors = errors.email = true;
  } else {
    errors.email = false;
  }

  if (!isValidPassword(password)) {
    // console.log('invalid password');
    originalThis.errors.errorsArray.push(
      'Password must be at least eight characters (one letter, one number and one special character)'
    );
    containsErrors = errors.password = true;
  } else {
    errors.password = false;
  }

  if (password_confirmation) {
    if (password !== password_confirmation) {
      // console.log('passwords do not match');
      errors.errorsArray.push('Passwords do not match');
      containsErrors = errors.password_confirmation = true;
    } else {
      errors.password_confirmation = false;
    }
  }

  return !containsErrors;
};
