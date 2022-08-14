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

module.exports = {
    findOBP
}