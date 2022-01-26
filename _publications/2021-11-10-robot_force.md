---
title: "On-line force capability evaluation based on efficient polytope vertex search"
collection: publications
permalink: /publication_robot_force
excerpt: 'Novel recursive watermarking method for hard real-time networked control systems preventing man in the middle attacks'
date: 2021-11-10
venue: 'IEEE ICRA 2021-International Conference on Robotics and Automation'
paperurl: 'https://ieeexplore.ieee.org/abstract/document/9562050'
citation: ''
authors: '<b>Antun Skuric</b>, Vincent Padois, David Daney'
---

<a href="https://gitlab.inria.fr/auctus-team/people/antunskuric/polytope_vertex_search"><i class="fab fa-github"></i> Github</a> 
<a href="https://gitlab.inria.fr/auctus-team/people/antunskuric/polytope_vertex_search/-/raw/master/paper/ICRA2021.pdf?inline=false"><i class="fa fa-file"></i> Download PDF</a>

<img src="images/comparison.gif">

New on-line polytope vertex search algorithm optimised for force and velocity polytope evaluation of serial robots.


## Abstract
Ellipsoid-based manipulability measures are often used to characterize the force/velocity task-space capabilities of robots. While computationally simple, this approach
largely approximate and underestimate the true capabilities. Force/velocity polytopes appear to be a more appropriate representation to characterize the robot’s task-space capabilities.
However, due to the computational complexity of the associated vertex search problem, the polytope approach is mostly restricted to offline use, e.g. as a tool aiding robot mechanical
design, robot placement in work-space and offline trajectory planning. In this paper, a novel on-line polytope vertex search algorithm is proposed. It exploits the parallelotope geometry
of actuator constraints. The proposed algorithm significantly reduces the complexity and computation time of the vertex search problem in comparison to commonly used algorithms.
In order to highlight the on-line capability of the proposed algorithm and its potential for robot control, a challenging experiment with two collaborating Franka Emika Panda robots,
carrying a load of 12 kilograms, is proposed. In this experiment, the load distribution is adapted on-line, as a function of the configuration dependant task-space force capability of each robot, in order to avoid, as much as possible, the saturation of their capacity.


## Video presentation
<iframe width="560" height="315" src="https://www.youtube.com/embed/hApIv1oFuhk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>