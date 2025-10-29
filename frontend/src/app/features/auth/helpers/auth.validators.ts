export function formValidate(username: string, password: string, passwordConfirm?: string) {
  //vraca poruku ako ima greska, ili "" ako nema i onda se dispecuje
  let errorMessage = '';
  if (username === '' || password === '' || passwordConfirm === '') {
    errorMessage += 'Username and password are required. \n';
    return errorMessage;
  }
  if (passwordConfirm) {
    if (!passwordsMatching(password, passwordConfirm)) {
      errorMessage += 'Password and Confirm Password do not match. \n';
      return errorMessage;
    }
  }

  if (password.length < 6) {
    errorMessage += 'Password must be at least 6 characters long.\n';
  }
  if (password.length > 100) {
    errorMessage += 'Password cannot exceed 100 characters.\n';
  }
  if (username.length < 4) {
    errorMessage += 'Username must be at least 4 characters long.\n';
  }
  if (username.length > 30) {
    errorMessage += 'Username cannot exceed 30 characters.\n';
  }
  if (!passwordValidate(password)) {
    errorMessage +=
      'Password must contain at least one uppercase, one lowercase letter, and one special character.\n';
  }
  return errorMessage;
}

function passwordValidate(password: string) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!passwordRegex.test(password)) {
    return false;
  } else {
    return true;
  }
}

function passwordsMatching(password: string, passwordConfirm?: string) {
  if (password === passwordConfirm) {
    return true;
  } else {
    return false;
  }
}
