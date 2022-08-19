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
        this.x += this.speed.x
        this.y += this.speed.y
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


function animate(){
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'gray'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    // console.log('go')
    adventurer.update()
    // levelOne()
}
animate()

window.addEventListener('keydown', (event) => {
    const playerSpeed = 1
    switch(event.key){
        case 'w':
            adventurer.speed.y = -1
            if(adventurer.y < 0){
                adventurer.y = 0
            }
            break
        case 'a':
            adventurer.speed.x = -1
            if(adventurer.x < 0){
                adventurer.x = 0
            }
            break
        case 's':
            adventurer.speed.y = 1
            if(adventurer.y  + adventurer.height > canvas.height){
                adventurer.y = canvas.height - adventurer.height
            }
            break
        case 'd':
            adventurer.speed.x = 1
            if(adventurer.x + adventurer.width > canvas.width){
                adventurer.x = canvas.width - adventurer.width
            }
            break


    }
})
