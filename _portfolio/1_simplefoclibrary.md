---
title: "*Simple<b>FOC</b>library*"
excerpt: "![Library Compile](https://github.com/simplefoc/Arduino-FOC/workflows/Library%20Compile/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![arduino-library-badge](https://www.ardu-badge.com/badge/Simple%20FOC.svg?)](https://www.ardu-badge.com/badge/Simple%20FOC.svg) <br> This is a cross-platform arduino library implementing the Field Oriented Control (FOC) algorithm for BLDC and Stepper motors.   <br/><img src='https://docs.simplefoc.com/extras/Images/connection.gif' style='max-height:300px'>"
collection: portfolio
---
<a href="https://simplefoc.com"> <i class="fa fa-home"></i> Home</a>
<a href="https://github.com/simplefoc/Arduino-FOC"> <i class="fab fa-gitlab"></i> Github</a>
<a href="https://docs.simplefoc.com/"> <i class="fa fa-copy"></i> Documentation</a>
<a href="https://community.simplefoc.com/"> <i class="fab fa-discourse"></i> Community </a>
<a href="https://www.youtube.com/channel/UC72nYRXqdAtYjgDeH8rRJqg"> <i class="fab fa-youtube"></i> YouTube </a>


![Library Compile](https://github.com/simplefoc/Arduino-FOC/workflows/Library%20Compile/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![arduino-library-badge](https://www.ardu-badge.com/badge/Simple%20FOC.svg?)](https://www.ardu-badge.com/badge/Simple%20FOC.svg)

[![](https://github-readme-stats.vercel.app/api/pin/?username=simplefoc&repo=arduino-foc)](https://github.com/simplefoc/Arduino-FOC)

We live in very exciting times 😃! BLDC motors are entering the hobby community more and more and many great projects have already emerged leveraging their far superior dynamics and power capabilities. BLDC motors have numerous advantages over regular DC motors but they have one big disadvantage, the complexity of control. Even though it has become relatively easy to design and manufacture PCBs and create our own hardware solutions for driving BLDC motors the proper low-cost solutions are yet to come. One of the reasons for this is the apparent complexity of writing the BLDC driving algorithms, Field oriented control (FOC) being an example of one of the most efficient ones.
The solutions that can be found on-line are almost exclusively very specific for certain hardware configuration and the microcontroller architecture used.
Additionally, most of the efforts at this moment are still channeled towards the high-power applications of the BLDC motors and proper low-cost and low-power FOC supporting boards are very hard to find today and even may not exist. <br>
Therefore this is an attempt to: 
- 🎯 Demystify FOC algorithm and make a robust but simple Arduino library: [Arduino *SimpleFOClibrary*](https://docs.simplefoc.com/arduino_simplefoc_library_showcase)
  - <i>Support as many <b>motor + sensor + driver + mcu</b> combinations out there</i>
- 🎯 Develop a modular FOC supporting BLDC driver boards:
   - *Low-power* gimbal driver (<5Amps) :  [*Arduino Simple**FOC**Shield*](https://docs.simplefoc.com/arduino_simplefoc_shield_showcase).
   - ***NEW*** 📢: *Medium-power* BLDC driver (<30Amps): [Arduino <span class="simple">Simple<b>FOC</b>PowerShield</span> ](https://github.com/simplefoc/Arduino-SimpleFOC-PowerShield).
   - See also [@byDagor](https://github.com/byDagor)'s *fully-integrated* ESP32 based board: [Dagor Brushless Controller](https://github.com/byDagor/Dagor-Brushless-Controller)

At this moment SimpleFOC has more than 220 active forks in GitHub, 450 members in its community platform with over 600 discussions and 8000 posts exchanged between its members.

<iframe width="653" height="401" src="https://www.youtube.com/embed/RI4nNMF608I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Features
- **Arduino compatible**: 
   - Arduino library code
  - Arduino Library Manager integration
- **Open-Source**: Full code and documentation available on github
- **Easy to setup and configure**: 
  - Easy hardware configuration
  - Easy [tuning the control loops](https://docs.simplefoc.com/motion_control)
- **Modular**:
  - Supports as many [sensors,  BLDC motors  and  driver boards](https://docs.simplefoc.com/supported_hardware) as possible
  - Supports multiple [MCU architectures](https://docs.simplefoc.com/microcontrollers):
     - Arduino: UNO, MEGA, any board with ATMega328 chips
     - STM32 boards: [Nucleo](https://www.st.com/en/evaluation-tools/stm32-nucleo-boards.html), [Bluepill](https://stm32-base.org/boards/STM32F103C8T6-Blue-Pill.html) ...
     - ESP32
     - Teensy boards
- **Plug & play**: Arduino <span class="simple">Simple<span class="foc">FOC</span>Shield</span>  

