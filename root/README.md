#{%= type%}.{%= name %}

## 最新版本

**{%= version%}**

## 安装依赖

运行 `npm install`，来安装所需的依赖模块。关于NPM的知识，请参见[nodejs](http://nodejs.org/);

## 用Grunt打包

运行 `grunt`，来对项目进行打包。关于Grunt的知识，请参见[gruntjs](http://gruntjs.com/);

## 请忽略.svnignore 中的目录和文件

忽略方法（命令行）

    $ svn propedit svn:ignore .

输入需要忽略的文件名或者目录名

## 如何使用

### 开发及时调试

    grunt dev

### 从头打包部署

    grunt

### 提交发布

    grunt publish


未完待续