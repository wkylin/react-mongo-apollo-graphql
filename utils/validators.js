module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
  const errors = {};

  if(username === '') {
    errors.username = 'Username must not be empty';
  }
  if(email === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regExt = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
    // TODO
    if (regExt.test(email)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if(password === ''){
    errors.password = 'Password must not be empty';
  } else if(password !== confirmPassword){
    errors.confirmPassword = 'Password must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if(username === '') {
    errors.username = 'Username must not be empty';
  }
  if (password === '') {
    errors.password = 'Password must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}