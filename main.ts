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

let ambientLightValue = 85;

function speedToAngle(speed: number): number { return (speed / 100 * 90 + 90) }

function getColor(rgb: number[]): colors {

    let total = rgb[0] + rgb[1] + rgb[2];

    if (total < 200) return colors.Black

    let r = rgb[0]/total
    let g = rgb[1]/total
    let b = rgb[2]/total

    let red = [0.70, 0.15, 0.15, colors.Red]
    let green = [0.15, 0.7, 0.15, colors.Green]
    let blue = [0.15, 0.15, 0.7, colors.Blue]
    let yellow = [0.42, 0.42, 0.16, colors.Yellow]
    let white = [0.33, 0.33, 0.33, colors.White]
    let purple = [0.42, 0.16, 0.42, colors.Purple]
    let cyan = [0.16, 0.42, 0.42, colors.Cyan]
    let orange = [0.5, 0.25, 0.25, colors.Orange]

    let colorArray = [red, orange, yellow, green, blue, purple, white, cyan]

    let closestColor = colors.Red
    let smallestDistance = Infinity
    for (let color of colorArray) {
         let distance =
            Math.pow(r - color[0], 2) +
            Math.pow(g - color[1], 2) +
            Math.pow(b - color[2], 2)

        if (distance < smallestDistance) {
            smallestDistance = distance
            closestColor = color[3]
        }
    }
    basic.showString("RGB")
    basic.showNumber(r)
    basic.showNumber(g)
    basic.showNumber(b)
    return closestColor

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



