# freqently used html head tags


## 1. meta


### 1.1 viewport


Browser's viewport is the area of the window in which web content can be seen.

This is often not the same size as the rendered page, in which case the browser provides scrollbars for the user to scroll around and access all the content.

Narrow screen devices (e.g. mobiles) render pages in a virtual window or viewport, which is usually wider than the screen, and then shrink the rendered result down so it can all be seen at once.

However, this mechanism is not so good for pages that are optimized for narrow screens using media queries — if the virtual viewport is 980px for example, media queries that kick in at 640px or 480px or less will never be used, limiting the effectiveness of such responsive design techniques.

To mitigate this problem, Apple introduced the "viewport meta tag" in Safari iOS to let web developers control the viewport's size and scale.

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

The width property controls the size of the viewport. It can be set to a specific number of pixels like width=600 or to the special value device-width, which is the width of the screen in CSS pixels at a scale of 100%. (There are corresponding height and device-height values, which may be useful for pages with elements that change size or position based on the viewport height.)

The initial-scale property controls the zoom level when the page is first loaded. The maximum-scale, minimum-scale, and user-scalable properties control how users are allowed to zoom the page in or out.