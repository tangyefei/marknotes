#### ElementUI一些实践总结


**附件上传逻辑**

在el-upload组件内定义中包含一个数组`uploadList`，它表示上传成功的文件列表，随着上传成功、移除附件成功，都是对该对象列表的维护。

但在使用 el-upload 的时候通常还会传入一个 `:file-list="fileList"` 对象，它表示我们将用`fileList`来初始化组件中的 `uploadList`对象。

任何时候只要fileList对象发生改变，它将会单向同步到组件内的 uploadList 中，因此我们如果希望拿到`uploadList`的数据，用于做判断（比如判定是否展示添加更多附件的 `+` 号），有两种做法：

（1）通过在 `el-upload` 中增加`ref='upload'`，在通过 this.$refs['upload'].uploadList即可拿到，问题在于不可实时。

（2）通过 on-success 和 on-remove 事件来获取到 新增 或 移除 的file对象，然后将它同步到我们传时使用的fieList对象中，可以实时。

最终我们提交数据到后端的时候，再将`fileList`中的数据结构转化为我们期望的数据结构即可。

**附件上传钩子**

`handleUploaded(file, fileObj, fileList)`的表现需要注意：

（1）单次上传多个附件，只触发handleUploaded一次，因此需要同步上传过的文件只能使用fileList

（2）假定上传了1个附件后，再上传2个附件触发handleUploaded时fileList的长度为3










