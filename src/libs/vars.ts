export const baseUrlProd = 'https://padhaku.pauzr.com';
export const apiUrlProd = 'https://padhaku.pauzr.com/api';

export const baseUrlDev = 'https://learning.test';
export const apiUrlDev = 'https://learning.test/api';

export const baseUrl = __DEV__ ? baseUrlDev : baseUrlProd;
export const apiUrl = __DEV__ ? apiUrlDev : apiUrlProd;
