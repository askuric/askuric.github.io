---
title: "`pycapacity`"
# excerpt: "Real-time capable task-space capacity calculation python module<br><img src='../images/bimanual1.png' style='max-height:300px'>"
excerpt: "An efficient task-space capacity calculation package for robotics and biomechanics"
teaser: "pycap_docs.gif"
collection: portfolio
badges: '[![PyPI package](https://img.shields.io/pypi/v/pycapacity)](https://pypi.org/project/pycapacity/) [![Tests](https://github.com/auctus-team/pycapacity/actions/workflows/python-app.yml/badge.svg)](https://github.com/auctus-team/pycapacity/actions/workflows/python-app.yml) ![](https://img.shields.io/pypi/dm/pycapacity?color=blue&label=pip%20downloads)  [![Docs](https://github.com/auctus-team/pycapacity/actions/workflows/main.yml/badge.svg)](https://github.com/auctus-team/pycapacity/actions/workflows/main.yml) [![status](https://joss.theoj.org/papers/73f155afc0dfa7730792639ac374b348/status.svg)](https://joss.theoj.org/papers/73f155afc0dfa7730792639ac374b348)
'
stars: 'https://img.shields.io/github/stars/auctus-team/pycapacity?style=social'
type: "software"
---

{% include base_path %}

<div style="width:40%;display:inline-flex;justify-content:space-between">
<a href="https://github.com/auctus-team/pycapacity"> <i class="fab fa-github"></i> Github</a>
<a href="https://auctus-team.github.io//pycapacity/"> <i class="fa fa-copy"></i> Documentation</a>
<a href="https://pypi.org/project/pycapacity/"> <i class="fa fa-cubes"></i> pip </a>
</div>


[![PyPI package](https://img.shields.io/pypi/v/pycapacity)](https://pypi.org/project/pycapacity/) [![Tests](https://github.com/auctus-team/pycapacity/actions/workflows/python-app.yml/badge.svg)](https://github.com/auctus-team/pycapacity/actions/workflows/python-app.yml) ![](https://img.shields.io/pypi/dm/pycapacity?color=blue&label=pip%20downloads)  [![Docs](https://github.com/auctus-team/pycapacity/actions/workflows/main.yml/badge.svg)](https://github.com/auctus-team/pycapacity/actions/workflows/main.yml) [![status](https://joss.theoj.org/papers/73f155afc0dfa7730792639ac374b348/status.svg)](https://joss.theoj.org/papers/73f155afc0dfa7730792639ac374b348)


[![](https://github-readme-stats.vercel.app/api/pin/?username=auctus-team&repo=pycapacity)](https://github.com/auctus-team/pycapacity)


## What is ``pycapacity``?


<img src='{{ base_path }}/images/comparison.gif' style='max-height:200px'>
<img src='{{ base_path }}/images/human_poly.gif' style='max-height:200px'>
<img src='{{ base_path }}/images/output2.gif' style='max-height:200px'>

Python package ``pycapacity`` provides a set of tools for evaluating task space physical ability metrics for humans and robots, based on polytopes and ellipsoids. 
The aim of ``pycapacity`` is to provide a set of efficient tools for their evaluation in an easy to use framework that can be easily integrated with standard robotics 
and biomechanics libraries. The package implements several state of the art algorithms for polytope evaluation that bring many of the 
polytope metrics to the few milliseconds evaluation time, making it possible to use them in online and interactive applications. 

The package can be easily interfaced with standard libraries for robotic manipulator rigid body simulation such as ``robotic-toolbox`` 
or ``pinocchio``, as well as human musculoskeletal model biomechanics 
softwares ``opensim`` and ``biorbd``. The package can also be used with the Robot Operating System (``ROS``).

The package additionally implements a set of visualization tools for polytopes and ellipsoids based on the
Python package ``matplotlib`` intended for fast prototyping and quick and interactive visualization.


See [full API documentation and docs.](https://auctus-team.github.io/pycapacity/)
<a href="https://auctus-team.github.io/pycapacity/"><img src="{{ base_url }}/images/pycap_docs.gif" ></a>

## Installation

The package can be easily installed using ``pip``:

```bash
pip install pycapacity
```


## `pycapacity` for research


We are very happy that `pycapacity` has been used as a component of several research project and has made its way to several scientific papers. We are hoping that this trend is going to continue as the project matures and becomes more robust!

A short resume paper about `pycapacity` has been published in the Journal of Open Source Software, see [full paper](https://joss.theoj.org/papers/73f155afc0dfa7730792639ac374b348)

If you are interested in citing `pycapacity` in your research, we suggest you to cite our paper:

```bib
@article{Skuric_Pycapacity_a_real-time_2023,
author = {Skuric, Antun and Padois, Vincent and Daney, David},
doi = {10.21105/joss.05670},
journal = {Journal of Open Source Software},
month = sep,
number = {89},
pages = {5670},
title = {Pycapacity: a real-time task-space capacity calculation package for robotics and biomechanics},
url = {https://joss.theoj.org/papers/10.21105/joss.05670},
volume = {8},
year = {2023}
}
```

## Demo video

In this video the polytopes of the human arm, based on the 50 muslce 7 degrees of freedom, musculoskeletal model and the Franka Emika Panda roobt are calculated in real time using the `pycapacity` package. The experiment in the video is a part of the our [recent paper](/publication_human_force).
<iframe width="560" height="315" src="https://www.youtube.com/embed/sM_R1X49v1A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>