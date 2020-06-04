### Publish instructions
* Open the app project root
* Open CMD as an Administrator (*Not always required*)
* Run `yarn run generate` or `npm run generate`
* Create a folder for the site
* Copy all files from dist folder and copy to the created folder for the site
* Create a site in IIS and point the dist folder path as a site path and assign the site binding information.
* Assign the **IIS_IUSRS** and **IUSR** permission (*Full control*) to the site folder (*you can add just to the root folder and all subfolder will inherite it*)
* Test the site on the browser 

#### Nuxt.js Agnus
[![Netlify Status](https://api.netlify.com/api/v1/badges/5191e66c-a92c-4d42-9c9f-12d48647ee45/deploy-status)](https://app.netlify.com/sites/agnuscrm/deploys)

[![Build Status][build-status]][build-url]
[build-status]:https://travis-ci.org/Aguns/Agnus.svg?branch=master
[build-url]:https://travis-ci.org/Aguns/Agnus
