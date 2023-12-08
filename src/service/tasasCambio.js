import { app, db } from "./firebaseConfig.js";
import {updateDoc, doc } from "firebase/firestore"; // Importa la función de persistencia
import axios from 'axios';
const currentRateRef = doc(db, "tasas", "sGADlxVq7kiPS9dKsxOf");


//const axios = require('axios');
const url = 'https://bcv-api-vnzw.onrender.com/bcv';
const apiURL = 'https://api.alcambio.app/graphql';


const queryData = {
  operationName: "getCountryConversions",
  variables: {
    "countryCode": "VE"
  },
  query: `
    query getCountryConversions($countryCode: String!) {
      getCountryConversions(payload: {countryCode: $countryCode}) {
        _id
        conversionRates {
          baseValue
        }
        dateBcv
      }
    }
  `
};

 export const getData = async () => {
	const response = await axios.post(apiURL, queryData);
	const data = response.data.data.getCountryConversions;

    let price = data.conversionRates[1].baseValue;
    let timestamp = data.dateBcv; // Multiplica por 1000 para convertir de segundos a milisegundos
    let date = new Date(timestamp);

    let bcv ={precio: price, fecha: timestamp}
    //console.log(bcv.precio, bcv.fecha)
	return bcv;
}

export const updateBcv = async ()=>{
	let bcv = await getData();
	await updateDoc(currentRateRef, {
	  tasa: bcv.precio,
	  fecha: bcv.fecha
	});
}




/*
const queryDataFull = {
  operationName: "getCountryConversions",
  variables: {
    "countryCode": "VE"
  },
  query: `
    query getCountryConversions($countryCode: String!) {
      getCountryConversions(payload: {countryCode: $countryCode}) {
        _id
        baseCurrency {
          code
          decimalDigits
          name
          rounding
          symbol
          symbolNative
        }
        country {
          code
          dial_code
          flag
          name
        }
        conversionRates {
          baseValue
          official
          principal
          rateCurrency {
            code
            decimalDigits
            name
            rounding
            symbol
            symbolNative
          }
          rateValue
          type
        }
        dateBcvFees
        dateParalelo
        dateBcv
        createdAt
      }
    }
  `
};*/