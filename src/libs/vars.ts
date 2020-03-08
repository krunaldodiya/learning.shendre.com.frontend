export const baseUrlProd = 'https://learning.shendre.com';
export const apiUrlProd = 'https://learning.shendre.com/api';

export const baseUrlDev = 'https://learning.test';
export const apiUrlDev = 'https://learning.test/api';

export const baseUrl = __DEV__ ? baseUrlProd : baseUrlProd;
export const apiUrl = __DEV__ ? apiUrlProd : apiUrlProd;
