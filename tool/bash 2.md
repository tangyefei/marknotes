# 应该掌握Linux基础


### Linux内核和发行套件的区别

前者是由Linus Torvalds负责维护的系统核心程序。
后者是指Linux操作系统，包含了内核+各种常用软件。

### 最流行的Linux操作系统

**RHEL, RedHat Enterprise Linux**

红帽是全球最大的开源技术商，RHEL是使用最广泛的Linux系统。

**CentOS, Community Enterprise Operation System**

通过把RHEL系统重新编译并发布给用户免费使用的Linux系统。

**Fedora**

红帽公司发布的包含最新技术和工具的系统套件。

**openSUSE**

源自德国。

**Gentoo**

高度自定制，操作复杂。

**Debian**

稳定，安全，免费的基础支持。

**Ubuntu**

派生自Debian的，对新款硬件有着极强的兼容能力**



### 操作系统是如何进行包管理的

大多数Linux系统提供了中心化的包管理机制用来搜索和安装软件。不同系统的打包格式和工具因平台而异：


|  操作系统 | 格式  |  工具  | 
|---|---|---|
| CentOS/Fedora  |  .rpm  |  yum/dnf  |   
| Debian/Ubuntu  |  .deb  |  apt  |   
| FreeBSD  |  .txz  |  make, pgk  |   

### 有用的Shell命令

`rm`

- `-r`, remove directories and their contents recursively 
- `-f`, ignore nonexistent files, never prompt
- `rmdir`, remove empty directory

如果只是`-r`递归删除某个目录会依次询问是否要删除子结构，`-f`跳过提示直接删除，`-fr`可以结合使用。


`ps -aux | less`

ps, process status
`-aux` 
  - -a option tells ps to list the processes of all users on the system rather than just those of the current user,
  - -u option tells ps to provide detailed information about each process
  - -x option adds to the list processes that have no controlling terminal
  - less used to pipe the command, pressing the SPACE bar or b key for forward or back.

`ps -ef | grep adam`

- -e option generates a list of information about every process currently running. 
- -f option generates a listing that contains fewer items of information for each process
- grep, a filter that is used for searching text

`chmod -R 777 /srv/marketing`

add persmission recursively: 

`$ mv -[fiu] source/* target`

- f: 强制覆盖
- i：询问是否覆盖
- u：只有在文件更新才会覆盖

Notice: the move is't not recursively, if you not wanna to overwrite useful file use the `-i` and move the conflict files mannually or by execute command for deeper location.


### 可执行命令无法被识别

[PATH Definition](http://www.linfo.org/path_env_var.html)

PATH中定义了所有会去寻找的可执行的目录，可以通过 `env | grep PATH` 或 `echo $PATH` 找到。

如果安装的某个执行文件没被找到，可以将所在目录添加到PATH中即可，例如 `export PATH=$PATH:/usr/sbin`。
