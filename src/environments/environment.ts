// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverWs: 'ws://localhost:8000/ws',
  baseUrl: 'http://192.168.137.91:8000/api',
  cryptoSecretKey: "@OER-QYpTatEMVQ3tem_0573d65be7efe43b07935a27220b61199ad90060@",
  repoUrl: 'http://192.168.137.1:8000/api/v1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
