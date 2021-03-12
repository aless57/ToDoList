
toDo.services = {

    tache : {
        create : function(data) {
            var task = ons.createElement (
                `<ons-list-item tappable  category = ${data.category}>
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
            );
            
        }
    }
}