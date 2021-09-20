/*******************************************************/
/******************** HELPER MODULE ********************/

// IMPORTING THIRD PARTY PACKAGES
import { async } from 'regenerator-runtime';

// IMPORING LOCAL JS MODULES
import { TIMEOUT_SECONDS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/* 
// function will return a promise
export const getJSON = async function (url) {
  try {
    // making API call display dynamically according to current recipe id
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error('');
    }

    // console.log(res, data);

    // fulfillment value of the resolved Promise
    return data;
  } catch (err) {
    // propagating error
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    // to send data to server using fetch() method
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        // data we are going to send will we in JSON format
        'Content-Type': 'application/json',
      },
      // data to send
      body: JSON.stringify(uploadData),
    });

    // API call to send data to the server
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error('');
    }

    // fulfillment value of the resolved Promise
    return data;
  } catch (err) {
    // propagating error
    throw err;
  }
}; */

// embedding above two commented function's working into this single function
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // making API call to send data to the server or to retrive data from the server using fetch() method. So, fetch() method can be used for both recieving data from server or sending data to the sever.
    // to send data to the server -> fetch(url, obj)
    // to retrive data from server -> fetch(url)
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            // data we are going to send will we in JSON format
            'Content-Type': 'application/json',
          },
          // data to send
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // API call to send data to the server
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error('');
    }

    // console.log(res, data);

    // fulfillment value of the resolved Promise
    return data;
  } catch (err) {
    // propagating error
    throw err;
  }
};

// to convert decimal number to fraction
export const numberToFraction = function (amount) {
  // This is a whole number and doesn't need modification.
  if (parseFloat(amount) === parseInt(amount)) {
    return amount;
  }
  // Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
  const gcd = function (a, b) {
    if (b < 0.0000001) {
      return a;
    }
    return gcd(b, Math.floor(a % b));
  };
  const len = amount.toString().length - 2;
  let denominator = Math.pow(10, len);
  let numerator = amount * denominator;
  var divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;
  let base = 0;
  // In a scenario like 3/2, convert to 1 1/2
  // by pulling out the base number and reducing the numerator.
  if (numerator > denominator) {
    base = Math.floor(numerator / denominator);
    numerator -= base * denominator;
  }
  amount = Math.floor(numerator) + '/' + Math.floor(denominator);
  if (base) {
    amount = base + ' ' + amount;
  }
  return amount;
};
