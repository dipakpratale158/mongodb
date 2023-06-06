// const mongodb = require('mongodb');
// const MongoClient=mongodb.MongoClient;

// const mongoConnect=(callback)=>{

// let _db
// MongoClient.connect('mongodb+srv://dipakpratale158:9637570697d@cluster0.bxsjizd.mongodb.net/shop?retryWrites=true&w=majority')
//   .then(client=>{
//   console.log("connected")
//   _db=client.db('')
//   callback()
// }).catch(err=>{
//   console.log("err")
// })

// }
// const getdb=()=>{
//   if(_db){
// return _db
//   }
//   throw  'no database found'
// }
// module.exports=mongoConnect
// module.exports=getdb


const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://dipakpratale158:9637570697d@cluster0.bxsjizd.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
