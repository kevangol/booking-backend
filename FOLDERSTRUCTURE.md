# Project Folder Structure

[![Version](https://img.shields.io/badge/Version-1.0_-blue?style=flat-square)]()

## Instructions for the naming project, folders, and files
- Do not use spaces, special characters or numbers
- Use pascal case
- Only user lower snake case in database folder

## Folder Structure

* #### 🗂 Assets
    * #### 🗂 Images
        * #### 🗂 Orignal
        * #### 🗂 Temp
        * #### 🗂 Thumb
    * #### 📁 favicon.png
* #### 🗂 Config
    * #### 📁 Constants.js
    * #### 📁 Cronjob.js
    * #### 📁 Database.js
    * #### 📁 Response.Handler.js
    * #### 📁 Globals.js
* #### 🗂 Controllers
    * #### 🗂 Auth
        * #### 📁 Auth.Admin.Controller.js
        * #### 📁 Auth.User.Controller.js
    * #### 📁 Admin.Controller.js
    * #### 📁 User.Controller.js
* #### 🗂 Credentials
    * #### 🗂 SSL //Not required in new set up
        * #### 📁 Cert.pem
        * #### 📁 Key.pem
    * #### 📁 Firebase.Key.json
    * #### 📁 Appstore.Key.json
* #### 🗂 Database
    * #### 🗂 Migrations
        * #### 📁 create-users.js
        * #### 📁 create-admins.js
        * #### 📁 create-user_sessions.js
        * #### 📁 add-reportCount-in-users.js
    * #### 🗂 Schemas
        * #### 📁 users.js
        * #### 📁 admins.js
        * #### 📁 user_sessions.js
    * #### 🗂 Seeders
        * #### 📁 add-admin.js
        * #### 📁 add-static-pages.js
* #### 🗂 Helpers
    * #### 📁 Date.Helper.js
    * #### 📁 String.Helper.js
* #### 🗂 Locales
    * #### 📁 en.json
    * #### 📁 fn.json
* #### 🗂 Managers
    * #### 📁 File.Manager.js
    * #### 📁 Notification.Manager.js
    * #### 📁 Mail.Manager.js
    * #### 📁 Sms.Manager.js
    * #### 📁 SocialAuth.Manager.js
* #### 🗂 Middlewares
    * #### 🗂 Validators
        * #### 🗂 Auth
            * #### 📁 Auth.Admin.Validator.js
            * #### 📁 Auth.User.Validator.js
        * #### 📁 User.Validator.js
    * #### 📁 Authentication.js
* #### 🗂 Models
    * #### 🗂 Admin
        * #### 📁 Admin.Model.js
        * #### 📁 Admin.Session.Model.js
    * #### 🗂 User
        * #### 📁 User.Model.js
        * #### 📁 User.Session.Model.js
    * #### 🗂 Post
        * #### 📁 Post.Model.js
        * #### 📁 Post.Member.Model.js
        * #### 📁 Post.Media.Model.js
        * #### 📁 Post.Comment.Model.js
    * #### 📁 Report.Model.js
* #### 🗂 Routers
    * #### 🗂 Auth
        * #### 📁 Auth.Admin.Route.js
        * #### 📁 Auth.User.Route.js
    * #### 📁 User.Route.js
    * #### 📁 Admin.Route.js
    * #### 🗂 Post
        * #### 📁 Post.Media.Route.js
        * #### 📁 Post.Member.Route.js
        * #### 📁 Post.Momment.Route.js
    * #### 📁 index.js
* #### 🗂 Views
    * #### 📁 Static.Pages.ejs
    * #### 📁 Reset.Password.ejs
    * #### 📁 Verify.Email.ejs
* #### 📁 .env
* #### 📁 .env.example
* #### 📁 .env.devlopment
* #### 📁 .env.master
* #### 📁 .gitignore
* #### 📁 .sequelizerc
* #### 📁 package.json
* #### 📁 README.md
* #### 📁 SequelizeCommands.txt
* #### 📁 server.js
