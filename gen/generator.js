let randomStuff = {
    tall: [0,1,2,3,4,5,6,7,8,9],
    bokstaver: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    storebokstaver: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    tegn: ["!","@","[","]","(",")","_","-"]
}

function randomizer()
{
    let tall = randomStuff.tall[Math.floor(Math.random() * randomStuff.tall.length)]
    let bokstaver = randomStuff.bokstaver[Math.floor(Math.random() * randomStuff.bokstaver.length)]
    let storebokstaver = randomStuff.storebokstaver[Math.floor(Math.random() * randomStuff.storebokstaver.length)]
    let tegn = randomStuff.tegn[Math.floor(Math.random() * randomStuff.tegn.length)]

    document.getElementById("val").innerText = randomStuff.tegn[Math.floor(Math.random() * randomStuff.tegn.length)] + randomStuff.bokstaver[Math.floor(Math.random() * randomStuff.bokstaver.length)] + randomStuff.tall[Math.floor(Math.random() * randomStuff.tall.length)] + randomStuff.storebokstaver[Math.floor(Math.random() * randomStuff.storebokstaver.length)] + randomStuff.bokstaver[Math.floor(Math.random() * randomStuff.bokstaver.length)] + randomStuff.tall[Math.floor(Math.random() * randomStuff.tall.length)] + randomStuff.storebokstaver[Math.floor(Math.random() * randomStuff.storebokstaver.length)] + randomStuff.bokstaver[Math.floor(Math.random() * randomStuff.bokstaver.length)] + randomStuff.tall[Math.floor(Math.random() * randomStuff.tall.length)] + randomStuff.storebokstaver[Math.floor(Math.random() * randomStuff.storebokstaver.length)] + randomStuff.bokstaver[Math.floor(Math.random() * randomStuff.bokstaver.length)] + randomStuff.tall[Math.floor(Math.random() * randomStuff.tall.length)] + randomStuff.storebokstaver[Math.floor(Math.random() * randomStuff.storebokstaver.length)] + randomStuff.bokstaver[Math.floor(Math.random() * randomStuff.bokstaver.length)] + randomStuff.tall[Math.floor(Math.random() * randomStuff.tall.length)] + randomStuff.storebokstaver[Math.floor(Math.random() * randomStuff.storebokstaver.length)] + randomStuff.bokstaver[Math.floor(Math.random() * randomStuff.bokstaver.length)] + randomStuff.tall[Math.floor(Math.random() * randomStuff.tall.length)] + randomStuff.storebokstaver[Math.floor(Math.random() * randomStuff.storebokstaver.length)] + randomStuff.bokstaver[Math.floor(Math.random() * randomStuff.bokstaver.length)] + randomStuff.tall[Math.floor(Math.random() * randomStuff.tall.length)] + randomStuff.storebokstaver[Math.floor(Math.random() * randomStuff.storebokstaver.length)] + randomStuff.tegn[Math.floor(Math.random() * randomStuff.tegn.length)]
}

document.getElementById("btn").addEventListener("click",() =>
{
    randomizer()
})