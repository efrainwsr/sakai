import { app, db } from "./firebaseConfig.js";
import { enableIndexedDbPersistence, collection ,getDocs,getDoc, query, doc, onSnapshot, where, orderBy  } from "firebase/firestore"; // Importa la función de persistencia
import axios from 'axios';
import { store } from './store.js'


const url = 'https://bcv-api-vnzw.onrender.com/bcv';
var bcvPrice = 0;
var menuItemsRef = null;

/*
enableIndexedDbPersistence(db)
  .then(() => {
    // Éxito
  })
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Múltiples pestañas abiertas, no se pudo habilitar la persistencia
    } else if (err.code === 'unimplemented') {
      // El navegador no admite persistencia de Firestore
    }
  });*/

 export const obtenerBcv = async () => {
  const bcvRef = doc(db, 'tasas', 'sGADlxVq7kiPS9dKsxOf')
  const tasa = await getDoc(bcvRef);
  let bcvPrice = tasa.data().tasa;
  return bcvPrice;
}

 export const getBcvRate = onSnapshot(doc(db, 'tasas', 'sGADlxVq7kiPS9dKsxOf'), (doc) => {
    store.bcvPrice.value = doc.data().tasa; 
    //console.log(doc.data().tasa)
    //bcvPrice.value = doc.data().tasa;
});

  export const getMenuItems = async () => {
    //let bcvPrice = await obtenerBcv();


    const q = query(collection(db, "menu"), where("status", "==", "Disponible"));
    const querySnapshot = await getDocs(q);
     const data = querySnapshot.docs.map((doc) =>{
      return {id: doc.id,...doc.data(), precioBs: (doc.data().price) * store.bcvPrice.value };
    });

    /*
    const query = await getDocs(collection(db, "menu"), where("status", "===", "Disponible"), orderBy("name"));
    const data = query.docs.map((doc) =>{
      return {id: doc.id,...doc.data(), precioBs: (doc.data().price) * store.bcvPrice.value };
    });
    menuItemsRef = query;*/
    return data;
  };

//bcvPrice = await obtenerBcv();

/*export const getDocuments = async () => {
  try {
    const bcvPrice = await obtenerBcv();
    store.bcvPrice = bcvPrice;

    const q = query(collection(db, "menu"));
    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      docData.id = doc.id;
      docData.priceBs = parseFloat((docData.price * bcvPrice).toFixed(2));
      docData.cant = 0;
      data.push(docData);
    });

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    // Maneja el error según tus necesidades
    return [];
  }
};*/



