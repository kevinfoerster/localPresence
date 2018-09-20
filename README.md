# localPresence

provides a proxy for geofency using firebase and node js

> Honey, I am home…

most home automation solutions ask you to open a port on your router in order to connect some presence detection to your home automation system.

sometimes you are not able to open a port (eg. DS-Lite) or are not willing to do so, in any case, `localPresence` is here to help.

## idea

use [geofency](http://www.geofency.com) to track events like enter and exit at a location and configure a webhook to send the payload to [firebase](https://firebase.google.com), firebase will update its database and let other clients know that the update occured.

`localPresence` waits for this event on a locally running instance and will forward the payload to a provided URL as a post request, just as geofency would do.

## setup

you can run `localPresence` locally or in a docker container.

you will need a [firebase](https://firebase.google.com) account.

create a `.env` file wihtin the cloned directory and provide some credentials and ULRs.

if you run home assistant 0.78 or later, you need to provided a `HOME_ASSITANT_LONG_LIVED_TOKEN`, see [authenticated requests](https://developers.home-assistant.io/docs/en/auth_api.html#making-authenticated-requests)

additionally, the optional `LOCATION` allows you to listen for only one location instead of all, the name corresponds to the name of the location setup in geofency eg. i use a geofency location named `home` and multiple instances of `localPresence` at different locations, it is set to `LOCATION="home"` at home and therefor ignores any other changes to firebase not container `home`

```
REQUEST_URL=http://home-assistant:8123/api/geofency
FIREBASE_API_KEY=ABCDEF123456
FIREBASE_DATABASE_URL=https://example.firebaseio.com
FIREBASE_PROJECT_ID=firebase-example
HOME_ASSITANT_LONG_LIVED_TOKEN="ABCDEF123456"
LOCATION="home"
```

`REQUEST_URL` is the url which should be called upon update, all firebase related infos can be found at the [firebase console](https://console.firebase.google.com/project/firebase-omnipresence/settings/general/), click "Add Firebase to your web app" and you will be provided with all the necessary details.

save them in the `.env` file and you should be ready to go.

## geofency setup

I created a firebase cloud function to update my location details on firebase, firebase will provide an endpoint, which you need to enter in geofency.

the cloud function is provided in the `functions` folder, see the firebase cloud functions [get started guide](https://firebase.google.com/docs/functions/get-started) to setup your account.

## local installation

run `npm install` and if all did go well, run `npm run start` to listen for events.

if you need to make changes to the `.env` file, you need to restart the script.

## docker

I use `localPresence` on a raspberry pi using docker, create your `.env` file and build and run the container.

build the container:

```
docker build  -t local-presence .
```

run the container:

```
docker run -d local-presence
```

---

in any case, you should see an update whenever you exit or enter a location like `Update successful! Server responded with: Setting location for ABCDEF1234567890`

for testing purposes you can press the enter and exit buttons within the geofency webhhok settings\
