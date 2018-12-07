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


SomeOne.prototype = new Parent(); 这个操作把父类的实例给了SomeOne的原型，所以通过这个我们就可以找到父级的name，这就是原型链，一层一层的，像一个链条；
