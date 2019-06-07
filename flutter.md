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

## 在Andriod上运行第一个Flutter程序






安装 [Android Studio](https://developer.android.com/studio)

打开 Android Studio 在 'Android Studio Setup Wizard' 中安装最新的 Android SDK、
Android SDK Platform-Tools、Android SDK Build-Tools。

下载安装某些包的时候发现无法获取到，暂且先不管，直接跳过，进行下一步。


执行 flutter doctor 发现的若干问题

`android/repositories.cfg could not be loaded.`

执行 `flutter doctor --android-licenses` 然后依次approve即可。

`Flutter plugin not installed; this adds Flutter specific functionality.`

在 Plugins 中 去搜索安装 Flutter 即可。

`Dart plugin not installed; this adds Dart specific functionality.`

同理搜索安装即可。

`No devices available`

手机虽然连接了，但是侦测不到，暂时忽略继续往前推，也许使用模拟器也行。
