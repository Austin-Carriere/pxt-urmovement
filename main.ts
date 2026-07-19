input.onButtonPressed(Button.A, function () {
    RingbitCar.steering_angle(RingbitCar.Direction_turn.left, 600)
    basic.pause(2000)
    RingbitCar.steering_angle(RingbitCar.Direction_turn.right, 600)
})
input.onButtonPressed(Button.AB, function () {
    RingbitCar.freestyle(100, 100)
    RingbitCar.steering_angle(RingbitCar.Direction_turn.right, 900)
    RingbitCar.turnright()
})
input.onButtonPressed(Button.B, function () {
    RingbitCar.brake()
})
basic.forever(function () {
    basic.showNumber(Brickcell.getGreen())
})
