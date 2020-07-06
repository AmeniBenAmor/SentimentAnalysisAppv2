
## Build images and run containers with docker-compose

After cloning the repository go inside the project folder:

Run `docker-compose up` which will start a Flask web application for the backend API (default port `8081`) and an Angular frontend served through a webpack development web server (default port `4200`).

## Access your app

In your browser navigate to: `http://localhost:4200` (or whatever port you defined for the frontend in `docker-compose.yml`).  

## Working __without__ docker 

I highly recommend the use of docker and docker-compose as it is far simpler to get started than to run all of the following manually.


### Backend development

Navigate inside the backend directory: `cd backend`

Install pip dependencies: `pip install -r requirements.txt`

Run `python app.py` in backend root (will watch files and restart server on port `8081` on change).

### Frontend development

Navigate inside the frontend directory: `cd frontend`

Assure you have [Nodejs], [Yarn]and the [angular-cli] installed.

Install npm dependencies: `yarn install --pure-lockfile` 

Run `yarn start` in frontend root (will watch files and restart dev-server on port `4200` on change).
All calls made to `/api` will be proxied to backend server (default port for backend `8081`), this can be changed in `proxy.conf.json`.
