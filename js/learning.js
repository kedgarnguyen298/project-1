// kieu du lieu

// number
// chuyen ve dang so
let str = '123'
let number = parseInt(str)
console.log(str, number)

let str2 = '10.123'
let number2 = parseFloat(str2)
console.log(str2, number2)

console.log(Math.sqrt(2))
console.log(Math.pow(2, 5))
console.log(Math.sin(Math.PI / 2))

// string
let string = 'Hello world!'
console.log('Length ' + string.length)
console.log('Upper ' + string.toUpperCase())
console.log('Lower ' + string.toLowerCase())
console.log('Split ' + string.split(' '))
console.log('Split ' + string.split(''))
console.log('Includes e ' + string.includes('e'))
console.log('Includes @ ' + string.includes('@'))
console.log('   Abc def   \t\n'.trim())

// object

// array
console.log('array>>')
let array = [1, 2, 3]
array.forEach(function(element, index) {
  console.log(element, index)
})
let filterResult = array.filter(function(element) {
  return element > 1
})
console.log(filterResult)
let mapResult = array.map(function(element) {
  return element * 2
})
console.log(mapResult)
// try/catch/finally - throw
/**
 * accept number > 0
 * else throw error
 * @param {Number} number 
 */
function validateNumber(number) {
  if(number > 0) {
    return true
  } else {
    throw new Error('Invalid number!')
  }
}

try {
  validateNumber(10)
  validateNumber('abc')
} catch(err) {
  console.error(err.message)
} finally {
  console.log('finally')
}
console.log('Code after throw Error')

// asynchronous - bat dong bo
function asyncTask() {
  console.log('Process')
  console.log('Process take 30 seconds')
  setTimeout(function() {
    console.log('Task end')
  }, 30000)
}

asyncTask()
console.log('Do something')

// Process
// Process take 30s
// Task end
// Do something

// Process
// Process take 30
// Do something
// Task end