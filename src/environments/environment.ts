// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://' + window.location.hostname + ':8447/',
  firebase: {
    apiKey: "AIzaSyCgzB2IcOFeSTkWgiMdd73eUUmnDLMdb-c",
    authDomain: "fir-deea4.firebaseapp.com",
    databaseURL: "https://fir-deea4.firebaseio.com",
    projectId: "fir-deea4",
    storageBucket: "fir-deea4.appspot.com",
    messagingSenderId: "1045286324771",
    appId: "1:1045286324771:web:eec50fd01bb965bdabbf96",
    measurementId: "G-Z0VQEPRS5V"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
