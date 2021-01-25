const isValidPassword = password => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};

const isValidEmail = email => {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return re.test(String(email).toLowerCase());
};

export const isValidAuthForm = (originalThis, options) => {
  const presentKeys = Object.keys(options);

  let containsErrors = false;
  let { errors } = originalThis;

  // Clear errors array
  errors.errorsArray = [];

  // Add Error Helper
  const addError = (errorType, errorMsg) => {
    originalThis.errors.errorsArray.push(errorMsg);
    containsErrors = errors[errorType] = true;
  };

  // Email
  if (presentKeys.includes('email') && !isValidEmail(options.email)) {
    addError('email', 'Email address is invalid');
  } else {
    errors.email = false;
  }

  // Original Password
  if (presentKeys.includes('original_password') && !isValidPassword(options.original_password)) {
    addError('original_password', 'Original password is invalid');
  } else {
    errors.original_password = false;
  }

  // Password
  if (presentKeys.includes('password') && !isValidPassword(options.password)) {
    addError(
      'password',
      'Password must be at least eight characters (one letter, one number and one special character)'
    );
  } else {
    errors.password = false;
  }

  // Password Confirmation & Update Password
  if (presentKeys.includes('password_confirmation')) {
    if (options.password !== options.password_confirmation) {
      addError('password_confirmation', 'Passwords do not match');
    } else if (options.original_password === options.password) {
      addError('password', 'New password must be different');
    }
  } else {
    errors.password_confirmation = false;
  }

  return !containsErrors;
};
