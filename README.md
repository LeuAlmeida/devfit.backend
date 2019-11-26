<h1 align="center">
  <img alt="Devfit" title="Devfit" src="readme/logo-black.png" width="200px" />
</h1>

<h3 align="center">
  Devfit: API Rest :key:
</h3>

<blockquote align="center">
An API rest created with NodeJS by Léu Almeida with :yellow_heart: and :coffee:
</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/LeuAlmeida/devfit.backend?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Léu Almeida" src="https://img.shields.io/badge/made%20by-Léu%20Almeida-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

</p>

<hr/>

<h3>:heavy_check_mark: Stack</h3>

|       Dependencies            |     Security and Prevent errors   |
|-------------------------------|:---------------------------------:|
|       Nodemon                 |     Bcrypt                        |
|       Bee-queue               |     Dotenv                        |
|       Express Handlebars      |     Express-async-errors          |
|       Pg and pg-hstore        |     JWT                           |
|       Sequelize               |     Sentry                        |
|       Express Handlebars      |     Youch                         |
|                               |     Yup                           |

<h3>:white_check_mark: About the API</h3>

This API is based on Express for the overall structure, uses PostgreSQL for data storage, Redis for queue data control in conjunction with Bee-queue, and Sentry for error control and internal problem maintenance. <br/>
Functions general features that use SMTP to trigger e-mails are done through `nodemailer` using `express-handlebars` and `nodemailer-express-handlebars` are kept in the <a href="https://github.com/LeuAlmeida/devfit.backend/tree/master/src/app/views/emails">src/app/views/emails</a> folder.

<h3>:electric_plug: Preparing the server</h3>

**Requeriments:**
* NodeJS >= 10.16.3
* Yarn >= 1.19.1
* Docker >= 19.03.3

```console
// Docker run PostgreSQL on 5434 port (change the <postgresname> and <password>)
$ sudo docker run --name <postgresname> -e POSTGRES_PASSWORD=<password> -p 5432:5432 -d postgres:11

// Docker run Redis on 5434 port (change the <redisname>)
$ sudo docker run --name <redisname> -p 6378:6379 -d -t redis:alpine

///////////////////////// DON'T FORGET TO CHANGE THE .ENV FILE ///////////////////////////
```

<h3>:arrows_counterclockwise: Running the application</h3>

```console
// Clone the project
$ git clone https://github.com/LeuAlmeida/devfit.backend.git

// Entering the folder
$ cd devfit.backend

// Installing the dependencies
$ yarn
```

In the first terminal:
```console
$ yarn dev
```

In the second terminal:
```console
$ yarn queue
```

<hr/>

<p align="center">
:copyright: Logo design by <a href="https://www.behance.net/lucasrvr" target="_blank">Lucas Ribeiro</a>
</p>

<p align="center">
<h4>Color Scheme</h4>
#806600 | #FFDB4D | #FFCC00 | #827E65E | #CCA300
</p>

<h4 align="center">
<a href="http://linkedin.com/in/leonardoalmeida99">Connect me in LinkedIn</a> | <a href="http://behance.net/almeida99">See my Behance</a> | <a href="https://leunardo.dev">Click here to go to my CV</a>
</h4>
