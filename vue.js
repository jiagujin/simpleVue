
/* 通过 Object.defineProperty 来实现对对象的「响应式」化 */
function defineReactive(obj,key,val){
    let dep = new Dep();

    Object.defineProperty(obj,key,{
        enumerable: true,       /* 属性可枚举 */
        configurable: true,     /* 属性可被修改或删除 */
        get:function reactiveGetter(){
            dep.depend();
            return val;
        },
        set:function reactiveSetter(newVal){
            if(newVal === val) return val;
            dep.notify()
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
/*依赖收集中的Dep类 充当发布者的作用*/
class Dep{
    constructor(){
        this.subs = []
    }
    depend(){
        if(Dep.target){
            this.subs.push(Dep.target)
        }
    }
    notify(){
        this.subs.forEach(item=>{
            item.update()
        })
    }
}
/* 依赖收集中的Watcher */
class Watcher{
    constructor(){
        Dep.target = this;
    }
    /* 更新视图的方法 */
    update () {
        console.log("视图更新啦～");
    }
}
/* 定义Vue类 */
class Vue{
   constructor(options){
       this.data = options.data;
       observer(this.data);
   }
}
