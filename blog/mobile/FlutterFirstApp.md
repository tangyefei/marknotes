# Flutter First App


本篇是参考官网的例子熟悉Drat/Flutter的基本用法的一些记录。

## Part 1

[https://flutter.dev/docs/get-started/codelab](https://flutter.dev/docs/get-started/codelab)

第一部分的例子会生成可以无限滚动的名字列表，让用户选择合适作为创业公司名字的那些项。该部分包含了如下的知识点，你可以z选择用设备或者模拟器来配合功能：

- 书写出在iOS和Android上看起来自然的应用
- 了解Flutter应用的结构
- 使用和查找packagesk来实现功能的继承
- 使用hot reload来支持更快的开发
- 实现带状态的组件
- 创建无穷的、懒加载的列表

### Step1 先照着例子看效果

lib/main.dart

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

### Step2 引入外部库


我们再项目的 pubspec.yaml 中的 dependencies中增加（VSCode为编辑器）

```
 english_words: ^3.1.0
```

保存胡会自动执行 `flutter packages get` 执行去获取它。

在 lib/main.dart 中增加引入

```
import 'package:english_words/english_words.dart';
```

在 build 方法中用 english_words.dart 生成的文字替换静态文字：

```
...
final wordPair = WordPair.random();
...
child: Text(wordPair.asPascalCase),
```
 
重新打开模拟器即可看到面板中展示的文字发生了变化，并且每次打开都会不同。在VSCode中，在Terminal上按照指引，每次按 r 就可以 reload 在模拟器上的内容。
 
 ### Step3 添加带状态的组件
 
在 lib/main.dart 中增加如下代码
 
```

class RandomWords extends StatefulWidget {
  @override
  RandomWordsState createState() => RandomWordsState();
}

class RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();
    return Text(wordPair.asPascalCase);
  }
}

```

删除在Step 2中增加的代码行

```
final wordPair = WordPair.random();
```

将body中child部分内容替换为

```
child: RandomWords(),
```

在 Terminal 中按 R 可以restart模拟器，并看到改动生效。

## Step4 

将RandomWordsState修改为如下

```

class RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];
  final _biggerFont = const TextStyle(fontSize: 18.0);

  @override
  Widget build(BuildContext context) {
    // final wordPair = WordPair.random();
    // return Text(wordPair.asPascalCase);
    return Scaffold(
      appBar: AppBar(
        title: Text('Startup Name Generator'),
      ),
      body: _buildSuggestions(),
    );
  }

  Widget _buildRow(WordPair pair) {
    return ListTile(
      title: Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
    );
  }

  Widget _buildSuggestions() {
    return ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemBuilder: /*1*/ (context, i) {
          if (i.isOdd) return Divider(); /*2*/

          final index = i ~/ 2; /*3*/
          if (index >= _suggestions.length) {
            _suggestions.addAll(generateWordPairs().take(10)); /*4*/
          }
          return _buildRow(_suggestions[index]);
        });
  }
}
```

MyApp改成如下代码，重启后可以看到滚动列表生效：

```

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    
    return MaterialApp(
      title: 'Startup Name Generator',            
      home: RandomWords(),
    );
  }
}
```

关于 `i ~/ 2` 应该类似JavaScript中的  `pasreInt(i / 2)`，至于 `generateWordPairs` 来自哪里，有点不明白，猜想应该是引用了 `english_words` 就直接可用的，使用习惯上还是有很大差异。


## Part 2

[https://codelabs.developers.google.com/codelabs/first-flutter-app-pt2](https://codelabs.developers.google.com/codelabs/first-flutter-app-pt2)

### Step1 给列表新增图标


```
class RandomWordsState extends State<RandomWords> {
  final Set<WordPair> _saved = Set<WordPair>();   // Add this line.
  ...
}
```

```
Widget _buildRow(WordPair pair) {
  final bool alreadySaved = _saved.contains(pair);  // Add this line.
  ...
}
```

```
Widget _buildRow(WordPair pair) {
  final bool alreadySaved = _saved.contains(pair);
  return ListTile(
    title: Text(
      pair.asPascalCase,
      style: _biggerFont,
    ),
    trailing: Icon(   // Add the lines from here... 
      alreadySaved ? Icons.favorite : Icons.favorite_border,
      color: alreadySaved ? Colors.red : null,
    ),                // ... to here.
  );
}
```

### Step2 增加交互

```
Widget _buildRow(WordPair pair) {
  final alreadySaved = _saved.contains(pair);
  return ListTile(
    title: Text(
      pair.asPascalCase,
      style: _biggerFont,
    ),
    trailing: Icon(
      alreadySaved ? Icons.favorite : Icons.favorite_border,
      color: alreadySaved ? Colors.red : null,
    ),
    onTap: () {      // Add 9 lines from here...
      setState(() {
        if (alreadySaved) {
          _saved.remove(pair);
        } else { 
          _saved.add(pair); 
        } 
      });
    },               // ... to here.
  );
}
```
### Step3 跳转到新页面

```
class RandomWordsState extends State<RandomWords> {
  ...
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Startup Name Generator'),
        actions: <Widget>[      // Add 3 lines from here...
          IconButton(icon: Icon(Icons.list), onPressed: _pushSaved),
        ],                      // ... to here.
      ),
      body: _buildSuggestions(),
    );
  }
  ...
}
```

```
oid _pushSaved() {
  Navigator.of(context).push(
    MaterialPageRoute<void>(
      builder: (BuildContext context) {
        final Iterable<ListTile> tiles = _saved.map(
          (WordPair pair) {
            return ListTile(
              title: Text(
                pair.asPascalCase,
                style: _biggerFont,
              ),
            );
          },
        );
        final List<Widget> divided = ListTile
          .divideTiles(
            context: context,
            tiles: tiles,
          )
              .toList();

        return Scaffold(         // Add 6 lines from here...
          appBar: AppBar(
            title: Text('Saved Suggestions'),
          ),
          body: ListView(children: divided),
        );                       // ... to here.
      },
    ),
  );
}
```

## Step4 更改主题

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Startup Name Generator',
      theme: ThemeData(          // Add the 3 lines from here... 
        primaryColor: Colors.white,
      ),                         // ... to here.
      home: RandomWords(),
    );
  }
}
```