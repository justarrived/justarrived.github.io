---
layout: post
title: Backward phone numbers
author: buren
locale: en
tags:
  - engineering
---

This post will, hopefully, be one of many posts about what its like to be an engineer/developer at Just Arrived.

There are many things that make Just Arrived unique as a startup. One of those things is that we need to support multiple languages, even right-to-left languages, from the start, while most other companies can defer that complexity to much much later (if ever!).

I've been developing for the web for more than 5 years and I recently encountered something new, namely the css property `unicode-bidi` (heard of it before?).

Recently we did a major upgrade of our website. We moved [justarrived.se](https://justarrived.se) from Wordpress to Jekyll as well as restructured and rewrote a lot of the content for the site.
One, seemingly small, thing that we did was to design a "contact us" section where the names, roles, email and phone numbers for each of our team members where to be displayed. It got built real fast and everything seemed to have worked up until we tested the site in Arabic.

> Houston we have a problem...

The problems was that phone numbers where displayed backwards! So `+46 73 500 0001` was displayed as `0001 500 73 46+`. Not really what we were after...

The solution turned out to be real simple and it was a CSS property that I've never heard of before.

The solution was to add (we use SASS):

```CSS
.rtl-locale-direction {
  & .formatted-number {
    unicode-bidi: plaintext;
  }
}
```

`.rtl-locale-direction` is the class we set when the a right-to-left language is used, so we can add custom styling on right-to-left locales. That selector has `direction: rtl` set, so we need to override it with `unicode-bidi: plaintext`.

You can read more about `unicode-bidi` [over at w3schools](http://www.w3schools.com/cssref/pr_text_unicode-bidi.asp).

Just one of those things that you usually don't have to think about when building websites and applications. This is just one example of what unique challenges we at Just Arrived face on a day to day basis.

{% include blog/post_footer.html %}
