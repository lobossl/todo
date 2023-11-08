/*
	Copyrights by Lobo
	version: 3.09
*/

//set localStorage database name!
let localStorageDataBaseName = "lobo"

//if http force to https
if(location.protocol == "http:"){
	location.href = location.href.replace("http://", "https://");
}

let confirmActive = false

//localStorage database class
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

let db = new database(localStorageDataBaseName)

//elements by id
let read = document.getElementById("read")
let submit = document.getElementById("submit")
let text = document.getElementById("text")
let search = document.getElementById("search")
let title = document.getElementById("title")

//get Date
function setDate(){
	const dato = Date.now()

	return dato
}

//load div boxes
function load(){
	read.innerText = ""

	db.load().forEach((e,index) =>{
		let createBox = document.createElement("div")
		let DETAILS = document.createElement("DETAILS")
		let SUMMARY = document.createElement("SUMMARY")
		let deleteButton = document.createElement("p")
		let createText = document.createElement("p")
		let endOfBox = document.createElement("p")
		let bytesOfText = document.createElement("p")
		let getDate = document.createElement("p")

		//the box
		//createBox.style.width = "100%"
		createBox.style.border = "1px solid #777"
		createBox.style.backgroundColor = "#444"
		createBox.className = "align-def padding-def radius-def"
		
		//delete button
		deleteButton.innerText = "Delete"
		deleteButton.ident = index
		deleteButton.id = "deleteButton"
		deleteButton.style.color = "green"

		//SUMMARY settings
		SUMMARY.innerText = e.title || "Emty Title.."
		SUMMARY.style.fontSize = "1.5em"

		//text
		createText.id = "editText"
		createText.ident = index
		createText.innerText = e.text
		createText.className = "wrap word-break outline-0 border-0 align-left"
		createText.contentEditable = true
		createText.style.color = "#fff"
		createText.style.fontSize = "1em"
		createText.style.width = "100%"
		createText.style.height = "100%"
		createText.style.margin = "0 auto"
		createText.style.borderLeft = "2px dotted #999"
		createText.style.paddingLeft = "5px"

		//bytes
		bytesOfText.innerText = "Bytes:" + e.text.length

		//date
		let d = new Date(e.date)
		let Month = d.getMonth() + 1
		let Year = d.getFullYear()
		let Day = d.getDate()

		getDate.innerText = "Created:" + Day + "." + Month + "." + Year

		//append
		read.append(createBox)
		createBox.append(DETAILS)
		DETAILS.appendChild(SUMMARY)
		DETAILS.appendChild(createText)
		createBox.append(endOfBox)
		endOfBox.append(bytesOfText)
		endOfBox.append(getDate)
		endOfBox.append(deleteButton)

		deleteButton.className = "cursor margin-def"
	})

	if(db.load().length == 0)
	{
		read.innerText = "localStorage is emty.."
	}
}

function Confirm(e){
	if(e.target.id == "deleteButton"){
		db.load().splice(e.target.ident,1)
		db.saveAll()
		load()
	}
}

//on click on box, delete with added Confirm()
document.addEventListener("click",(e) =>{
	if(e.target.id == "deleteButton"){
		if(confirmActive == false)
		{
			confirmActive = true

			let confirmBox = document.createElement("div")
			let YES = document.createElement("button")
			let NO = document.createElement("button")

			confirmBox.innerText = "Delete? "
			YES.innerText = "YES"
			NO.innerText = "NO"

			confirmBox.style.position = "absolute"
			confirmBox.style.left = "calc(50vw - (/* width */140px / 2))"
			confirmBox.style.top = "calc(50vh - (/* height */100px / 2))"
			confirmBox.style.backgroundColor = "orange"
			confirmBox.style.color = "#fff"
			confirmBox.className = "padding-big border-debug"

			read.append(confirmBox)

			confirmBox.append(YES)
			confirmBox.append(NO)

			YES.addEventListener("click",(yes) =>{
				Confirm(e)
				confirmActive = false
			})
			NO.addEventListener("click",(no) =>{
				NO.style.display = "none"
				YES.style.display = "none"
				confirmBox.style.display = "none"
				confirmActive = false
			})
		}
		else
		{
			confirmActive = true
		}
	}
})

//on key inside box
document.addEventListener("keyup",(e) =>{
	if(e.target.id == "editText"){
		db.load().forEach((get,index) =>{
			if(index == e.target.ident)
			{
				get.text = e.target.innerText.toLowerCase()
				db.saveAll()
			}
		})
	}
})


//on press Enter key save message..
document.getElementById("create").addEventListener("click",(e) =>
{
	db.save({
		title: title.value.toLowerCase(),
		ident: db.load().length,
		text: "",
		date: setDate()
	})

	load()

	title.value = ""
})

//delete all database

document.getElementById("deleteLocalStorage").addEventListener("click",(e) =>{
	db.clearAll()
	location.reload()
})

load()