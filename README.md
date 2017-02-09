# Just Arrived - Website

Just Arrived website, https://justarrived.se, built using Jekyll.

:warning: The development of this project should be against the `dev` branch. `master` is strictly a release branch.

* [Install](#install)
* [Develop](#develop)
* [Translation](#translation)
* [Event tracking](#event-tracking)
* [Blog posts](#blog-posts)

## Install

```
script/setup
```

## Develop

```
script/server
```

## Deploy

```
script/deploy
```

## Translation

:warning: In order to manage translations you need to have the Transifex client installed and configured.

__Push translations__, push source language to Transifex.

```
script/push-translations
```

__Pull translations__, pull translated content from Transifex.

```
script/pull-translations
```

## Event tracking

There is a very simple way of adding tracking events to elements on the page.

__Example__:

```html
<a href="#"
  data-action="click"
  data-action-label="Newcomer reg. popup">
```

`click` is the default value for `data-action` unless something else is explicitly set.


## Blog posts

_front matter_:

```YAML
---
layout: post
title: Title of blog post
locale: sv
canonical_url: http://example.com
---
```
