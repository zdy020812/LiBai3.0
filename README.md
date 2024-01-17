## 系统在线访问网址:https://zdy020812.github.io/LiBai3.0/

## 前言
### 1. Markdown教程

* **[Markdown教程](https://markdown.com.cn/basic-syntax/)**<br>
* **[在线Markdown查看器](https://c.runoob.com/front-end/712/)**

### 2. 将gitee上的代码克隆到本地的具体操作如下:


1. 新建空白文件夹,建议英文命名.
2. 右击该文件,点击git bash here,然后输入git init
3. 找到仓库的复制连接(点击克隆/下载按钮即可出现),输入git remote add origin XX, XX为(刚刚复制的地址)
4. 然后输入git pull origin master


### 3. 克隆下来之后,提交代码操作如下:


1. 右键文件夹,点击git bash here,输入git pull origin 分支名 (更新代码,默认主分支名为master)
2. 输入git checkout -b 分支名 (在本地创建分支，master分支不需要)
3. 输入git add . (注意add后面是空格, 然后一个点)
4. 输入git commit -m"XXX" （XXX指对上传代码的说明）
5. 提交主分支git push origin master;
  其他分支：git push -u origin 分支名 (提交主分支不要 -u,默认主分支名master)


## 项目结构及框架布局

* **node_modules**
该文件夹为一些安装包
* **public**
该文件夹里面存放一些公共文件，以供使用
* **src**
  * **api**
  * **assets**
    * **json**: 存放静态json文件 
    * **picture**: 存放静态图片 
  * **components**: 里面为子组件
  * **plugins**: 插件的封装调用
  * **router**: 配置路由 
  * **store**: 配置vuex
  * **utils**: axios接口
  * **views**: 路由跳转的主视图组件
  * **App.vue**: 主vue组件
  * **main.js**: 挂载主组件及相关
  * **style.css**: 主css文件
* **index.html**
该文件为主html代码文件
* **package.json**
该文件查看安装的包
* **vite.config.js**
该文件设置vite框架相关

## 环境要求

- **`node.js`**（建议 >= v19.9.0）
- **`npm`** （建议 >= v9.6.3）
- **`yarn`**（建议 >= 1.21.0）

## 已知bug
* 以下bug暂时还未修复
  * 无
* 以下bug不知道怎么修复
  * 无
