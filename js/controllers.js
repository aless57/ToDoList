/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {
    // Set button functionality to open/close the menu.
    page.querySelector('[component="button/menu"]').onclick = function() {
      document.querySelector('#mySplitter').left.toggle();
    };

    // Set button functionality to push 'new_task.html' page.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/new-task"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('html/new_task.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });
  }, 

  clickCreate : function() {
      let data = {
        title : document.querySelector("#title").value,
        desc: document.querySelector('#desc').value, 
        cat : document.querySelector('#cat').value.replace(" ","_"),
        importante : document.querySelector('#importante').checked,
        date : document.querySelector('#date').value
      }
      if (data.date===""){
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          today = mm + '/' + dd + '/' + yyyy;
          data.date = today;
      }
      myApp.services.tache.create(data);
      if(data.importante) {
          myApp.services.tache.createImportante(data)
      }
      myApp.services.tache.ajoutSave(data);
      document.location.reload()
      myApp.services.localStorage.load()
      myApp.services.localStorage.loadCategorie()
  },

    loadCategorie: function () {
        let categories = ['Nouvelle Catégorie'].concat(myApp.services.tabCategorie);
        let list = $('#categories-list');
        let listMenu = $('custom-category-list')
        categories.forEach(current => {
            let option = $(`<option value=${current}>`);
            option.text(current);

            list.click(e => {
                let options = list.prop("options");
                let selectedOption = options[list.prop("selectedIndex")].value;
                if (selectedOption === 'Nouvelle') {
                    $('#newcat').removeClass('hidden');
                } else {
                    $('#newcat').addClass('hidden');
                    $('#cat').prop("value", selectedOption);
                }
            });
            list.find('select').append(option);
        });
    },

    menuLoadCat: function (){
        for(let i=0;i<myApp.services.tabCategorie.length;i++){
            let titre = myApp.services.tabCategorie[i]
            let catMenu = ons.createElement(
                `<ons-list-item tappable  category = ${myApp.services.tabCategorie[i]}>
                    ${myApp.services.tabCategorie[i]}
                    <div class = "right">
                  <ons-icon style = "color : grey; padding-left :4px" icon = "ion-ios-trash-outline, material:md-delete" id="deleteAllTaskCat_${titre}"> </ons-icon>
                </div>\
                </ons-list-item> 
                `
            )
            document.querySelector("#custom-category-list").appendChild(catMenu);
            let test = "#deleteAllTaskCat_" + titre;
            document.querySelector(test).addEventListener('click', evt => {
                for (let y=0; y<myApp.services.tabTasks.length; y++){
                    if(myApp.services.tabTasks[y].cat === myApp.services.tabCategorie[i]){
                        myApp.services.tabTasks.splice(y,1)
                        y=y-1;
                    }
                }
                myApp.services.localStorage.save()
                myApp.services.tabCategorie.splice(i,1)
                document.location.reload()
                myApp.services.localStorage.load()
                myApp.services.localStorage.loadCategorie()
            })
        };
    }
};
