
myApp.services = {

    tache: {
        create: function (data) {
            let titre  = data.title.replace(" ","_");
            let task = ons.createElement(
                `<ons-list-item id="blabla" component="html/detail_task" tappable  category = ${data.cat} >
                    <label class = "left"> 
                        <ons-checkbox id="endTask_${titre}"></ons-checkbox>
                    </label>
                    <div class = "center" style="width: 150px ;margin-right:50px">
                        ${data.title} | Expire le : ${data.date}
                    </div>
                    <div class = "right" >
                        <ons-icon style = "color : grey; padding-left :4px" icon = "ion-ios-trash-outline, material:md-delete" id="deleteTask_${titre}"> </ons-icon>
                    </div>
                </ons-list-item> `
            )
            document.querySelector("#pending-list").appendChild(task)
            let test = "deleteTask_" + titre;
            document.getElementById(test).addEventListener('click',evt => {
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
            let finiTache = "#endTask_" + titre
            document.querySelector(finiTache).addEventListener('click',evt => {
                for(let i=0;i<myApp.services.tabTasks.length;i++){
                    if(myApp.services.tabTasks[i].title === titre){
                        myApp.services.tabFini.push(myApp.services.tabTasks[i]);
                        myApp.services.tabTasks.splice(i,1);
                    }
                }
                console.log(myApp.services.tabFini)
                myApp.services.localStorage.save()
                document.location.reload()
                myApp.services.localStorage.load()
                myApp.services.localStorage.loadCategorie()
            })
        },

        createImportante: function (data) {
            let titre  = data.title.replace(" ","_");
            let task = ons.createElement(
                `<ons-list-item tappable  category = ${data.cat}>
                    <label class = "left"> 
                        <ons-checkbox id="endTask_${titre}"></ons-checkbox>
                    </label>
                    <div class = "center" style="width: 150px">
                        ${data.title} | Expire le : ${data.date}
                    </div>
                        <div class = "right" style="display: block">
                            <ons-icon style = "color : grey; padding-left :4px" icon = "ion-ios-trash-outline, material:md-delete" id="deleteImportant_${titre}"> </ons-icon>
                        </div>
                </ons-list-item> `
            )
            document.querySelector('#important-list').appendChild(task);
            let test = "#deleteImportant_" + titre;
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
            let finiTache = "#endTask_" + titre
            document.querySelector(finiTache).addEventListener('click',evt => {
                for(let i=0;i<myApp.services.tabTasks.length;i++){
                    if(myApp.services.tabTasks[i].title === titre){
                        myApp.services.tabFini.push(myApp.services.tabTasks[i]);
                        myApp.services.tabTasks.splice(i,1);
                    }
                }
                console.log(myApp.services.tabFini)
                myApp.services.localStorage.save()
                document.location.reload()
                myApp.services.localStorage.load()
                myApp.services.localStorage.loadCategorie()
            })
        },

        createFini: function (data){
            let titre  = data.title.replace(" ","_");
            let task = ons.createElement(
                `<ons-list-item tappable  category = ${data.cat}>
                    <label class = "left"> 
                        <ons-checkbox checked id="endTask_${titre}"></ons-checkbox>
                    </label>
                    <div class = "center">
                        ${data.title}
                    </div>
                </ons-list-item> `
            )
            document.querySelector('#completed-list').appendChild(task);
        },

        ajoutSave: function (data) {
            myApp.services.tabTasks.push(data);
            myApp.services.localStorage.save();
        },

        showTache: function () {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            today = Date.parse(today);
            for (let i = 0; i < myApp.services.tabTasks.length; i++) {
                let dateTache = Date.parse(myApp.services.tabTasks[i].date)
                if(dateTache<today){
                    myApp.services.tabTasks.splice(i,1)
                    myApp.services.localStorage.save();
                    document.location.reload()
                    myApp.services.localStorage.load()
                    myApp.services.localStorage.loadCategorie()
                }else{
                    if (myApp.services.tabTasks[i].importante) {
                        myApp.services.tache.createImportante(myApp.services.tabTasks[i])
                        myApp.services.tache.create(myApp.services.tabTasks[i])
                    } else {
                        myApp.services.tache.create(myApp.services.tabTasks[i])
                    }
                }
            }
            for(let y=0;y<myApp.services.tabFini.length;y++){
                myApp.services.tache.createFini(myApp.services.tabFini[y])
            }
        }

    },

    tabTasks: [],
    tabCategorie: [],
    tabFini:[],

    localStorage: {
        save: function () {
            let jsonString = JSON.stringify(myApp.services.tabTasks);
            localStorage.setItem("tabTache", jsonString);

            let jsonString2 = JSON.stringify(myApp.services.tabFini);
            localStorage.setItem("tabFini", jsonString2);
        },

        load: function () {
            let tmp = localStorage.getItem("tabTache");
            if (JSON.parse(tmp) != null) {
                myApp.services.tabTasks = JSON.parse(tmp);
            }

            let tmp2 = localStorage.getItem("tabFini");
            if (JSON.parse(tmp2) != null) {
                myApp.services.tabFini = JSON.parse(tmp2);
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

        supprimerTaches: function (){
            myApp.services.tabTasks = [];
            myApp.services.localStorage.save()
            document.location.reload()
            myApp.services.localStorage.load()
            myApp.services.localStorage.loadCategorie()
        },

        supprimerTacheCat: function (cat){
            for (let y=0; y<myApp.services.tabTasks.length; y++){
                if(myApp.services.tabTasks[y].cat === cat){
                    myApp.services.tabTasks.slice(y,1)
                }
            }
            myApp.services.localStorage.save()
            document.location.reload()
            myApp.services.localStorage.load()
            myApp.services.localStorage.loadCategorie()
        },
    }
}