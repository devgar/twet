'use strict'

const CFG = require('./lib/config');

CFG.getLogin( (err, cfg)=>{
  if(err) return err;
  
  const T = new (require('twit'))(cfg);
  T.post('statuses/update', 
          {status: process.argv.slice(2).join(' ')},
          (err, data, res) => {
            if(err)return console.log('Error:',err);
            console.log(data);
          });
  
});
