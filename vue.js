
/* 通过 Object.defineProperty 来实现对对象的「响应式」化 */
function defineReactive(obj,key,val){
    var dep = new Dep();
    Object.defineProperty(obj,key,{
        enumerable: true,       /* 属性可枚举 */
        configurable: true,     /* 属性可被修改或删除 */
        get:function reactiveGetter(){
            /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
            dep.addSub(Dep.target);
            return val;
        },
        set:function reactiveSetter(newVal){
            if(newVal === val) return val;
            /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
            dep.notify();
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
/* 订阅者Dep */
class Dep{
    constructor(){
        this.subs = [];  //用来存放Watcher对象的数组
    }
    /* 在subs中添加一个Watcher对象 */
    addSub(sub){
        this.subs.push(sub);
    }
    /*通知所有Watcher对象更新视图 */ 
    notify(){
        this.subs.forEach(sub=>{
            sub.updata()
        })
    }
}
/* 观察者Watcher */ 
class Watcher{
    constructor(){
        /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
        Dep.target = this;
    }
    /* 更新视图的方法 */
    update() {
        console.log("视图更新啦～");
    }
}
/* 定义Vue类 */
class Vue{
   constructor(options){
       this._data = options.data;
       observer(this._data);
   }
}
