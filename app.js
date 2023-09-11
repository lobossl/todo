class database{
	constructor(dbname){
        	this.dbname = dbname;
        	this.read = JSON.parse(localStorage.getItem(dbname)) || []
	}

	load(){
		let test = this.read.sort((a, b) => b.date - a.date)
		return test
	}

	save(obj){
		this.read.push(obj)
		localStorage.setItem(this.dbname, JSON.stringify(this.read))
	}

	saveAll(){
		localStorage.setItem(this.dbname, JSON.stringify(this.read))
	}

	clearAll(){
		localStorage.clear()
	}

	restore(obj){
		localStorage.setItem(this.dbname, JSON.stringify(JSON.parse(obj)))
	}

	backup(){
		return JSON.stringify(this.read)
	}
}

let db = new database("lobo")

window.addEventListener("load",() =>{
	reload()
	document.documentElement.spellcheck = false
})

document.getElementById("create").addEventListener("click",() =>{
	db.save({
		id: "",
		date: setDate(),
		text: ""
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

        	if(file){
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
	if(e.target.id == "createRemove"){
		try{
			db.load().splice(e.target.setId,1)
			db.saveAll()
			reload()
		}
		catch(err){
			console.log("error: createRemove failed")
		}
	}
})

document.addEventListener("keyup",(e) =>{
	if(e.target.id == "createText"){
		db.load().forEach((get,index) =>{
			if(get.id == e.target.setId){
				get.text = e.target.innerText
				get.date = setDate()
				db.saveAll()
			}
		})
	}
})

function reload(){
	document.getElementById("main").innerText = ""

    	try{
        	db.load().forEach((e,index) =>{
				let createBox = document.createElement("p")
				createBox.id = "createBox"
				createBox.className = "createBox"

				let left = document.createElement("div")
				left.className = "left"

				let right = document.createElement("div")
				right.className = "right"
                
				let createText = document.createElement("p")
				createText.spellcheck = false
				createText.id = "createText"
				createText.className = "createText"
				createText.contentEditable = "true"
				createText.setId = index
				createText.innerText = e.text
				e.id = index

				let createRemove = document.createElement("button")
				createRemove.id = "createRemove"
				createRemove.className = "btn"
				createRemove.innerText = "X"
				createRemove.setId = index

				document.getElementById("main").append(createBox)
				createBox.append(left)
				createBox.append(right)
				left.append(createText)
				right.append(createRemove)
        	})
    	}
    	catch(err){
        	console.log("error: no database found")
    	}
}

function setDate(){
	const dato = Date.now()

	return dato
}