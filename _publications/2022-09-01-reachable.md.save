---
title: "Approximating robot reachable space using convex polytopes"
collection: publications
permalink: /publication_reachable
teaser: "output1.gif"
date: 2022-09-01
venue: '15th International Workshop on Human-Friendly Robotics'
paperurl: 'https://hal.inria.fr/hal-03719885'
citation: ''
authors: '<b>Antun Skuric</b>, Vincent Padois, David Daney'
---

<!-- gitlab badge -->
<div style="display:inline-flex;width:50%;justify-content:space-between">
<a href="https://gitlab.inria.fr/auctus-team/people/antunskuric/papers/reachable_space"> <i class="fab fa-gitlab"></i> Gitlab</a>    <a href="https://hal.inria.fr/hal-03719885"><i class="fa fa-file-pdf"></i> PDF</a>  <a href="files/HFR2022.pdf"><i class="fa fa-file-powerpoint"></i> Slides</a>   <a href="https://hal.inria.fr/hal-03719885"><img src="https://img.shields.io/badge/hal-03719885-blue"></a>
</div>

<img style="float:right;max-width:100%;max-height:300px" src="images/reachable.gif" >

Reachable space of robotic manipulators has complex geometry and is often hard to characterise, therefore it is usually calculated in advance by the robot manufacturers and given as an image in their datasheets (as shown on the image on the right). However these images are hard to exploit as they are not analytical solutions to this problem. Even if we would have an analytical solution to this problem it would still not include in its consideration robot's dynamics, its payload or its actuator torque limits. 

Therefore in this paper we propose a new reachable space approximation technique for robot manipulators which takes in consideration the robot's dynamics and its actuator limits. 
Additionally as a representation method for the reachable space charaterisation, we have chosen the convex polytopes, as they have several benefits:

- they are efficient to evaluate - real-time capability
- they can be represented as a set of linear constraints - used for optimisation
- they can be easily visualised - triangulated mesh

For the resolution of the proposed polytope based method, we have relied on the [Iterative Convex Hull method](publication_human_force). The method allowing for efficient approximation of the polytope geometry uisng iterations of lienar programming and convex hull algorithm, while guaranteeing the user defined precision.


<img style="float:right;max-width:100%;max-height:250px; padding:10px" src="images/output2.gif" >

## Paper Abstract


This paper presents an approach for approximating the reachable space of robotic manipulators based on convex polytopes. The proposed approach predicts the reachable space over a given time horizon based on the robot's actuation limits and kinematic constraints. The approach is furthermore extended to integrate the robot's environment, assuming it can be expressed in a form of linear constraints, and to account for the robot's link geometry.
The accuracy of the proposed method is evaluated using simulations of robot's nonlinear dynamics and it is compared against the cartesian space limits, usually provided by manufacturers in standard datasheets.

The accuracy analysis results show that the proposed method has good performance for the time horizons up to 250ms, encapsulating most of the simulated robot's reachable space while maintaining comparable volume. For a 7 dof robot, the method has an average execution time of 50ms, independent of the horizon time, potentially enabling real-time applications.


<!-- <div style="display:inline-flex"> -->
<img style="width:30%;display:inline-block"  src="images/output1.gif" >
<img style="width:30%;display:inline-block" src="images/output11.gif" >
<img style="width:30%;display:inline-block" src="images/output.gif" >
<!-- </div> -->

The full version of the paper is open access and can be found in HAL database: [<i class="fa fa-file"></i> manuscript](https://hal.inria.fr/hal-03719885) 

## Video demonstrations

<style>
.fluid-width-video-wrapper{
    /* width:50%; */
    display:inline-block;
    /* height:0; */
    margin-right:10px;
    padding-top:0px !important;
}
</style>

<div style="width:100%;display:inline-flex;height:250px">

<iframe src="https://www.youtube.com/embed/JwZgrUp095Y?si=-GubaZqyiVLSn69j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe  src="https://www.youtube.com/embed/1J2UrMC2uP0?si=9rRG_t-exn78anbJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

</div>

## Getting started

An implementation of the porposed algorihtm is available in open source at the gitlab repository [reachable_space](https://gitlab.inria.fr/auctus-team/people/antunskuric/papers/reachable_space).
It contains 
- Interactive jupyter notebooks
- Catkin ROS workspace

The polytope resolution was implemented using the [pycapacity](https://auctus-team.github.io/pycapacity/) python package.

