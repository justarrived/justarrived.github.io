---
layout: post
title: Deconstructing Our Progress Widget
author: buren
locale: en
tags:
  - engineering
---

As a part of our xmas campaign, Decemberutmaningen, we wanted to display a nice progress widget to show how the campaign was doing, [see the campaign here](/en/decemberutmaningen).
&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;

The final widget looks like this:

<p style="text-align: center">
  <img style="max-width: 280px" src="{{ "/assets/images/blog/progress-widget.png" | prepend: site.github.url }}" alt="Progress Widget">
</p>

_Specification_: The pink color should "fill" the appropriate amount of space to indicate the progress.

In order to achieve this we needed three "layers" to work with:

1. The background image, the "circle" like shape.
2. The blue background color in the middle of the circle.
3. The pink fill color that indicates the progress.

Here is the background image (transparent png, on grey background for contrast):

<p style="text-align: center;background-color: #e7e7e7;padding: 0">
  <img style="max-width: 280px" src="{{ "/assets/images/xmas/counter_transparent.png" | prepend: site.github.url }}" alt="Progress Widget">
</p>

_Thanks Emma @ Antrop for design it and thanks Sasha for some last second Sketch-foo._

We also need some JavaScript in order to fetch display the current progress (thats fetched for an API).

Calculating the fill height

```js
function fillHeight(count, targetCount) {
  var percent = (count / targetCount) * 100;
  var fillHeight = (percent * 2.61) + 15;
  if (fillHeight > 285) {
    fillHeight = 285;
  }
  return fillHeight;
}
```

We normalize the `target` & `current` values to percent and then we have 2 "magic" numbers. `2.61` is the number of pixels equal to 1% of the widget height. `15` is offset required for the circle edge and finally we make sure that if we don't allow the fill height to grow too large.

After that its just a matter of updating the values in the HTML template and add it to the DOM.

To create a new Progress widget we ended up with this:

_HTML_:

```html
<div id="foo" class="progress-widget"></div>
```


_JS_:

```js
new ProgressWidget({
  selector: '#foo',
  current: 690,
  target: 1000,
  text: 'registered'
});
```

Making it really easy to create a new progress widget. Both the background, fill and text colors are configurable.

Here is the [PR @ GitHub](https://github.com/justarrived/justarrived.github.io/pull/156).
