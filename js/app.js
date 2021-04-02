// App logic.
window.myApp = {};
let int = 0
document.addEventListener('init', function(event) {
  int++
  var page = event.target;

  //Charger toutes les taches du localStorage
  if(int===6){
    myApp.services.localStorage.load()
    myApp.services.localStorage.loadCategorie()
    myApp.controllers.menuLoadCat()
  }

  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  // if(page.id === 'completeTasksPage' || page.id === 'pendingTasksPage' || page.id === 'importantTasksPage'){
  //   document.querySelector("#delete_All").addEventListener('click', evt => {
  //     console.log('test')
  //     myApp.services.localStorage.length = 0
  //     myApp.services.localStorage.save()
  //     document.location.reload()
  //     myApp.services.localStorage.load()
  //   })
  // }
  myApp.controllers.loadCategorie();
  if(page.id == 'newTaskPage'){
    document.querySelector("#button-create").addEventListener('click', () => {
      myApp.controllers.clickCreate();
    })
   }

});







