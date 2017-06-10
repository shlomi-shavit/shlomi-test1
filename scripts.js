
var contacts = [
    {
        id:1,
        name: "Friends",
        type: "Group",
        contacts: [
            {id:2, name: "Udi", type: "Contact"},
            {id:3, name: "Tommy", type: "Contact"},
            {
                id:6,
                name: "Old Friends",
                type: "Group",
                contacts: [
                    {id:7, name: "Itay", type: "Contact"},
                ]
            },
        ]
    },
    {
        id:4,
        name: "Family",
        type: "Group",
        contacts: [
            {id:5, name: "Roni", type: "Contact"},
        ]
    },
    {id: 8, name: "Ori", type: "Contact"},
];


var output = document.getElementById('wrapper');
output.innerHTML = "";


var contactTree =  (function(){
	//--------> Loop 1
    for( var x = 0; x < contacts.length; x++ ){

		var ulList = document.createElement("ul"),
			parentUlLiList = document.createElement("li"),
            textUlList = document.createTextNode( contacts[x].name );
			
        parentUlLiList.className += "parent-"+[x];
        parentUlLiList.appendChild(textUlList); 
        output.appendChild(ulList);
		ulList.appendChild(parentUlLiList);

		//--------> Loop 2 
		parentUlLiList.onclick = (function(x) {

		    return function(event){
			event.stopPropagation();

			var UlUlList = document.createElement("ul");
            UlUlList.className += "fade-in";

				if( contacts[x].type == "Group" && this.childNodes.length == 1 ){ 
					//console.log( "Ul Ul List created" );

			        this.appendChild(UlUlList);
			        
			            for( var y = 0; y < contacts[x].contacts.length; y++){
						
							var liList = document.createElement("li"),
								textLiList = document.createTextNode( contacts[x].contacts[y].name );	
							
							liList.appendChild(textLiList); 
			                UlUlList.appendChild(liList);

							//--------> Loop 3 
							liList.onclick = (function(y) {
							    return function(event){
								event.stopPropagation(); 

								var ulInnerList = document.createElement("ul");
								ulInnerList.className += "fade-in";

					        	if( contacts[x].contacts[y].type == "Group" && this.childNodes.length == 1){
						    			//console.log( "ul Inner List created" );
					                    for( var z = 0; z < contacts[x].contacts[y].contacts.length; z++ ){
					                        var textUlInnerList = document.createTextNode( contacts[x].contacts[y].contacts[z].name );
					                        ulInnerList.appendChild(textUlInnerList); 
					                        liList.appendChild(ulInnerList)
					                        
					                        ulInnerList.onclick = (function(z) {
											    return function(event){
												event.stopPropagation();
												//console.log("No childs");
												return false;
											    }
											})(z);
					                    }
					        	}else if( contacts[x].contacts[y].type == "Contact" ){
									//console.log( "No childs" );
									return false;
								}else{
									var fadeOutVar = this.lastChild;
									fadeOutVar.removeAttribute("class")
									fadeOutVar.className += "fade-out";
									var that = this;
									setTimeout(function(){ 
										that.lastChild.remove(); 
									}, 250);
									//console.log( "ul Inner List removed" );
								}
							        return false;
							    }
							})(y);
							//--------> /Loop 3
			            }           				
				}else if( contacts[x].type == "Contact" ){
					//console.log( "No childs" );
					return false;
				}
				else{
					var fadeOutVar = this.lastChild;
					fadeOutVar.removeAttribute("class")
					fadeOutVar.className += "fade-out";
					var that = this;
					setTimeout(function(){ 
						that.lastChild.remove(); 
					}, 250);
					//console.log( "Ul Ul List removed" )
				}  
		        return false;
		    }
		})(x);
		//--------> /Loop 2 
    }
	//--------> /Loop 1 
})();

//contactTree();
