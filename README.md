# vue-firebase-app-template

> Template of a Vue SPA app using Firebase

## Prerequisites

Since this example is for Firebase, you'll need a [Firebase](https://firebase.google.com) account. Follow the documentation for how to set things up.

## Configuration

You'll need to initialise the application Firebase. Most of this is done, but application secrets will need to be added manually by you. in `/config/secrets/firebase.env.js`, add the following;
```
module.exports = {
  apiKey: '"<YOUR-API-KEY"',
  authDomain: '"<YOUR-AUTH-DOMAIN"',
  databaseURL: '"<YOUR-DATABASE-URL"',
  storageBucket: '"<YOUR-STORAGE-BUCKET>"',
  ... // add any other credentials necessary
};
```
These credentials will be exposed to the Vue Application via `process.env.FIREBASE`.

`src/components/Firebase` is component responsible for initialising the application with Firebase and uses these credentials.

## Project structure

This template app has 5 basic pages;
- Login: Shown if the user is logged out (i.e. no authentication information available)
- Logout: Shown when the user is logging out
- Home: Shown when the user is logged in (i.e. authentication information available)
- 404: Whenever a page cannot be found
- Loading: When the app is initialising

The basic flow of the application takes cues from Mobile Apps where there is a short 'loading' state. This allows the application to perform any initialisation before rendering or letting the user do anything. As such, when it is first started, it will begin in the *Loading* state and page.

The entry point for components is in `/src/App.vue`. Start from there to get an idea of how things connect.

This *Loading* state is handled by the `/components/AppStartup` component. Looking at the `/src/App.vue` component, you can see that until the app is initialised, it will show this `AppStartup` component. Once it is done, it will transition control to the Vue-Router for normal operation.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on Vue, checkout the
[vue](http://vuejs.org/guide/),
[webpack guide](http://vuejs-templates.github.io/webpack/) and
[docs for vue-loader](http://vuejs.github.io/vue-loader).
