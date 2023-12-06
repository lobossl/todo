/*
	0.09
*/
class STORAGE {
    Save(db) {
        const savedData = this.Read(db);
        localStorage.setItem(db, JSON.stringify(savedData));
    }

    Push(db,data) {
        const savedData = this.Read(db);
        savedData.push(data);
        localStorage.setItem(db, JSON.stringify(savedData));
    }

    Checker(db,index)
    {
        const savedData = this.Read(db);

        if(savedData[index].checked == false)
        {
            savedData[index].checked = true;
        }
        else
        {
            savedData[index].checked = false;
        }

        localStorage.setItem(db, JSON.stringify(savedData));
    }

    Delete(db)
    {
        const savedData = this.Read(db);

        for(let i = savedData.length - 1; i >= 0; i--)
        {
            if(savedData[i].checked === true)
            {
                savedData.splice(i,1);
            }
        }

        localStorage.setItem(db, JSON.stringify(savedData));
    }

    Read(db) {
        const savedData = JSON.parse(localStorage.getItem(db) || "[]");
        return savedData;
    }
}

const myStorage = new STORAGE();

let todoText = document.getElementById("todoText");
let recipeText = document.getElementById("recipeText");
let addTodo = document.getElementById("addTodo");
let addRecipe = document.getElementById("addRecipe");
let day = document.getElementById("day");
let month = document.getElementById("month");

addTodo.addEventListener("click",(e) => {
    myStorage.Push("todo",{
        text: todoText.value,
        checked: false,
        day: day.value,
        month: month.value
    });

    todoText.value = "";
    Load();
});

addRecipe.addEventListener("click",(e) => {
    myStorage.Push("recipe",{
        text: recipeText.value,
        checked: false
    });
    recipeText.value = "";
    Load();
});

document.addEventListener("click",(e) =>
{
    if(e.target.id == "recipeList")
    {
        myStorage.Checker("recipe",e.target.setID)
        myStorage.Delete("recipe");
        Load();
    }

    if(e.target.id == "todoList")
    {
        myStorage.Checker("todo",e.target.setID)
        myStorage.Delete("todo");
        Load();
    }
})

function Load()
{
    let DATE = new Date();
    let YEAR = DATE.getFullYear();
    let MONTH = DATE.getMonth() + 1;
    let DAY = DATE.getDate();

    innerTodo.innerText = "";
    innerRecipe.innerText = "";

    //TODO
    for(let i = 0;i < myStorage.Read("todo").length;i++)
    {
        let p = document.createElement("p");
        let icon = document.createElement("span");
        let text = document.createElement("p");
        let date = document.createElement("span");

        text.className = "align-left";
        text.style.padding = "3px";

        p.style.backgroundColor = "#222";
        p.style.color = "#ccc";
        p.className = "border-def";

        date.innerText = myStorage.Read("todo")[i].day + "." + myStorage.Read("todo")[i].month + "." + YEAR;
        date.className = "align-def";

        icon.id = "todoList";
        icon.setID = i;
        icon.innerText = "x";
        icon.style.color = "#FF4500";
        icon.className = "cursor font-size-med user-select-0";
        icon.style.margin = "6px";

        text.innerText = myStorage.Read("todo")[i].text || "no text..";

        if((myStorage.Read("todo")[i].day == DAY) && (myStorage.Read("todo")[i].month == MONTH))
        {
            p.style.borderColor = "#FF4500";
        }

        innerTodo.append(p);
        p.append(date);
        p.append(icon);
        p.append(text);
    }

    for(let i = 0;i < myStorage.Read("recipe").length;i++)
    {
        let p = document.createElement("p");
        let icon = document.createElement("span");
        let text = document.createElement("p");

        text.className = "align-left";
        text.style.padding = "3px";

        p.style.backgroundColor = "#222";
        p.className = "border-def";
        p.style.color = "#ccc";

        icon.id = "recipeList";
        icon.setID = i;
        icon.innerText = "x";
        icon.style.color = "#FF4500";
        icon.className = "cursor font-size-med user-select-0";
        icon.style.margin = "6px";

        text.innerText = myStorage.Read("recipe")[i].text || "no text..";

        innerRecipe.append(p);
        p.append(icon);
        p.append(text);
    }
}

Load();
