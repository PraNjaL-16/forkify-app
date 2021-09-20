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
