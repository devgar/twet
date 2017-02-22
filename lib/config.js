'use strict'

const fs = require('fs');
const os = require('os');
const path = require('path');

const TWETDIR = path.join(os.homedir(), '.twet');
const LGNPATH = path.join(os.homedir(), '.twet', 'login.json');

function ensureOrCreate(cb){
  fs.stat(TWETDIR, (err, stats) => {
    if(!err)return cb(null, stats);
    fs.mkdir(TWETDIR, (err)=> {
      if(err) return cb(err);
      fs.stat(TWETDIR, (err, stats) => {
        cb(err, stats);
      });
    });
  });
}
function getLoginConfig( cb){
  ensureOrCreate( (err, stats)=>{
    if(err) return cb(err);
    fs.readdir(TWETDIR, (err, files)=>{
      if(err) return cb(err);
      if(files.indexOf('login.json')>=0)
        return cb( null, require(LGNPATH))

      require('inquirer').prompt([
        {name:'consumer_key', message:'Consumer Key'},
        {name:'consumer_secret',message:'Consumer Secret'},
        {name:'access_token',message:'Access Token'},
        {name:'access_token_secret',message:'Token Secret'}
      ]).then( (answers)=>{
        fs.writeFile(LGNPATH ,JSON.stringify(answers), (err)=>{
          cb(null, answers);
        });
      });
    });
  });
}

module.exports = {
  getLogin : getLoginConfig
}
