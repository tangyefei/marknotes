> 两边有border的三角形，用于下拉指示箭头

```
.icon::before {
  content: ' ';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-left: 1px solid #00B4CF;
  border-top: 1px solid #00B4CF;
  transform: rotate(45deg);
  background: #FFF;
}
```