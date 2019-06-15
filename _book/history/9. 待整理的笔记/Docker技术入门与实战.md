Docker技术入门与实战



# 前言

- 第一部分 Docker技术点基础只是介绍
- 各种典型场景和应用案例
- 偏技术黄姐的高级话题

根据自身需求选择阅读重点。

# 第1章 初始Docker

可以简单地将Docker容器理解为一种沙盒（Sandbox）。每个容器内部运行一个应用，不同容器之间相互隔离，容器之间也可以建立通信机制。容器的创建和停止都十分快速，容器自身对资源的需求也十分有限，远低于虚拟机。很多时候，甚至直接把容器当做应用本身也没有任何问题。

基于LAMP运维网站，进行各种安装和测试，服务器迁移的话往往要重新部署和调试。Docker提供了一种更聪明的办法，通过容器来打包应用，只需要在新的服务器上重启需要的容器即可。

一张图说明问题：

![传统虚拟化方式 vs Docker虚拟化方式]()

传统方式是在硬件层面进行虚拟化，需要有而额外的虚拟机管理应用和虚操作系统层。Docker而容器是在操作系统层面上实现虚拟化，直接复用本地主机的操作系统，因此更加轻量级。

# 第2章 Docker的核心概念和安装

- Docker镜像：镜像是创建Docker容器的基础，类似于虚拟机镜像，可以将它理解为一个面向Docker的只读模板，包含了文件系统。
- Docker容器：是一个轻量级沙盒，用来运行和隔离应用。可以看做一个简易版的Linux系统环境。
- Docker仓库：类似于代码仓库，是Docker集中存放镜像文件的场所。

## Docker Mac OS上的安装

在Mac上使用Docker除了安装Docker外还要安装BootDocker工具的支持

- download and install docker
- open Boot2Docker
- init Boot2Docker by execute commands:

```
$ boot2docker init
$ boot2docker start
$ $(boot2docker shellinit)
```

虚拟机初始化成功以后就可以通过如下命令来控制它： 

```
$ boot2docker stop
$ boot2docker start
```

执行export来设置Docker的主机地址：

```
export DOCKER_HOST=tcp://192.168.59.103:2376
``` 
# 第3章 Docker镜像
- 获取镜像
- 查看镜像
- 搜寻镜像
- 删除镜像
- 创建镜像
	- 基于已有镜像的容器创建
	- 基于本地模板导入
	- 基于Dockfiler创建
- 存储和载入镜像
- 上传镜像

#!/bin/bash
/usr/sbin/sshd -D



# 第4章 容器

- 创建容器
- 终止容器
- 进入容器
- 删除容器
- 导入和导出容器

# 第5章 仓库

- Docker Hub
- Docker Pooler简介
- 创建和使用私有仓库

# 第6章 数据管理


- 数据卷
- 数据卷容器
- 利用数据卷容器迁移数据

# 第7章 网路基础配置

- 端口映射实现访问容器
- 容器互连实现容器间通信

# 第8章 使用Dockerfile创建镜像

- 基本结构
- 指令
- 创建镜像

# 第9章 实战案例

本章介绍如何使用Docker安装和使用***等操作系统。

# 第10章 创建支持SSH服务的镜像

本章介绍如何自行创建一个带有SSH服务器的镜像。并介绍两种创建容器的方法：基于docker commit命令创建和基于Dockerfile创建。



## 基于commit命令创建




sed -ri 's/session    required    pam_loginuid.so/#session    required pam_loginuid.so/g' /etc/pam/sshd 




