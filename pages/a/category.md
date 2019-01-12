---
category: "a"
author:
format:
title: "Explore Author Names Beginning with A"
yearReleased:
permalink: a.html
layout: home
---

{% assign sortedPages = site.pages | sort: 'author' %}
{% for page in site.pages %}
{% if page.category == 'a' %}
{{ page.content }}
{% endif %}
{% endfor %}
