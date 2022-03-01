### 1、设置window全局
     
##### 方式一：在入口文件加入以下代码
          declare global {
             interface Window {
                自定义key: 类型;
             }
           }
           
##### 方式二：tsconfig.json设置
          "typeRoots": [
            "./typings"   // 指定目录
          ]
          
           //typings目录下index.ts
           interface Window {
               自定义key: 类型;
           }

          
