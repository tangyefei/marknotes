# Bash Commond Using Guide

## move all files to another folder

```
$ mv -[fiu] source/* target
```

- f: 强制覆盖
- i：询问是否覆盖
- u：只有在文件更新才会覆盖

Notice: the move is't not recursively, if you not wanna to overwrite useful file use the `-i` and move the conflict files mannually or by execute command for deeper location.