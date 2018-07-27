
function cb(newVal){
    console.log('视图渲染了'+newVal)
}
/* 通过 Object.defineProperty 来实现对对象的「响应式」化 */
function defineReactive(obj,key,val){
    Object.defineProperty(obj,key,{
        enumerable: true,       /* 属性可枚举 */
        configurable: true,     /* 属性可被修改或删除 */
        get:function reactiveGetter(){
            return val;
        },
        set:function reactiveSetter(newVal){
            if(newVal === val) return val;
            cb(newVal)
        }
    })
}
/* 通过遍历所有属性的方式对该对象的每一个属性都通过 defineReactive 处理 */
function observer(obj){
    if(!obj || typeof obj !== 'object'){
         return ;
    };

    Object.keys(obj).forEach(function(key){
        defineReactive(obj,key,obj[key]);
    })
}
/* Vue类 */
class Vue{
   constructor(options){
       this._data = options.data;
       observer(this._data);
   }
}
