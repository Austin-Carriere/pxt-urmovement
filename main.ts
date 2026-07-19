/**
 * Drive a robot using continuous rotation servos.
 */
//% color="#f4e008" icon="\uf1b9" block="Movement"
namespace Movement {

}

/**
 * Drive forward for a number of seconds.
 */
//% block="forward for %seconds seconds"
//% seconds.min=0
//% seconds.defl=0
//% weight=100
export function forward(seconds: number): void {

    // Left wheel forward
    pins.servoWritePin(AnalogPin.P1, 180)

    // Right wheel forward (reversed because it's mounted backwards)
    pins.servoWritePin(AnalogPin.P2, 0)

    basic.pause(seconds * 1000)

    // Stop
    pins.servoWritePin(AnalogPin.P1, 90)
    pins.servoWritePin(AnalogPin.P2, 90)
}
