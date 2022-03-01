（ts:4.5.5)
### 1、设置window全局
     
##### 方式一：在入口文件加入以下代码
          declare global {
             interface Window {
                自定义key: 类型;
             }
           }
##### 方式二：在入口（例如：src目录）新建index.d.ts
          interface Window {
               自定义key: 类型;
          }
           
### 2、antd会报错

#### 安装  @types/react
