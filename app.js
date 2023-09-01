//Hey you like to check my source code? well, enjoy =)
import { database } from "./modules/lobo.js"

let db = new database("lobo")

window.addEventListener("load",() =>{
	reload()
	document.documentElement.spellcheck = false;
})

document.getElementById("create").addEventListener("click",() =>{
	db.save({
		color: "",
      		id: "",
      		date: setDate(),
      		text: "",
		tagged: false
    	})

    	reload()
	document.getElementById("details").open = false
})

document.getElementById("restore").addEventListener("click",() =>{
	const input = document.createElement('input')
    	input.type = 'file'

    	input.addEventListener('change',(event) =>
    	{
        	const file = event.target.files[0]

        	if(file)
        	{
            		const reader = new FileReader()

            		reader.onload = function(event)
            		{
                		const jsonContent = event.target.result

                		db.restore(jsonContent)

                		location.reload()
            		}

            		reader.readAsText(file)
        	}
    	})

    	input.click()

    	document.getElementById("details").open = false
})

document.getElementById("backup").addEventListener("click",async () =>{
	const jsonData = await db.backup()

	const jsonString = jsonData
	const blob = new Blob([jsonString], { type: 'application/json' })

    	let link = document.createElement('a')

    	link.href = URL.createObjectURL(blob)
    	link.download = "TheToDoListBackup.json"

    	link.click()

	document.getElementById("details").open = false
})

document.getElementById("clear").addEventListener("click",() =>{
	db.clearAll()

	location.reload()

	document.getElementById("details").open = false
})

document.addEventListener("click",(e) =>{
	if(e.target.id == "createTagged")
	{
		db.load().forEach((get) =>
		{
			if(get.id == e.target.setId)
			{
				if(get.tagged == false)
				{
					get.color = "#f37636"
					get.tagged = true
				}
				else
				{
					get.color = "#444"
					get.tagged = false
				}
				db.saveAll()
				reload()
			}
		})
	}

	if(e.target.id == "createRemove")
	{
		try
		{
			db.load().splice(e.target.setId,1)
			db.saveAll()
			reload()
		}
		catch(err)
		{
			console.log("error: createRemove failed")
		}
	}
})

document.addEventListener("keyup",(e) =>{
	if(e.target.id == "createText")
	{
		db.load().forEach((get) =>
		{
			if(get.id == e.target.setId)
			{
				get.text = e.target.innerText
				get.date = setDate()
			}
		})

		db.saveAll()
	}
})

function reload(){
	document.getElementById("main").innerText = ""

    	try
    	{
        	db.load().forEach((e,index) =>
        	{
            		let createBox = document.createElement("p")
            		createBox.id = "createBox"
            		createBox.className = "createBox"

			let createButtons = document.createElement("div")
			createButtons.className = "createButtons"

			let createTagged = document.createElement("button")
			createTagged.id = "createTagged"
			createTagged.className = "btn"
			createTagged.innerText = "TAG"
			createTagged.setId = index

            		let createText = document.createElement("p")
			createText.spellcheck = false
            		createText.id = "createText"
            		createText.className = "createText"
            		createText.contentEditable = "true"
            		createText.setId = index
            		createText.innerText = e.text
            		e.id = index
			createText.style.borderColor = e.color

            		let createDate = document.createElement("div")
            		createDate.id = "createDate"
            		createDate.className = "createDate"
            		createDate.innerText = e.date

            		let createRemove = document.createElement("button")
            		createRemove.id = "createRemove"
            		createRemove.className = "btn"
            		createRemove.innerText = "DELETE"
            		createRemove.setId = index

			document.getElementById("main").append(createBox)
			createBox.append(createDate)
			createBox.append(createButtons)
			createButtons.append(createRemove)
			createButtons.append(createTagged)
			createBox.append(createText)
        	})
    	}
    	catch(err)
    	{
        	console.log("error: no database found")
    	}
}

function setDate(){
	const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
	const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

	const d = new Date()

	let name = months[d.getMonth()]
	let year = d.getFullYear()
	let day = days[d.getDay()]
	let month = d.getDate()

	let final = day + " " + month + ". " + name + " " + year

	return final
}
