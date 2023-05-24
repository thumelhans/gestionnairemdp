//DOM Elements

const submitForm = document.querySelector("button")

/**
 * Fonction déterminant la longueur du MDP
 *
 * @param {number} min
 * @param {number} max
 * @return {number} 
 */

function getRandNum (min, max){
    return Math.floor(Math.random()*(max-min) + min)
}


/**
 * Fonction récupérant un nombre X de caractère selon le type de caractère
 *
 * @param {number} num 
 * @param {string} charType // Variable représentant la liste des caractères du charType (ex: lowerCase = 'abc....') 
 * @return {string} // Retourne un morceau du MDP selon le type de caractère
 */

function randomChar(num, charType){
    let result=''
    for(let i = 0; i < num; i++){
        result += charType.charAt(Math.floor(Math.random()*charType.length))
    } 
    return result
}

const randNumb = getRandNum(15,26)

/**
 * Fonction permettant la génération de MDP
 *
 * @param {number} length //représente la longueur du mot de passe défini par la fonction getRandNum
 * @return {string} 
 */

function generatePassword(length){
    let result = ''
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const specialCharac = '!@#$%^&*()[]-_'
    let charaLength = length
    
    //TODO corriger le fait que parfois on a qu'un seul type de caractère
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

/**
 * Fonction permettant de créer l'élément HTML pour montrer le MDP à l'utilisateur
 *
 * @param {string} pswd //on importe le MDP pour l'intégrer au DOM
 * @return {HTMLElement}
 */

function showPassword(pswd){
    let pswdDiv = document.querySelector('.mdp')
    let newDiv = document.createElement("p")
    newDiv.innerHTML = pswd
    let showPswDiv = pswdDiv.append(newDiv)
    return showPswDiv
}

/**
 * Evènement permettant lors du clique sur le bouton de générer le MDP et de l'afficher à l'utilisateur.
 *
 * @param {string} pswd //on importe le MDP pour l'intégrer au DOM
 * @return {HTMLElement}
 */

submitForm.addEventListener('click', function(e){
    e.preventDefault()
    let numChoice = parseInt(document.querySelector('#test').value, 10)
    let numMax = getRandNum(numChoice, (numChoice+7))
    let mdp

    if(Number.isInteger(numChoice) && numChoice >= 12){
       mdp = generatePassword(numMax)
       showPassword(mdp)
       console.log(mdp)
    }else{
        console.log("Erreur dans la saisie. Le mot de passe doit faire minimum 12 caractères!")
    }
})

/** 
 * Transformation du mot de passe selon l'algorithme leet
 * 
 * @param {string} pswd // correspond au MDP qu'on veut changer
 * @returns {string}
*/

function leetPassword (pswd){
    
    let oldPswd = Array.from(pswd.toLowerCase())
    let leetDictionnary = {
        "a": "@", "b": "b", "c": "(", "d": "d", "e": "3", "f": "f", "g": "g", "h": "]-[", "i": "1", "j": "j", "k": "k", "l": "£", "m": "m", "n": "n", "o": "0", "p": "p", "q": "9", "r": "r", "s": "5", "t": "7", "u": "u", "v": "v", "w": "w", "x": "><", "y": "y", "z": "2", " ": "_"
    }//TODO Voir pour changer le type de caractère
    let newPswd = []
    //TODO Faire en sorte que si le lettre ne correspond pas elle est quand même intégrée au nouveau tableau.
    for(const [key, value] of Object.entries(leetDictionnary)){
        
        for(let i = 0 ; i < oldPswd.length; i++){
            if(key === oldPswd[i]){
                newPswd[i]=value
            }
        } 

    }
    let randIndex = ''

    for(let i = 0 ; i < (newPswd.length/2); i++){
        randIndex = Math.floor(Math.random()*(newPswd.length))
        newPswd[randIndex] = newPswd[randIndex].toUpperCase()
    }
    return newPswd.join('')
}

console.log(leetPassword('bonjour la vie vous allez bien'))