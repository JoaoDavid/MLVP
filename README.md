![MLVP Logo](./logo/FinalLogoSmall.png)


## Installing dependencies
Within the repository root location, open the command line and run the following commands. 

### `npm install`
Install front-end npm dependencies

### `pip install -r requirements.pip`
Install back-end python dependencies


## Run in Development mode

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `python ./backend/serverDev.py`

Runs the back-end in the development mode.\
Listening for HTTP requests at localhost:8080

### `python create-node.py "Block Category" "Block Name" "template-folder-name"`

Creates the four front-end and single back-end class files for the new block in the respective category directories

## Deployment

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
Then run it using `serve -s build`

### `python ./backend/server.py`

Runs the back-end in the production mode.\
Listening for HTTP requests at 194.117.20.237:443

### journalctl -u SERVICE_NAME.service --since today
