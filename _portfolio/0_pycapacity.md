---
title: "pycapacity"
excerpt: "Real-time capable task-space capacity calculation python module<br><img src='../images/bimanual1.png' style='max-height:300px'>"
collection: portfolio
---
### Real-time capable task-space capacity calculation python module

<a href="https://gitlab.inria.fr/auctus-team/people/antunskuric/pycapacity"> <i class="fab fa-gitlab"></i> Gitlab</a>
<a href="https://auctus-team.gitlabpages.inria.fr/people/antunskuric/pycapacity/"> <i class="fa fa-copy"></i> Documentation</a>
<a href="https://pypi.org/project/pycapacity/"> <i class="fa fa-cubes"></i> pip </a>


<img src='https://gitlab.inria.fr/auctus-team/people/antunskuric/pycapacity/-/raw/master/images/comparison.gif' style='max-height:200px'>
<img src='https://gitlab.inria.fr/auctus-team/people/antunskuric/pycapacity/-/raw/master/images/bimanual1.png' style='max-height:200px'>


The ``pycapacity`` package provides a framework for the generic task-space capacity calculation for:
- Robotic serial manipulators - ``pycapacity.robot``
- Human musculoskeletal models - ``pycapacity.human``

This package also provides a module ``pycapacity.algorithms`` with a set of polytope evaluation algorithms for standard polytope formulations, that can be used as a standalone library.

Additionally, ``pycapacity.visual`` module provides a set of visualisaiton tools using the ``matplotlib`` for visualising 2d and 3d polytopes.


### Demo video

In this video the polytopes of the human arm, based on the 50 muslce 7 degrees of freedom, musculoskeletal model and the Franka Emika Panda roobt are calculated in real time using the `pycapacity` package. The experiment in the video is a part of the our [recent paper](/publication_human_force).
<iframe width="560" height="315" src="https://www.youtube.com/embed/sM_R1X49v1A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>