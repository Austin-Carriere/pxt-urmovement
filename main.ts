enum moveOptions { 
    //%block="forward"
    forward, 
    //%block="backward"
    backward } 
enum turnOptions {
    //%block="left"
    left,
    //%block="right" 
    right } 
let leftMoveOffset = 0

let rightMoveOffset = 0;

function speedToAngle(speed: number): number { return (speed / 100 * 90 + 90) }
/** * Drive a robot using continuous rotation servos. */ 
//% color="#f4e008" icon="\uf1b9" block="Movement" 
namespace Movement { 
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
        if (name === turnOptions.left){ 
                drive(100, -100) 
            } 
        else { 
                drive(-100, 100) 
           } 
        basic.pause(9*deg);   
        brake()         
        }

    //% block="drifting to the &name &deg degrees"
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

}

