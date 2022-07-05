class Observer {
    constructor() {
        this.eventMap = {}
    }
    /**
     * 注册事件
     * @param {String} event 事件名称 
     * @param {Function}  fn 回调函数 
     */
    on(event, fn) {
        const map = this.eventMap
        if (!map[event]) {
            map[event] = []
        }
        map[event].push(fn)
    }
    /**
     * 触发事件
     */
    emit(event, ...args) {
        const map = this.eventMap
        if (map[event].length) {
            map[event].forEach(fn => {
                fn.apply(null, args)
            });
        } else {
            console.error('无待执行函数')
        }
    }
    /**
     * 移除事件
     */
    off(event, fn) {
        const map = this.eventMap
        const index = map[event]?.indexOf(fn)
        if (index > -1) {
            map[event].splice(index, 1)
        } else {
            console.error('目标函数不存在')
        }
    }
    /**
     * 注册只执行一次的事件
     */
    onOnce(event, fn) {
        const self = this
        function on() {
            fn.apply(null, arguments)// 先执行fn
            self.off(event, on)// 立刻移除fn
        }
        this.on(event, on)// 注册代理函数
    }
}
/*
const o= new Observer()
o.on('change',()=>{console.log('我第一次注册')});
o.on('change',()=>{console.log('我又注册了一次')});
*/
