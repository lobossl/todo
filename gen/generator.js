//Coded by LoboSSL
let tall = [0,1,2,3,4,5,6,7,8,9]
let liten = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
let stor = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let symboler = ["!","@","[","]","(",")","_","-",";","."]

function randomizer(length)
{
    for(let i = 0;i < length;i++)
    {
        document.getElementById("val").innerText += symboler[Math.floor(Math.random() * symboler.length)] + tall[Math.floor(Math.random() * tall.length)] + liten[Math.floor(Math.random() * liten.length)] + stor[Math.floor(Math.random() * stor.length)] + tall[Math.floor(Math.random() * tall.length)] + symboler[Math.floor(Math.random() * symboler.length)]
    }
}

document.getElementById("btn").addEventListener("click",() =>
{
    document.getElementById("val").innerText = ""

    randomizer(2)
})