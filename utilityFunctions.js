/** findOBP (Find Object Based on Property)
 * 
 * @param {Array} arr 
 * @param {String} property 
 * @param {String} target 
 * @returns Array
 * 
 * Given an array of objects, filter the array where a property of each object
 * match the given target
 */
 const findOBP = (arr, property, target) => {
    return arr.filter(item => {
        const regex = new RegExp(`${target}`, "gi")
        return item[property].match(regex) !== null
    })
}

const generateHsl = () => {
    const hueNum = randomInt(0, 360)
    const satNum = randomInt(20, 70)
    const lightNum = randomInt(20, 60)

    return({
        hueNum, satNum, lightNum
    })
}

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

module.exports = {
    findOBP, randomInt, generateHsl
}