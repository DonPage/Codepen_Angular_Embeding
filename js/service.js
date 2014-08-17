angular.module("PenEmbed")
    .service("embedService", function(){

        var penArray = [

            {
                url: "http://codepen.io/DonPage/pen/HCjem/",
                hash: "HCjem",
                height: "257",
                author: "Don Page",
                title: "Off Canvas Nav",
                tab: "result"
            }
        ];

        var shadowArray = false;
        /*
        Shadow array is the needed fail safe when deleting pens. Before, for some odd reason,
        when you delete a pen it would splice the right item out of the array but it wouldn't coordinate
        to the view. Ex: deleting penArray[1] would splice out penArray[1] but penArray[1] from the DOM would still show
        while penArray[2] would not... Even though the array was handle correctly.
         */

        this.getPenArray = function(){
            var LSsave = localStorage.getItem("EmbedPens");
            penArray = JSON.parse(LSsave) || penArray;
            return penArray;
        };

        this.updatePen = function(idx, edited){
            penArray.splice(idx, 1, edited);
            saveLS()
        };

        this.addingPen = function(link, height, title, author, tab, nhash){
            penArray.push({url: link, hash: nhash, height: height, author: author, title: title, tab: tab});
            saveLS()
        };

        this.trashing = function(index){
            var penDiv = document.querySelectorAll('.embed-pen');
            penDiv[index].style.display = "none";
            shadowArray = angular.copy(penArray);
            shadowArray.splice(index, 1);
            saveLS();


        };

        function saveLS(){
            if (shadowArray != false){
                penArray = shadowArray;
                shadowArray = false;
            }
            var ArrayStringy = JSON.stringify(penArray);
            localStorage.setItem("EmbedPens", ArrayStringy);
        }
    });
