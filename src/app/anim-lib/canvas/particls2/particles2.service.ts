

export class ParticlesService2 {
    
    constructor() {}

    randIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    randColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)]
    }
    
    distance(x1, y1, x2, y2) {
        const xDist = x2 - x1
        const yDist = y2 - y1
    
        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
    }
} 