
myApp.services = {

    tache: {
        create: function (data) {
            let task = ons.createElement(
                `<ons-list-item tappable  category = ${data.cat}>
                    <label class = "left"> 
                        <ons-checkbox></ons-checkbox>
                    </label>
                    <div class = "center">
                        ${data.title}
                    </div>
                    <div class = "right">
                        <ons-icon style = "color : grey; padding-left :4px" icon = "ion-ios-trash-outline, material:md-delete" id="deleteTask_${data.title}"> </ons-icon>
                    </div>
                </ons-list-item> `
            )
            document.querySelector("#pending-list").appendChild(task)
            let test = "#deleteTask_" + data.title;
            document.querySelector(test).addEventListener('click',evt => {
                for (let i = 0; i < myApp.services.tabTasks.length; i++) {
                    if (myApp.services.tabTasks[i]['title'] == data.title && myApp.services.tabTasks[i]['desc'] == data.desc){
                        myApp.services.tabTasks.splice(i,1)
                        myApp.services.localStorage.save()
                        document.location.reload()
                        myApp.services.localStorage.load()
                        myApp.services.localStorage.loadCategorie()
                    }
                }
            })
        },

        createImportante: function (data) {
            let task = ons.createElement(
                `<ons-list-item tappable  category = ${data.cat}>
                    <label class = "left"> 
                        <ons-checkbox></ons-checkbox>
                    </label>
                    <div class = "center">
                        ${data.title}
                    </div>
                    <div class = "right">
                        <ons-icon style = "color : grey; padding-left :4px" icon = "ion-ios-trash-outline, material:md-delete" id="deleteImportant_${data.title}"> </ons-icon>
                    </div>
                </ons-list-item> `
            )
            document.querySelector('#important-list').appendChild(task);
            let test = "#deleteImportant_" + data.title;
            document.querySelector(test).addEventListener('click',evt => {
                for (let i = 0; i < myApp.services.tabTasks.length; i++) {
                    if (myApp.services.tabTasks[i]['title'] == data.title && myApp.services.tabTasks[i]['desc'] == data.desc){
                        myApp.services.tabTasks.splice(i,1)
                        myApp.services.localStorage.save()
                        document.location.reload()
                        myApp.services.localStorage.load()
                        myApp.services.localStorage.loadCategorie()
                    }
                }
            })
        },

        ajoutSave: function (data) {
            myApp.services.tabTasks.push(data);
            myApp.services.localStorage.save();
        },

        showTache: function () {
            for (let i = 0; i < myApp.services.tabTasks.length; i++) {
                // créer une fonction load() pour local storage
                // notYetImplemented
                if (myApp.services.tabTasks[i].importante) {
                    myApp.services.tache.createImportante(myApp.services.tabTasks[i])
                    myApp.services.tache.create(myApp.services.tabTasks[i])
                } else {
                    myApp.services.tache.create(myApp.services.tabTasks[i])
                }
            }
        }

    },

    tabTasks: [],
    tabCategorie: [],

    localStorage: {
        save: function () {
            let jsonString = JSON.stringify(myApp.services.tabTasks);
            localStorage.setItem("tabTache", jsonString);
        },

        load: function () {
            let tmp = localStorage.getItem("tabTache");
            if (JSON.parse(tmp) != null) {
                myApp.services.tabTasks = JSON.parse(tmp);
            }
            myApp.services.tache.showTache();
        },

        loadCategorie: function (){
            for(let i=0 ; i < myApp.services.tabTasks.length ; i++){
                if (myApp.services.tabTasks[i].cat != ""){
                    let test = false;
                    for (let y=0 ; y < myApp.services.tabCategorie.length ; y++){
                        if(myApp.services.tabCategorie[y] === myApp.services.tabTasks[i].cat){
                            test = true;
                        }
                    }
                    if (!test){
                        myApp.services.tabCategorie.push(myApp.services.tabTasks[i].cat)
                    }
                }
            }
        },
    }
}