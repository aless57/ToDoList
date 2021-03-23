// App logic.
window.myApp = {};
let int = 0
document.addEventListener('init', function(event) {
  int++
  var page = event.target;

  //Charger toutes les taches du localStorage
  if(int==6){
    myApp.services.localStorage.load()
  }

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







