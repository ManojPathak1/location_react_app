let db = null;

export const createDB = () => {
  return new Promise((resolve) => {
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
    request.onerror = e => { };
  });
}

export const addLocation = data => {
  const transaction = db.transaction("locations", "readwrite");
  const locations = transaction.objectStore("locations");
  locations.add(data);
};

export const deleteLocation = id => new Promise(resolve => {
  const transaction = db.transaction("locations", "readwrite");
  const locations = transaction.objectStore("locations");
  const data = locations.delete(id);
  data.onsuccess = e => {
    resolve(e.target);
  }
});

export const editLocation = data => {
  const transaction = db.transaction("locations", "readwrite");
  const locations = transaction.objectStore("locations");
  locations.put(data);
};

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