---
title: "`pywitmotion`"
excerpt: "A python pip package for parsing witmotion IMU bwt901cl"
teaser: "https://github.com/askuric/pywitmotion/raw/main/datasheet/image.jpg"
collection: portfolio
stars: 'https://img.shields.io/github/stars/askuric/pywitmotion?style=social'
---

{% include base_path %}

<a href="https://github.com/askuric/pywitmotion"> <i class="fab fa-github"></i> Github</a>

[![](https://github-readme-stats.vercel.app/api/pin/?username=askuric&repo=pywitmotion)](https://github.com/askuric/pywitmotion)

# pywitmotion
A python pip package for parsing witmotion IMU messages

<img src="https://github.com/askuric/pywitmotion/raw/main/datasheet/image.jpg" style="max-height:300px">

Find the datasheet at [BWT901CL Datasheet.pdf](https://github.com/askuric/pywitmotion/raw/main/datasheet/BWT901_Datasheet.pdf)


## Instalation
```shell
pip install git+https://github.com/askuric/pywitmotion.git
```

## Code examples
Code example using `pybluez`

```python
import pywitmotion as wit
import bluetooth

# set your device's address
imu = "00:0C:BF:02:1E:40"

# Create the client socket
socket = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
socket.connect((imu, 1))

msgs_num = 0
while msgs_num < 100:
    data = socket.recv(1024)
    # split the data into messages
    data = data.split(b'U') 
    for msg in data:
        q = wit.get_quaternion(msg)
        # q = wit.get_magnetic(msg)
        # q = wit.get_angle(msg)
        # q = wit.get_gyro(msg)
        # q = wit.get_acceleration(msg)
        if q is not None:
            msgs_num = msgs_num+1
            print(q)
socket.close()
```

Code example using `pyserial`
```python
import serial
import pywitmotion as wit

connected = False
port = '/dev/rfcomm0'
baud = 115400

with serial.Serial(port, baud, timeout=5) as ser:
    s = ser.read()

    msgs_num = 0
    while msgs_num < 100:
        start = time.time()
        s = ser.read_until(b'U')
        q = wit.get_quaternion(msg)
        # q = wit.get_magnetic(msg)
        # q = wit.get_angle(msg)
        # q = wit.get_gyro(msg)
        # q = wit.get_acceleration(msg)
        if q is not None:
            msgs_num = msgs_num+1
            print(q)
```


## Using witmotion INUs for human motion capture

Here is a tutorial on using the wit motion IMUs in combination with this minimal library `pywitmotion` and the `biorbd` library for human body simulation.

<i class="fab fa-gitlab"></i> Gitlab [tutorial link](https://gitlab.inria.fr/auctus-team/people/antunskuric/demos/pyomeca_imus_demo)

This tutorial uses 4 IMUs for the human right arm:
<img src="https://gitlab.inria.fr/auctus-team/people/antunskuric/demos/pyomeca_imus_demo/-/raw/master/images/sensor_position.jpg" height=400px>

And the obtained results are:
<img src="{{ base_path }}/images/pyomeca_imus.gif" height="400px">