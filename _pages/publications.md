---
layout: archive
title: "Publications & Patents"
permalink: /publications/
author_profile: true
---

<sup>*</sup> Equal authorship

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
