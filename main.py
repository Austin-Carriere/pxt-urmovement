def on_button_pressed_a():
    RingbitCar.running_time(RingbitCar.Direction_run.FORWARD, 5)
    for index in range(5):
        RingbitCar.steering_angle(RingbitCar.Direction_turn.LEFT, 100)
        RingbitCar.running_time(RingbitCar.Direction_run.FORWARD, 0.4)
    RingbitCar.running_time(RingbitCar.Direction_run.FORWARD, 5)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    RingbitCar.freestyle(100, 100)
    RingbitCar.steering_angle(RingbitCar.Direction_turn.RIGHT, 900)
    RingbitCar.turnright()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    RingbitCar.brake()
input.on_button_pressed(Button.B, on_button_pressed_b)
