// App logic.
window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  //Charger toutes les taches du localStorage
   myApp.services.localStorage.load();

  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  if(page.id == 'newTaskPage'){
    document.querySelector("#button-create").addEventListener('click', () => {
      myApp.controllers.clickCreate();
    })
  }

 

});


