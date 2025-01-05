// src/utils.js

/**
 * Extends the target object with properties from source objects.
 * Similar to Object.assign but ensures immutability if needed.
 */
export const extend = (target, ...sources) => Object.assign(target, ...sources);

/**
 * Fetches JSON data from a given URL.
 * Throws an error if the request fails.
 */
export const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};
