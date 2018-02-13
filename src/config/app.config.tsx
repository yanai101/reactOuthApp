import { BIT_CONFIG } from './bitConfig';
// const hostname =  window && window.location && window.location.hostname;
// let  backendHost;

// console.log('webpack ',env.NODE_ENV);

// if (/^qa/.test(hostname)) {
//     backendHost = `https://api.${hostname}`;
//   } else {
//     backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';
//   }
export interface ApplicationConfig {
    apiURL: string;
    hostURL: string;
    bitConfig: any ;
  }

const APPCONFIG: ApplicationConfig = {
        hostURL : 'http://localhost:8080', // backendHost,
        apiURL: 'localhost:3000/',
        bitConfig: BIT_CONFIG
};

export default APPCONFIG;