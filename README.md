## zapp 脚手架模板


### 方法一、全局安装create-ehome-template 推荐

```
  npm install create-ehome-template -g
  create-ehome-template test-app
  cd test-app
  npm install
  npm start
  npm build
```

### 方法二、 git clone git@10.1.1.217:eh-front-end/ehome-template.git 

```
  git clone git@10.1.1.217:eh-front-end/ehome-template.git 
  <!-- 如果直接在zapp项目里头clone，需要去掉git仓库的绑定 -->
  rm -rf ./ehome-template/.git
  git add .

  cd ehome-template
  npm install
  npm start
  npm build

```
然后自行将package.json的name ehome-template 和文件夹名字改掉


## 方法三、 （暂不使用，正在拓展）全局安装create-ehapp 也能使用。 方便以后拓展。

```
  npm install create-ehapp -g
  create-ehome-app test-app
  cd test-app
  npm run eject
  npm run start 本地调试
  npm run build 代码构建
```


```
project
└───config 配置文件夹
└───public 入口文件html   
└───build  打包后文件夹
└───script 启动打包脚本
│   
└───src 业务开发
    └─── images 图片统一存放的位置
    │
    └─── components 通用组件, 需要通用组件自己加，默认有一个 AuthComponent
    │       │
    │       └─── AuthComponent 用于授权所用，业务一般不需要管，需要对授权特殊管理才管
    │
    └─── routes 路由页面
    │       │
    │       │
    │       └───login 登录页面 调试用，点击登录，可跳转到首页
    │       │           
    │       └───home 默认首页
    │       │     └─components home 页面 抽出来的组件
    │       │     └─index.js 
    │       │     └─index.less
    │       │
    │       │
    │       ...
    └─── index.js 入口文件，配置路由,新增界面的话再这里配
    │
    └─── index.less 通用样式，重置默认样式
```

## 项目命名规则
例：test-app test-aha-app 

## 配置广场入口链接

配置入口链接

举例：

旧授权："url":"${home.url}/test-app/build/index.html#/home?ns=11#sign_suffix"

新授权: "url":"${home.url}/test-app/build/index.html#/home?ns=11
