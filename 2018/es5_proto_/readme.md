原文：[掘金](https://juejin.im/post/5c08ba1ff265da612577e862)
<br>
示意图：<br>
<p>
    <img src="https://raw.githubusercontent.com/yuminjustin/jfaver/master/2018/es5_proto_/示意图.jpg">
</p>

      function Parent(){
           this.name = 'parent';
      }
      var parent1 = new Parent()
      
      parent1.__proto__ === Parent.prototype   // true
      
      parent1.__proto__.constructor === Parent   // true
      
      Parent.prototype.constructor === Parent   // true
      
      Parent.prototype.__proto__ === parent1.__proto__   //false
