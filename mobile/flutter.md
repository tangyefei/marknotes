# Flutter的初探

Flutter的热度很高，在项目中即将开始应用它，本篇简单介绍如何在MacOS中安装和配置一个Hello World（支持在IOS模拟器 和 Android模拟器上运行）。

参考地址：[https://flutter.dev/docs/get-started/install/macos](https://flutter.dev/docs/get-started/install/macos)

## Flutter SDK安装


下载 [Flutter SDK](https://storage.googleapis.com/flutter_infra/releases/stable/macos/flutter_macos_v1.5.4-hotfix.2-stable.zip) 并解压到对应目录

```
$ mkdir ~/Documents/applications
$ cd ~/Documents/applications
$ mv ~/Downloads/flutter_macos_v1.5.4-hotfix.2-stable.zip ./flutter.zip
$ unzip ./flutter.zip

```


获取到Flutter SDK的目录用于配置`$PATH`

```
$ cd flutter
$ pwd  

# 例如 
# /Users/yefeitang/Documents/applications/flutter
```

打开 ~/.bash_profile 追加一行，保存后执行 source


```
$ vim ~/.bash_profile

# 追加如下一行
# PATH="/Users/yefeitang/Documents/applications/flutter/bin/:${PATH}"

$ source ~/.bash_profile

```
## 在iOS上运行第一个Flutter程序

### 检查运行在iOS上的所需的工具

我们可以执行`flutter doctor`命令来检查需要安装的其他工具，如下为在iOS这一项上的输出：

```
[✗] iOS toolchain - develop for iOS devices
    ✗ Xcode installation is incomplete; a full installation is necessary for iOS development.
      Download at: https://developer.apple.com/xcode/download/
      Or install Xcode via the App Store.
      Once installed, run:
        sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
    ✗ libimobiledevice and ideviceinstaller are not installed. To install with Brew, run:
        brew update
        brew install --HEAD usbmuxd
        brew link usbmuxd
        brew install --HEAD libimobiledevice
        brew install ideviceinstaller
    ✗ ios-deploy not installed. To install:
        brew install ios-deploy
    ✗ CocoaPods not installed.
        CocoaPods is used to retrieve the iOS platform side's plugin code that responds to your plugin usage on the Dart side.
        Without resolving iOS dependencies with CocoaPods, plugins will not work on iOS.
        For more info, see https://flutter.dev/platform-plugins
      To install:
        brew install cocoapods
        pod setup
```

#### XCode安装


在 [https://developer.apple.com/download/more/](https://developer.apple.com/download/more/) 可以看到可供下载的XCode版本，尝试下载跟自己系统兼容的XCode版本，无法用迅雷下载，用浏览器下载到一半失败了，无奈把操作系统升级到了最新版本，然后通过App Store安装了最新版本的XCode。


然后在执行 `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer` 即可。


####  其他工具安装

按照上述输出的log执行安装即可，可能也需要耗费一些时间。


```
$ flutter doctor
```

### 打开iOS模拟器

使用命令行可以打开iOS模拟器 

```
$ open -a Simulator
```

在 `Simulator > Hardware > Device` 中可以选择模拟的设备

在 	`Simulator > Window` 中有若干选项可以调整展示尺寸

### 创建第一个Flutter App

```
$ cd ~/Documents/projects
$ flutter create my_first_flutter
$ cd my_first_flutter
$ flutter run
```

### Hello World

参考[https://flutter.dev/docs/get-started/codelab](https://flutter.dev/docs/get-started/codelab) 的 `Step 1: Create the starter Flutter app`部分，将 lib/main.dart 中的内容替换为 

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```

然后再在项目目录下执行 `flutter run` 即可看到 Hello World生效。

### 更进一步

#### 

## 在Andriod上运行第一个Flutter程序

要在安卓设备上使用Flutter，必须安装Android Studio，因为依赖它来提供各种依赖。但是可以使用全天的代码编辑器来书写你的代码。


### 安装Android Studio

[下载Android Studio](https://developer.android.com/studio)，第一次打开时，Android Studio Setup Wizard 会引导安装开发所需：

- Android SDK
- Android SDK Platform-Tools 
- and Android SDK Build-Tools

### 配置Andriod模拟器

1. 打开电脑的 VM acceleration（自己跳过了似乎没什么影响）
2. 创建虚拟设备：Android Studio > Tools > Android > AVD Manager，选择Create Virtual Device，然后创建自己所需要的设备类型，system image推荐选择 x86 或 x86_64类型，在 Emulated Performance 中，选择 Hardware - GLES 2.0 用于激活硬件加速（自己实操作的时候发现不能选），确认无误后就创建成功了。
3. 在 Android Virtual Device Manager 所创建的设备列表中，点击 run 的图标就可以打开模拟器展示默认的图案。

### 运行Hello World

同理打开Android Studio中选择 New Flutter Project，然后手动修改 lib/main.dart，然后在编辑器的右上角的bar上可以选择运行它即可（注：并非最顶部的位置，自己也好找了一会儿）。
 


