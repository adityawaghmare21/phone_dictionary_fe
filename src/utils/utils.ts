export const BASE_URL = 'http://localhost:8080/api';

const REGEXOBJ = {
    ALPHA_ONLY: /^[A-Za-z]*$/,
    NUMERIC_ONLY: /^[0-9]*$/
}

export const isInputValid = (inputValue, regexName) => {
    return REGEXOBJ[regexName].test(inputValue);
}