const objective = document.getElementById('objective')
const score = document.getElementById('score')
const health = document.getElementById('health')
const arrows = document.getElementById('arrows')
const gold = document.getElementById('gold')
const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')

canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

class Entity{
    constructor(x, y, width, height, color, {speed}){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.speed = speed
        this.alive = true
    }


    spawn(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update(){
        this.spawn()
        if(adventurer.x < 0){
            adventurer.x = 0
        } else if(adventurer.x + adventurer.width > canvas.width){
            adventurer.x = canvas.width - adventurer.width
        } else {
            this.x += this.speed.x
        }

        if(adventurer.y < 0){
            adventurer.y = 0
        } else if (adventurer.y  + adventurer.height > canvas.height){
            adventurer.y = canvas.height - adventurer.height    
        } else {
            this.y += this.speed.y
        }
    }


}

const adventurer = new Entity(10, 300, 25, 25, 'green',{speed: {x: 0, y: 0}})
// adventurer.spawn()

// const levelOne = ()=>{
// const goblinA = new Entity(300, 300, 25, 25, 'red')
// goblinA.spawn()
// const goblinB = new Entity(200, 230, 25, 25, 'red')
// goblinB.spawn()
// const goblinC = new Entity(400, 400, 25, 25, 'red')
// goblinC.spawn()
// const goblinD = new Entity(500, 100, 25, 25, 'red')
// goblinD.spawn()
// }

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastKey = ''

function animate(){
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'gray'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    // console.log('go')
    adventurer.update()
    // levelOne()
    adventurer.speed.x = 0
    adventurer.speed.y = 0
    if(keys.d.pressed && keys.s.pressed){
        adventurer.speed.x = 2
        adventurer.speed.y = 2
    }  else if(keys.a.pressed && keys.s.pressed){
        adventurer.speed.x = -2
        adventurer.speed.y = 2
    }  else if(keys.d.pressed && keys.w.pressed){
        adventurer.speed.x = 2
        adventurer.speed.y = -2
    }  else if(keys.a.pressed && keys.w.pressed){
        adventurer.speed.x = -2
        adventurer.speed.y = -2
    } else if(keys.w.pressed && lastKey == 'w'){
        adventurer.speed.y = -2
    } else if(keys.a.pressed && lastKey == 'a'){
        adventurer.speed.x = -2
    } else if(keys.s.pressed && lastKey == 's'){
        adventurer.speed.y = 2
    } else if(keys.d.pressed && lastKey == 'd'){
        adventurer.speed.x = 2
    }    
}
animate()

const lastKeyPressed = ()=>{
if(keys.w.pressed){
        lastKey = 'w'
}  else if(keys.a.pressed){
    lastKey = 'a'
} else if (keys.s.pressed){
    lastKey = 's'
} else if(keys.d.pressed){
    lastKey = 'd'
}

}
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'w':
            keys.w.pressed = true
            lastKeyPressed()
            break
        case 'a':
            keys.a.pressed = true  
            lastKeyPressed()  
            break
        case 's':
            keys.s.pressed = true
            lastKeyPressed()
            break
        case 'd':
            keys.d.pressed = true 
            lastKeyPressed()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'w':
            keys.w.pressed = false 
            lastKeyPressed()
            break
        case 'a':
            keys.a.pressed = false 
            lastKeyPressed()
            break
        case 's':
            keys.s.pressed = false 
            lastKeyPressed()
            break
        case 'd':
            keys.d.pressed = false 
            lastKeyPressed()
            break
    }
})

