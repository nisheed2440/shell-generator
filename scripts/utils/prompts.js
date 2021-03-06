var inquirer = require("inquirer");
console.log("Select the appropriate answers");
var questions=[{
    type: "list",
    name: "taskrunner",
    message: "Wich task-runner do you need?",
    choices: [ "gulp", "webpack" ]
  },{
    type: "list",
    name: "framework",
    message: "Which framework do you need?",
    choices: [ "pure react", "react with redux" ]
  },
  {
    type: "list",
    name: "css_preloader",
    message: "Which css-preloader do you need?",
    choices: [ "less", "sass" ]
  },
  {
    type: "confirm",
    name: "eslint",
    message: "Do you need es-linting?"
  },
  { 
      when: function (response) {
       return response.eslint;
    },
    type: "confirm",
    name: "wantAirbnb",
    message: "\tOkay, do you need airbnb guide too?"
  },
  {
    type: "confirm",
    name: "stylelint",
    message: "Do you need style-linting?"
  },
  {
    type: "confirm",
    name: "server",
    message: "Do you need a dev-server?"
  }];

  var obj={
    done:false,
    gulp:false,
    webpack:false,
    react:false,
    react_redux:false,
    less:false,
    sass:false,
    eslint:false,
    wantAirbnb:false,
    stylelint:false,
    devserver:false
  };

  var prompt = inquirer.createPromptModule();

  var getPrompts = function getPrompts(){

      prompt(questions).then(function(answers){
      
      (answers.taskrunner=='gulp')?obj.gulp=true:obj.webpack=true;
      (answers.framework=='pure react')?obj.react=true:obj.react_redux=true;
      (answers.css_preloader=='less')?obj.less=true:obj.sass=true;
      (answers.eslint)?obj.eslint=true:obj.eslint=false;
      (answers.wantAirbnb)?obj.wantAirbnb=true:obj.wantAirbnb=false;
      (answers.stylelint)?obj.stylelint=true:obj.stylelint=false;
      (answers.server)?obj.devserver=true:obj.devserver=false;
        
      obj.done = true;
    });
    
    return obj;

  }

  module.exports = {
    getPrompts
  }
  
