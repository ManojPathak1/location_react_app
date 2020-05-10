/**
 * This file contains the operations happening in the indexed DB.
 */

let db = null;

// Function initializes the indexed DB.
export const createDB = () => {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      reject("This browser doesn't support IndexedDB");
    }
    const request = indexedDB.open("db", 1);
    request.onupgradeneeded = e => {
      db = e.target.result;
      db.createObjectStore("locations", { keyPath: "id", autoIncrement: true });
      resolve(db);
    };
    request.onsuccess = e => {
      db = e.target.result;
      resolve(db);
    };
    request.onerror = e => {
      console.log("Error: ", e);
    };
  });
}

// Function saves location.
export const addLocation = data => {
  const transaction = db.transaction("locations", "readwrite");
  const locations = transaction.objectStore("locations");
  locations.add(data);
};

// Function delete location. 
export const deleteLocation = id => new Promise(resolve => {
  const transaction = db.transaction("locations", "readwrite");
  const locations = transaction.objectStore("locations");
  const data = locations.delete(id);
  data.onsuccess = e => {
    resolve(e.target);
  }
});

// Function edit the location.
export const editLocation = data => {
  const transaction = db.transaction("locations", "readwrite");
  const locations = transaction.objectStore("locations");
  locations.put(data);
};

// Function registers the DB and fetches the locations.
export const getLocations = () =>
  new Promise(resolve => {
    createDB().then((db) => {
      const transaction = db.transaction("locations", "readwrite");
      const locations = transaction.objectStore("locations");
      const data = locations.getAll();
      data.onsuccess = e => {
        resolve(e.target.result);
      }
    });
  });