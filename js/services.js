
myApp.services = {

    tache : {
        create : function(data) {
            let task = ons.createElement (
                `<ons-list-item tappable  category = ${data.cat}>
                    <label class = "left"> 
                        <ons-checkbox></ons-checkbox>
                    </label>
                    <div class = "center">
                        ${data.title}
                    </div>
                    <div class = "right">
                        <ons-icon style = "color : grey; padding-left :4px" icon = "ion-ios-trash-outline, material:md-delete"> </ons-icon>
                    </div>
                </ons-list-item> `
            )   
            document.querySelector("#pending-list").appendChild(task)
        },
        
        createImportante : function(data) {
            let task = ons.createElement (
                `<ons-list-item tappable  category = ${data.cat}>
                    <label class = "left"> 
                        <ons-checkbox></ons-checkbox>
                    </label>
                    <div class = "center">
                        ${data.title}
                    </div>
                    <div class = "right">
                        <ons-icon style = "color : grey; padding-left :4px" icon = "ion-ios-trash-outline, material:md-delete"> </ons-icon>
                    </div>
                </ons-list-item> `
            )
            document.querySelector('#importantTasksPage').appendChild(task);
        },

        ajoutSave : function (data){
            myApp.services.tabTasks.push(data);
            myApp.services.localStorage.save();
        },

        showTache : function(){
            for(let i = 0; i<myApp.services.tabTasks.length; i++){
                // créer une fonction load() pour local storage
                // notYetImplemented
                if(myApp.services.tabTasks[i].importante){
                    myApp.services.tache.createImportante(myApp.services.tabTasks[i])
                    myApp.services.tache.create(myApp.services.tabTasks[i])
                } else {
                    myApp.services.tache.create(myApp.services.tabTasks[i])
                }
            }
        }

    },

    tabTasks: [],

    localStorage : {

         save : function() {
             let jsonString = JSON.stringify(myApp.services.tabTasks);  
             localStorage.setItem("tabTache", jsonString);      
         },

         load : function() {
            let tmp = localStorage.getItem("tabTache");
            console.log(JSON.parse(tmp))
            console.log(myApp.services.tabTasks)
            if(JSON.parse(tmp) != null){
                myApp.services.tabTasks = JSON.parse(tmp);
            }
            myApp.services.tache.showTache();
         }
    }
}