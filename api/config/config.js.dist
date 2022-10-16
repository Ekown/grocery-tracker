require('dotenv').config();

// This is the json used by Sequelize-CLI for connecting to the database
module.exports = {
  "development": {
    "use_env_variable": "DATABASE_URL",
    "dialect":"postgres",
    "ssl":true,
    "dialectOptions":{
        "ssl":{
          "require":true
        },
        "options": "--cluster=grocery-tracker-app-2854"
    }
  },
  "test": {
    "use_env_variable": "DATABASE_URL",
    "dialect":"postgres",
    "ssl":true,
    "dialectOptions":{
        "ssl":{
          "require":true
        },
        "options": "--cluster=grocery-tracker-app-2854"
    }
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect":"postgres",
    "ssl":true,
    "dialectOptions":{
        "ssl":{
          "require":true
        },
        "options": "--cluster=grocery-tracker-app-2854"
    }
  }
}