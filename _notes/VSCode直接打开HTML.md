## VSCode直接打开HTML

https://stackoverflow.com/questions/30039512/how-to-view-my-html-code-in-browser-with-visual-studio-code

配置使用VSCode中直接使用浏览器打开HTML文件

command+shift+p，输入config task，选择default，输入如下内容

```
{
  "version": "0.1.0",
  "command": "Chrome",
  "osx": {
      "command": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  },
  "args": [
      "${file}"
  ]
}
```

保存后 command+shift+b即可打开所在html文件