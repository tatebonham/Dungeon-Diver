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
    constructor(x, y, width, height, color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }


    spawn(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const adventurer = new Entity(10, 300, 25, 25, 'green')
adventurer.spawn()

const goblinA = new Entity(300, 300, 25, 25, 'red')
goblinA.spawn()
const goblinB = new Entity(200, 230, 25, 25, 'red')
goblinB.spawn()
const goblinC = new Entity(400, 400, 25, 25, 'red')
goblinC.spawn()
const goblinD = new Entity(500, 100, 25, 25, 'red')
goblinD.spawn()
