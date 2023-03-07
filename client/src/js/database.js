import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.log('PUT request to update the jateDB');
  // connect to the DB and the version we want to use
  const jateDb = await openDB('jate', 1);
  // make new transaction and need to specify the DB we are posting to and data privileges. 
  const tx = jateDb.transaction('jate', 'readwrite');
  // opening object store
  const objStore = tx.objectStore('jate');
  // passing in content to the object store
  const req = objStore.put({ id: id, value: value })
  // cconfirming the content was saved to the DB
  const res = await req;
  console.log('data saved to the jateDB', res);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (value) => {
  console.log('Getting data from the jateDB');
  // connecting to the DB and the version we want to use
  const jateDb = await openDB('jate', 1);
  // make new transaction and need to specify the DB we are posting to and data privileges. 
  const tx = jateDb.transaction('jate', 'readwrite');
  // opening object store
  const objStore = tx.objectStore('jate');
  // grabbing all the data from the object store
  const req = objStore.getAll()
  // confirming data was fetched
  const res = await req;
  console.log('data saved to the jateDB', res);
};


initdb();
