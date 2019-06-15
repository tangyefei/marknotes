boxen发布教程

### Boxen简介


参考： [Box介绍](http://www.sitepoint.com/boxen-quit-worrying-tools/)


###### 什么是Boxen

在项目启动初期免不了要搭建环境、安装插件、数据库，Boxen就是为了解决这样的问题而存在的（目前只有OSX上适用）。Boxen有非常多的库能够做到非常多的很酷的事情，并且有着强大的群体在支撑着它，你也能创建自己的库（参考[这里](https://github.com/boxen/puppet-template)）。

###### Boxen的发展历程


Boxen最早开始于一个Github项目，随着Boxen为大家所熟知，为了让大家方便适用开发者决定抽取特性并且做好封装。 

###### Boxen的使用

Boxen使用了[Puppet](https://puppetlabs.com/)，一个配置管理工具来搞定所有困难的工作。使用它之前，写好项目的[manifest](https://github.com/boxen/our-boxen/tree/master/modules/projects#project-manifests)然后其他人就可以直接通过运行命令来获取所有需要的依赖库。

###### 一些你应该了解的

- Boxen只能在Macs上工作
- Boxen需要安装Xcode Command Line Tools
- Boxen不会跟安装的rvm协同工作
- Boxen对于Github上用户名有“-”可能会有问题 
- Boxen跟rbenv在一起可能会有问题
- Boxen跟homebrew在一起可能会有问题
- Boxen跟nvm在一起可能会有问题
- Boxen推荐安装full Xcode.

[Boxen repository ](https://github.com/boxen/our-boxen)有一些入门教程。
[ready-to-use libraries](https://github.com/boxen)有很多可用的现成的库。


**Puppetfile**

。。。

**Manifest**

。。。


###### 用Boxen快速获取依赖库
- 安装XCode和commoand line tools
- 克隆boxen的资源库到/opt文件夹
- 运行script/boxen


###### The Ultimate Tools Package


Use Boxen to set up a new machine, install VirtualBox, Vagrant, your favorite editor, and anything else you need. Once it’s done, use Vagrant to download the projects Box and setup a full environment. No fuss, no mess.


### Boxen安装

[项目地址](https://github.com/boxen/our-boxen)






