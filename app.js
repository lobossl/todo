/*
    https://github.com/lobossl
*/

let databaseName = "todolist";

let getDB = localStorage.getItem(databaseName) ? JSON.parse(localStorage.getItem(databaseName)) : []

let todo = document.getElementById("todo");
let doing = document.getElementById("doing");
let done = document.getElementById("done");
let addTodo = document.getElementById("addTodo");
let addDoing = document.getElementById("addDoing");
let addDone = document.getElementById("addDone");
let backup = document.getElementById("backup");
let restore = document.getElementById("restore");

document.addEventListener("click",(e) =>
{
    if(e.target.id == "addTodo")
    {
        newDiv = document.createElement("p");
        newDiv.className = "newDiv";
        newDiv.id = getDB.length;
        newDiv.contentEditable = "true";
        todo.appendChild(newDiv);

        getDB.push(
            {
                title: "todo",
                text: "",
                index: getDB.length,
                delete: false
            }
        );

        localStorage.setItem(databaseName,JSON.stringify(getDB));
    }

    if(e.target.id == "addDoing")
    {
        newDiv = document.createElement("p");
        newDiv.className = "newDiv";
        newDiv.id = getDB.length;
        newDiv.contentEditable = "true";
        doing.appendChild(newDiv);

        
        getDB.push(
            {
                title: "doing",
                text: "",
                index: getDB.length,
                delete: false
            }
        );
        
        localStorage.setItem(databaseName,JSON.stringify(getDB));
    }

    if(e.target.id == "addDone")
    {
        newDiv = document.createElement("p");
        newDiv.className = "newDiv";
        newDiv.id = getDB.length;
        newDiv.contentEditable = "true";
        done.appendChild(newDiv);

        
        getDB.push(
            {
                title: "done",
                text: "",
                index: getDB.length,
                delete: false
            }
        );
        
        localStorage.setItem(databaseName,JSON.stringify(getDB));
    }
});

document.addEventListener("dblclick",(e) =>
{
    if(e.target.className == "newDiv")
    {
        getDB.forEach((event,index) =>
        {
            if(e.target.id == event.index)
            {
                event.delete = true;
            }
        });

        localStorage.setItem(databaseName,JSON.stringify(getDB));

        rm(e.target);
    }
});

document.addEventListener("keyup",(e) =>
{
    if(e.target.className == "newDiv")
    {
        let getInnerText = e.target.innerText;
        let getIndex = e.target.id;

        getDB.forEach((event,index) =>
        {
            if(getIndex == event.index)
            {
                event.text = getInnerText;
            }
        });
        
        localStorage.setItem(databaseName,JSON.stringify(getDB));
    }
});

window.addEventListener("load",(e) =>
{
    getDB.forEach((event) =>
    {
        newDiv = document.createElement("p");
        newDiv.className = "newDiv";
        newDiv.id = event.index;
        newDiv.innerText = event.text;
        newDiv.contentEditable = "true";

        if(event.title == "todo")
        {
            todo.appendChild(newDiv);
        }

        if(event.title == "doing")
        {
            doing.appendChild(newDiv);
        }

        if(event.title == "done")
        {
            done.appendChild(newDiv);
        }
    });
});

function rm(target)
{
    getDB.forEach((event,index) =>
    {
        if(event.delete == true)
        {
            getDB.splice(index,1);
        }
    });

    localStorage.setItem(databaseName,JSON.stringify(getDB));

    target.remove();
}

backup.addEventListener("click",() =>
{
    const dataJson = JSON.stringify(getDB);
    const blob = new Blob([dataJson], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "backup.json";
    a.click();
    URL.revokeObjectURL(url);
});

restore.addEventListener("change",() =>
{
	let file = restore.files[0];

    if(file)
    {
        let reader = new FileReader();
        
        reader.addEventListener("load",(e) =>
        {
            try
            {
                JSON.parse(e.target.result).forEach((event) =>
                {
                    getDB.push(event);

                    localStorage.setItem(databaseName,JSON.stringify(getDB));
                });
            }
            catch(error)
            {
                console.log("Error loading JSON file.");
            }
        });
        
        reader.readAsText(file);
    }

    location.reload();
});