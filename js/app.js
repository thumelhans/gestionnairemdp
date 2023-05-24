/** 
 * OBJECITF:
 * 
 * Mettre en place un générateur de MDP prenant en compte un nombre de caractère et un algorithme défini (leet, chiffre césar,...) ou pas
 * 
 * 
 * 
 * 
*/

function getRandNum (min, max){
    return Math.floor(Math.random()*(max-min) + min)
}

function randomChar(num, charType){
    let result=''
    for(let i = 0; i < num; i++){
        result += charType.charAt(Math.floor(Math.random()*charType.length))
    } 
    return result
}

const randNumb = getRandNum(10,16)

function generatePassword(length){
    let result = ''
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const specialCharac = '!@#$%^&*()[]-_'
    let charaLength = length
    
    console.log(charaLength)
    
    let numLower = Math.floor(Math.random()*((charaLength-3)-2)+2)
    charaLength -= numLower

    let numUpper = Math.floor(Math.random()*((charaLength-2)-2)+2)
    charaLength -= numUpper
    
    let numNbr = Math.floor(Math.random()*((charaLength-1)-2)+2)
    charaLength -= numNbr
    
    let numSpc = charaLength
    charaLength -= numNbr

    result += randomChar(numLower, lowerCase)
    result += randomChar(numUpper, upperCase)
    result += randomChar(numNbr, numbers)
    result += randomChar(numSpc, specialCharac)
       
    const shuffled = result.split('').sort(function(){return 0.5-Math.random()}).join('')

    return shuffled
}

console.log(generatePassword(randNumb))