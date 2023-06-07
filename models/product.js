///////////////////requier entier object id 
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  ///when creating 
  constructor(title, price, description, imageUrl,id,userId) {
    this.title = title;
    this.price = price;
    this.description = description;

    this.imageUrl = imageUrl;

    this._id=id ?new mongodb.ObjectId(id):null
    this.userId=userId
  }

  save() {
    const db=getDb()
    let dbop
    if(this._id){ 
      //update product
      dbop=db.collection('products').updateOne({_id: this._id},{$set:this})

    }else{
dbop=db.collection('products')
.insertOne(this)
    }
    return dbop
      
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }


  ////////////////////////PRODUCTID Singleproduct
  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      /////////////////////if this line added then show product
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }






  ///////delete
  static deleteById(prodId){
  const db=getDb()
  return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
  .then((result)=>console.log("deleted"))
  .catch((err)=>console.log("err"))
}
}

module.exports = Product;
