const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const exists = fs.existsSync;
const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;
//const defaults = require('lodash/defaultsDeep');

//import utility functions
const prompts = require('./utils/prompts.js');
const utils = require('./utils/utils.js');
const esLints = require('./utils/es-lint.js');
const styleLints = require('./utils/style-lint.js');
const fsUtils = require('./utils/fs-utils.js');
const cssPreloaders = require('./utils/css-preloaders.js');

//import contents of the different files to write
const pkgjson = path.join(process.cwd(),'package.json');

function generateProject(params){
  
  var frameworkDeps,bundlerDeps;

  bundlerDeps = (params.gulp)?require('./packageJson/gulp.js'):require('./packageJson/webpack.js');

  frameworkDeps = (params.react)?require('./packageJson/react.js'):require('./packageJson/react-redux.js');

  (params.gulp)?fsUtils.copyDirectory('./scripts/gulp','./'):fsUtils.copyDirectory('./scripts/webpack','./');

  (params.react)?fsUtils.copyDirectory('./scripts/skeleton/pure-react','./'):fsUtils.copyDirectory('./scripts/skeleton/react-redux','./');

  if(exists(pkgjson)){
      utils.createPkgJson(pkgjson,frameworkDeps,bundlerDeps);
    }

  if(params.less){
    (params.gulp)?cssPreloaders.preloaderForGulp('./gulpfile.js','less'):cssPreloaders.preloaderForWebpack(['./webpack.config.js','./webpack.config.prod.js'],'less',/\.less$/);
  }

  if(params.sass){
    (params.gulp)?cssPreloaders.preloaderForGulp('./gulpfile.js','sass'):cssPreloaders.preloaderForWebpack(['./webpack.config.js','./webpack.config.prod.js'],'sass',/\.scss$/);
  }

  if(params.eslint){
    
    if(params.wantAirbnb){
      (params.gulp)?esLints.insertEsLintForGulp('./gulpfile.js',true):esLints.insertEsLintForWebpack(['./webpack.config.js','./webpack.config.prod.js'],true);
    }
    else {
      (params.gulp)?esLints.insertEsLintForGulp('./gulpfile.js',false):esLints.insertEsLintForWebpack(['./webpack.config.js','./webpack.config.prod.js'],false);
    }
  }

  if(params.stylelint){
    (params.gulp)?styleLints.insertStyleLintForGulp('./gulpfile.js'):styleLints.insertStyleLintForWebpack(['./webpack.config.js','./webpack.config.prod.js']);
  }

  if(params.devserver){
    utils.addDevserver();
  }
  
}

function clearme(){
  clearInterval(myVar);
}

function init(){

  var answers = prompts.getPrompts();
     myVar = setInterval(function(){      
          if(answers.done){
            clearme();
            generateProject(answers);
          } 
  }, 500);

}

init();

