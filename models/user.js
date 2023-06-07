const mongodb=require('mongodb')
const getDb=require('../util/database').getDb
const ObjectId=mongodb.ObjectId
class User{
  constructor(username,email,cart,id){
this.name=username,
this.email=email,
// this.cart=cart//item:[]
this.cart = {
  items: [] // Initialize as an empty array
};
this._id=id
  }
  save(){
const db=getDb()
return db.collection('users')
.insertOne(this)


  }

addToCart(product){
const cartProductIndex = this.cart.items.findIndex(cp=>{
  return cp.productId===product._id.toString()
  ///or  return cp._id==product._id

})
let newQuantity=1
const updatedcartItem=[...this.cart.items]

if(cartProductIndex>=0){
newQuantity=this.cart.item[cartProductIndex].quantity+1
updatedcartItem[cartProductIndex].quantity=newQuantity

}else{
  updatedcartItem.push({productId:new ObjectId(product._id),quantity:newQuantity})
}

const updateCart={
  // items:({...product,quantity:1})}
  // item:[{productId:new ObjectId(product._id),quantity:1}]
  item:updatedcartItem
}
const db=getDb()
return db.collection('users')
.updateOne({_id:new ObjectId(this._id)},
{$set: {cart:updateCart}})

}
    static  findById(userId){
      const db=getDb()
      return db.collection('users').findOne({_id:new ObjectId(userId)})
      .then(user=>{console.log(user)
        return user
      }).catch(err=>console.log(err))
      
  }
}

module.exports=User