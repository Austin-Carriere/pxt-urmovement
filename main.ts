enum moveOptions { 
    //%block="forward"
    forward, 
    //%block="backward"
    backward } 
enum turnOptions {
    //%block="left"
    left,
    //%block="right" 
    right
} 
    
enum colors{
    //% block="red"
    Red,
    //% block="orange"
    Orange,
    //% block="yellow"
    Yellow, 
    //% block="green"
    Green, 
    //%block="cyan"
    Cyan,
    //% block="blue"
    Blue,
    //% block="purple"
    Purple,
    //%block="white"
    White,
    //%block="black"
    Black
}
let leftMoveOffset = 0

let rightMoveOffset = 0;

const ambientLightValue = 85;

function speedToAngle(speed: number): number { return (speed / 100 * 90 + 90) }

function getColor(rgb: Array<number>): colors {
    let red = rgb[0] > ambientLightValue
    let green = rgb[1] > ambientLightValue
    let blue = rgb[2] > ambientLightValue

    if (red) {
        if (green) {
            if (blue) {
                return colors.White
            } else {
                return colors.Yellow
            }
        } else if (blue) {
            return colors.Purple
        } else {
            return colors.Red
        }
    } else if (green) {
        if (blue) {
            return colors.Cyan
        } else {
            return colors.Green
        }
    } else if (blue) {
        return colors.Blue
    } else {
        return colors.Black
    }
}
/** * Drive a robot using continuous rotation servos. */ 
//% color="#f4e008" icon="\uf1b9" block="Urban Rescue"
namespace UrbanRescue { 
    /** * Drive forward for a number of seconds. */ 
    //% block="move %name for %seconds seconds" 
    //% seconds.min=0 //% seconds.defl=0 //% weight=100 
    
    export function forward(name: moveOptions ,seconds: number): void { 
        // Left wheel forward 
        if (name === moveOptions.forward){ drive(100 , 100) } 
        else { drive(-100, -100) } 
        
        basic.pause(seconds * 1000) 
        // Stop 
        brake() 
        } 
        //% left.min = -100 //% right.min = -100 
        //% left.max = 100 //% right.max = 100 
        //% block = "Drive left %left right %right" 
        //% weight = 20 
        export function drive(left: number, right: number): void { 
            pins.servoWritePin(AnalogPin.P1, speedToAngle((left >= 0 ? 1 : -1) * (Math.abs(left) - leftMoveOffset)))
            pins.servoWritePin(AnalogPin.P2, speedToAngle(-((right >= 0 ? 1 : -1) * (Math.abs(right) - rightMoveOffset))))
             
        }
            
    //% block="turn %name %deg degrees" 
    //% weight=90 
            
    export function turn(name: turnOptions, deg: number) : void{ 
        if (name === turnOptions.right){ 
                drive(100, -100) 
            } 
        else { 
                drive(-100, 100) 
           } 
        basic.pause(9.6 * deg);   
        brake()         
        }

    //% block="drifting to the %name %deg degrees"
    //weight=70
    export function driveOffset(name: turnOptions, deg: number): void{
        if (name=== turnOptions.right){
            leftMoveOffset = deg
        } else {
            rightMoveOffset = deg
        }
    }
    //%block="brake"
    //%weight=80
    export function brake(){
        pins.servoWritePin(AnalogPin.P1, 90)
        pins.servoWritePin(AnalogPin.P2, 90)
    }

    //%block="is detecting %color ?"
    export function isColor(color: colors): boolean {
        let rgb = [Brickcell.getRed(), Brickcell.getGreen(), Brickcell.getBlue()]
        basic.showString(getColor(rgb).toString());
        return getColor(rgb) === color
    }



}



