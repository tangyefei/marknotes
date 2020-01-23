# 2019/11/27


## JavaScript: 浏览器的工作原理


[浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Style_sheets)。

## 算法：LeetCode 3Sum

[https://leetcode.com/problems/3sum/](https://leetcode.com/problems/3sum/)

```
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) { let result = [];
          
      if(nums.length < 3) return result;

      nums = nums.sort((a,b) => {return a - b;});

      for (let i = 0; i < nums.length - 2; i++) {

        if(nums[i] > 0) return result;

        if(i > 0 && nums[i] === nums[i - 1]) {
          continue;
        }

        let j = i + 1, k = nums.length - 1;

        while(j < k) {
          let sum = nums[i] + nums[j] + nums[k];
          if(sum === 0) {
            result.push([nums[i], nums[j], nums[k]]);
            j ++;
            k --;
            while(nums[j] === nums[j - 1]) j++;
            while(nums[k] === nums[k + 1]) k--;
          } else if(sum  < 0) {
            j ++;
          } else {
            k --;
          }
        }
      }
      return result;
    
};
```
## Vue: 组件动态加载

首先要区分两个概念，动态加载 和 异步加载。

动态加载即 通过 `<componenet :is="activeComponent"></component>` 的方式，动态切换渲染的组件。

异步加载即 通过 Vue/ES6/Webpack提供的语法，按需加载组件（表现为单个的js），异步加载具体有三种方式：

1. Vue的异步组件加载

```
{
	...
    component: resolve => require(['../components/PromiseDemo'], resolve)
	...
}
```

2. ES6的import

```
{
 ...
 component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo2')
 ...
}
```

3. Webpack提供的require.ensure

```
{
 ...
 component: r => require.ensure([], () => r(require('../components/PromiseDemo')), 'demo')
 ...
}
```


## 算法：98 Validate BST

**解法1：按照前序遍历得到数组，然后看是否是有序的，时间优于 5%，空间优于 10%。**

```

var isValidBST = function(root) {
    if(root == null || (root.left == null && root.right == null)) return true;
    
    function flatTree(root) {
        if(root == null || root == undefined) return [];
        return [...flatTree(root.left),  root.val, ...flatTree(root.right)];
    }
    
    let flatedList = flatTree(root);
    
    for(let i = 1; i< flatedList.length; i++) {
        if(flatedList[i] <= flatedList[i - 1]) return false;
    }
    
    return true;
};
```


