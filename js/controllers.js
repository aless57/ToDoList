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
        cat : document.querySelector('#cat').value, 
        importante : document.querySelector('#importante').checked, 
      }
      myApp.services.tache.create(data);
      if(data.importante) {
          myApp.services.tache.createImportante(data)
      }
      myApp.services.tache.ajoutSave(data);
  },
};
