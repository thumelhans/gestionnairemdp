//TODO faire le nettoyage du fichier en séprant les modules

//DOM Elements

const submitForm = document.querySelector("form button")
const formSelection = document.querySelector('form')
const copySelection = document.querySelector(".test")

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
    
    const numLower = Math.floor(Math.random() * (charaLength - 3 - 1)) + 2;
    charaLength -= numLower;

    const numUpper = Math.floor(Math.random() * (charaLength - 2 - 1)) + 2;
    charaLength -= numUpper;

    const numNbr = Math.floor(Math.random() * (charaLength - 1)) + 2;
    charaLength -= numNbr;

    const numSpc = Math.max(charaLength, 2);

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

function showPassword(pswd){ //TODO gérer la position et/ou la taille de police lorsque le mdp est trop long
    let pswdDiv = document.querySelector('.mdp')
    let newDiv = document.createElement("div")
    newDiv.classList.add("mdp-content")
    newDiv.innerHTML = pswd
    let showPswDiv = pswdDiv.append(newDiv)
    return showPswDiv
}

function radioChecked(){

}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Le texte a été copié dans le presse-papiers :', text);
      })
      .catch((error) => {
        console.error('Une erreur s\'est produite lors de la copie dans le presse-papiers :', error);
      });
  }

/**
 * Evènement permettant lors du clique sur le bouton de générer le MDP et de l'afficher à l'utilisateur.
 *
 * @param {string} pswd //on importe le MDP pour l'intégrer au DOM
 * @return {HTMLElement}
 */


submitForm.addEventListener('click', function(e) {
    e.preventDefault();
    
    const numChoice = parseInt(document.querySelector('#length').value, 10);
    const numMax = getRandNum(numChoice, numChoice + 7);
    const userPassword = document.querySelector('#user-password').value;
    const cypherChoice = document.querySelector('input[name="algo-choice"]:checked');
    let mdp;
  
    const passwordField = document.querySelector('.mdp-content');
    if (passwordField) {
      passwordField.parentNode.removeChild(passwordField);
    }
  
    if (cypherChoice) {
      switch (cypherChoice.id) {
        case 'leet':
          mdp = leetPassword(userPassword);
          break;
        case 'cesar':
          mdp = cesarPassword(userPassword);
          break;
        case 'vigenere':
          mdp = vigenerePassword(userPassword);
          break;
      }
      showPassword(mdp);
    }
  
    if (Number.isInteger(numChoice) && numChoice >= 12) {
      mdp = generatePassword(numMax);
      showPassword(mdp);
      console.log(mdp);
    } else if (!isNaN(numChoice)) {
      console.log("Erreur dans la saisie. Le mot de passe doit faire minimum 12 caractères !");//TODO gérer l'affichage de l'information à l'utilisateur
    }
    
    copySelection.addEventListener('click', function(e){
        e.preventDefault()
        copyToClipboard(mdp)
    })

    formSelection.reset();
  });

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
    //TODO Faire en sorte que si la lettre ne correspond pas elle est quand même intégrée au nouveau tableau.
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


/**
 * Transformation du MDP selon l'algorithme du chiffre de César
 * La clé de substitution sera déterminée aléatoirement
 *
 * @param {string} pswd //Correspond au MDP qu'on veut modifier
 * @returns {string}
 */
function cesarPassword(pswd){ //TODO gérer les majuscules, les chiffres et caractères spéciaux

    const cesarDictionnary = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    const subKey = Math.floor((Math.random()*25)+1)
    let oldPswd = pswd
    let newPswd =''

    for(let letter of oldPswd){
        cesarApplication(letter, cesarDictionnary, subKey)
    }
    
    /**
     * Fonction principale qui compare la lettre du MDP au dictionnaire et substitue cette lettre selon le principe du chiffre César
     *
     * @param {string} pswdIndexValue Représente la lettre qu'on compare
     * @param {Array} dictionnary
     * @param {number} key 
     * @return {string} 
     */
    function cesarApplication(pswdIndexValue, dictionnary, key){
        for(let i = 0; i < dictionnary.length; i++){
                    
            if (pswdIndexValue === dictionnary[i] && dictionnary[(i+key)] != undefined){
                newPswd += dictionnary[(i+key)]
            }else if(pswdIndexValue === dictionnary[i] && dictionnary[(i+key)] == undefined){
                let sum1 = (i+key)-dictionnary.length
                newPswd += dictionnary[sum1]
            }
        }
        return newPswd
    }
    return newPswd
}

/**
 * Fonction permettant la création d'un MDP selon l'algorithme Vigenere. Il admet 2 clés, une étant la position de la lettre dans l'alphabet, l'autre la position de la lettre par rapport à une clé répété. La somme de ces 2 clés donne la substitution à effectuer.
 *
 * @param {string} pswd
 * @returns {string}
 */
function vigenerePassword(pswd){//TODO gérer les majuscules, chiffres et caractères spéciaux
    let repKey = ['betty', 'love', 'hope', 'fils', 'amour']
    let key1 = []
    let key2 = []
    let vigenereDictionnary = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    let oldPswd = pswd
    let newPswd = ''
    const randRepKey = Math.floor(Math.random()*4)
    const key = repKey[randRepKey]
    
    for(let letter of oldPswd){//TODO Refacto la récupération de l'index du MDP et de la CLE
        if(vigenereDictionnary.includes(letter)){
            key1.push((vigenereDictionnary.indexOf(letter)+1))
        }
    }
    
    for(let repLetter of key){
        if(vigenereDictionnary.includes(repLetter)){
            key2.push((vigenereDictionnary.indexOf(repLetter)))
        }
    }
    
    for (let i = 0; i < oldPswd.length; i++){
        
        let keyModulo = i % key2.length
        let sumOfKey = key1[i]+key2[keyModulo]
         
        if(sumOfKey < 26){
            newPswd+=vigenereDictionnary[sumOfKey]
        }else{
            let sum1 = (sumOfKey)-vigenereDictionnary.length
            newPswd += vigenereDictionnary[sum1]
        }
    }

    return newPswd
}