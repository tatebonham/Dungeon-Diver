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
    constructor({position}, width, height, color, {speed}){
        this.position = position
        this.width = width
        this.height = height
        this.color = color
        this.speed = speed
        this.alive = true
        this.attackBox = {
            position: this.position,
            width: 50,
            height: 5
        }
    }

    attack(){
        console.log('working')
        ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    spawn(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        // ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update(){
        this.spawn()
        if(this.position.x < 0){
            this.position.x = 0
        } else if(this.position.x + this.width > canvas.width){
            this.position.x = canvas.width - this.width
        } else {
            this.position.x += this.speed.x
        }

        if(this.position.y < 0){
            this.position.y = 0
        } else if (this.position.y  + this.height > canvas.height){
            this.position.y = canvas.height - this.height    
        } else {
            this.position.y += this.speed.y
        }
    }


}

const adventurer = new Entity({position: {x: 10, y: 300}}, 25, 25, 'green',{speed: {x: 0, y: 0}})
// adventurer.spawn()

const levelOne = ()=>{
const goblinA = new Entity({position: {x: 300,y: 300}}, 25, 25, 'red', {speed: {x: 0, y: 0}})
goblinA.update()
const goblinB = new Entity({position: {x: 200, y: 230}}, 25, 25, 'red', {speed: {x: 0, y: 0}})
goblinB.update()
const goblinC = new Entity({position: {x: 400, y: 400}}, 25, 25, 'red', {speed: {x: 0, y: 0}})
goblinC.update()
const goblinD = new Entity({position: {x: 500,y: 100}}, 25, 25, 'red', {speed: {x: 0, y: 0}})
goblinD.update()
}

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
    levelOne()
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
        case 'k':
            adventurer.attack()
            console.log('k')
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

