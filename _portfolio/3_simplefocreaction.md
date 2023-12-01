---
title: "Reaction wheel inverted pendulum"
badges: "[![Test Compile](https://github.com/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum/actions/workflows/c-cpp.yml/badge.svg)](https://github.com/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum/actions/workflows/c-cpp.yml)"
excerpt: "This is an open-source project of designing and controlling the reaction wheel inverted pendulum based entirely on Arduino <i>Simple<b>FOC</b>library</i> and <i>Simple<b>FOC</b>shield</i>."
teaser: 'https://github.com/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum/raw/master/images/swing-up.gif'
collection: portfolio
stars: "https://img.shields.io/github/stars/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum?style=social"
---


<a href="https://github.com/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum"> <i class="fab fa-github"></i> Github</a>
<a href="https://docs.simplefoc.com/simplefoc_pendulum"> <i class="fa fa-code"></i> Coding guide</a>


[![Test Compile](https://github.com/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum/actions/workflows/c-cpp.yml/badge.svg)](https://github.com/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum/actions/workflows/c-cpp.yml)

[![](https://github-readme-stats.vercel.app/api/pin/?username=simplefoc&repo=Arduino-FOC-reaction-wheel-inverted-pendulum)](https://github.com/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum)

This is a project of designing and controlling the reaction wheel inverted pendulum based entirely on Arduino [*Simple**FOC**library*](/portfolio/1_simplefoclibrary) and [*Simple**FOC**shield*](/portfolio/2_simplefocshield)

<p align="center">
    <img src="https://github.com/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum/raw/master/images/swing-up.gif" style="height:180px">
    <img src="https://github.com/simplefoc/Arduino-FOC-reaction-wheel-inverted-pendulum/raw/master/images/stabilization.gif" style="height:180px">
</p>

This is a very fun project in many ways, and it is intended:
- Students in search for a good testing platform for their advanced algorithms
- Everyone with a bit of free time and a motivation to create something cool :D


<iframe width="560" height="315" src="https://www.youtube.com/embed/Ih-izQyXJCI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


But for me, the most exciting part of this project was the ability to use the Field Oriented Control algorithm. 
**The main benefits of using the BLDC motor in this project are:**
-  High torque to weight ratio
   - The lighter the better
-  Lots of torque for low angular velocities
   - No need to spin the motor to very high RPM to achieve high torques
-  No gearboxes and backlash
   - Very smooth operation = very stable pendulum

So far, FOC has been restricted to high-end applications due to the complexity and the cost of the hardware mostly, but also due to the lack of user-friendly, well documented software. Therefore I am very happy to show you the projects like this one, which directly benefit the FOC algorithm and BLDC motors and encourage you to use these techniques in your projects as well. One of the very simple ways of starting (demonstrated in this video) is using the [*Simple**FOC**library*](/portfolio/1_simplefoclibrary) and [*Simple**FOC**shield*](/portfolio/2_simplefocshield).
