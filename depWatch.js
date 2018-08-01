let salesOffices = {} // 售楼处
salesOffices.books = [] // 缓存列表，存放订阅者的回调函数。
// 增加订阅者
salesOffices.listen = function(fn) {
  this.books.push(fn) // 订阅的消息添加近缓存列表里面
}
salesOffices.trigger = function() {
  // 发布消息
  for (let i = 0;i<salesOffices.books.length;i++ ) {
     salesOffices.books[i].apply(this, arguments)
  }
}

salesOffices.listen(function(price, squareMeter) {
  // 购买者a
  console.log(`价格是：${price}:购买者a`)
  console.log(`面积大小：${squareMeter}:购买者a`)
})
salesOffices.listen(function(price, squareMeter) {
  // 购买者b
  console.log(`价格是：${price}:购买者b`)
  console.log(`面积大小：${squareMeter}:购买者b`)
})

salesOffices.trigger(2000000, 88)
salesOffices.trigger(3000000, 128)