[![GitHub top language](https://img.shields.io/github/languages/top/nethanelkohen/photoflow.svg?colorB=EFDF70&style=plastic)](https://github.com/nethanelkohen/photoflow)
[![GitHub issues](https://img.shields.io/github/issues/nethanelkohen/photoflow.svg?&colorB=ff0000&style=plastic)](https://github.com/nethanelkohen/photoflow/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/nethanelkohen/photoflow.svg?colorB=1FBF14&style=plastic)](https://github.com/nethanelkohen/photoflow/pulls)
[![License (MIT)](https://img.shields.io/github/license/mashape/apistatus.svg?style=plastic)](https://github.com/nethanelkohen/photoflow/blob/master/LICENSE)

<img src="assets/logo.PNG" align="right" alt="PhotoFlow Logo" width="350" height="auto" overflow="hidden" />

# PhotoFlow

A full stack Instagram clone created by [Lester Loor](https://github.com/lesterloor) and [Nethanel Kohen](https://github.com/nethanelkohen).

<br>

<img src="./assets/PhotoFlow_demo.gif" width="750" height="auto" />

<br>

## Getting Started

```bash
$ git clone https://github.com/nethanelkohen/photoflow
$ cd photoflow
$ npm install
$ node server.js
```

## Deployment

[Heroku](https://whispering-taiga-72375.herokuapp.com/)

## Data Models

### 'users'

| Column     | Type                           |
| ---------- | ------------------------------ |
| `id`       | INTEGER (PRIMARY KEY)          |
| `username` | STRING(100) (NOT NULL)(UNIQUE) |
| `password` | STRING(1000) (NOT NULL)        |

* ONE to MANY relationship with photos
* ONE to MANY relationship comments

### 'photos'

| Column         | Type                  |
| -------------- | --------------------- |
| `id`           | INTEGER (PRIMARY KEY) |
| `size`         | INTEGER (NOT NULL)    |
| `originalName` | STRING (NOT NULL)     |
| `userposted`   | STRING (NOT NULL)     |
| `description`  | STRING (150)          |
| `filename`     | STRING (NOT NULL)     |

* ONE to MANY relationship with comments
* ONE to MANY relationship with likes
* MANY to ONE relationship with users

### 'comments'

| Column    | Type                  |
| --------- | --------------------- |
| `id`      | INTEGER (PRIMARY KEY) |
| `comment` | STRING (NOT NULL)     |

* MANY to ONE relationship with photos
* MANY to ONE relationship with user
* ONE to MANY relationship with likes

### 'Likes'

| Column | Type                                 |
| ------ | ------------------------------------ |
| `id`   | INTEGER (PRIMARY KEY)(AUTOINCREMENT) |

* MANY to ONE relationship with photos

## Routes

### GET `/`

| Argument      | Description |
| ------------- | ----------- |
| `No argument` | No argument |

* Directs user to landing page with register and login

### GET `/login`

| Argument      | Description |
| ------------- | ----------- |
| `No argument` | No argument |

* Displays a login form which has fields to verify a username and password
* Upon success, redirects 'to gallery'

### GET `/register`

| Argument      | Description |
| ------------- | ----------- |
| `No argument` | No argument |

* Directs user to registration page

### POST `/register`

| Argument   | Description                      |
| ---------- | -------------------------------- |
| `username` | Username input to verify account |
| `password` | Password input to verify account |

* Endpoint for submitting an account creation post form
* Upon success, redirects to `/gallery`

### POST `/upload`

| Argument      | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `photo`       | Photo to be posted to the application by the user                          |
| `description` | Description to be associated to the photo being posted.                    |
| `tag`         | Tag to be associated to the photo being posted, based on a specified topic |

* Endpoint for posting a photo to gallery
* Upon success, redirects to `/gallery`

## Project Organization

```
    ├── server.js         # Main entry point
    ├── fonts
    ├── assets         # Static assets
    ├── models     # Database
    │   └── comments.js
    │   └── likes.js
    │   └── photos.js
    │   └── user.js
    ├── public        # Holds local files
    ├── routes     # Handles routing
    │   └── index.js
    │   └── photos.js
    │   └── users.js
    ├── utility     # Database environment
    │   └── sql.js
    └── views     ## Handles views
      ├── gallery.pug
      ├── head.pug
      ├── home.pug
      ├── login.pug
      ├── nav.pug
      ├── profile.pug
      ├── profilenav.pug
      ├── register.pug
      ├── submit.pug
      └── upload.pug
```

## Technology Used

<img src="https://camo.githubusercontent.com/a43de8ca816e78b1c2666f7696f449b2eeddbeca/68747470733a2f2f63646e2e7261776769742e636f6d2f7075676a732f7075672d6c6f676f2f656563343336636565386664396431373236643738333963626539396431663639343639326330632f5356472f7075672d66696e616c2d6c6f676f2d5f2d636f6c6f75722d3132382e737667" align="center" width="150" height="auto" /> <br><br>

* [Pug](https://pugjs.org/) is a templating language that lets you markup HTML with JavaScript.
  <br><br>

  <img src="https://i.ytimg.com/vi/XjmwLObtPj8/hqdefault.jpg?sqp=-oaymwEWCKgBEF5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLDp4lD_cRV_Sy-nYELTgFTxnuSS4g" align="center" width="200" height="auto" /> <br><br>

* [Amazon S3](https://aws.amazon.com/s3/) is a file storage service built to store and retrieve any amount of data from anywhere.
  <br><br>

<img src="https://cdn.glitch.com/project-avatar/0d184ee3-fd8d-4b94-acf4-b4e686e57375.png" align="center" width="150" height="auto" /> <br><br>

* [Passport](http://www.passportjs.org/) is authentication middleware for Node.js.
  <br><br>

<img src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" align="center" width="210" height="auto" /> <br><br>

* [Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
  <br><br>

<hr>
<br>

* [Multer](https://www.npmjs.com/package/multer/) is a Node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
  <br><br>

<hr>
<br>

<img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg" align="center" width="200" height="auto" /> <br><br>

* [Node](https://nodejs.org/en/) is a multi-platform, open-source JavaScript run-time environment that executes code on the server-side.
  <br><br>

<img src="https://www.fullstackpython.com/img/logos/postgresql.jpg" align="center" width="220" height="auto" /> <br><br>

* [PostgreSQL](https://www.postgresql.org/) is a powerful, open source object-relational database system.
  <br><br>

<img src="https://techforstartup.com/wp-content/uploads/2017/04/sequelize.png" align="center" width="200" height="auto" /> <br><br>

* [PostgreSQL](http://docs.sequelizejs.com/) is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
  <br><br>

## Credits

Lester Loor (contributor)
Nethanel Kohen (contributor)
