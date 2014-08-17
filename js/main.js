/**
 * Created by donpage on 8/15/14.
 */

angular.module("PenEmbed", [])
    .controller("embedController", function($scope, embedService){

        $scope.editIndex = -1;
        $scope.editPenObj =     {
            url: "",
            hash: "",
            height: "",
            author: "",
            title: "",
            tab: ""
        };

        $scope.penArray = embedService.getPenArray();

        $scope.editMode = function(index){
            var penDiv = document.querySelectorAll('.embed-pen');

            $scope.editIndex = index;
            $scope.editPenObj = angular.copy($scope.penArray[index]);
            genHash($scope.editPenObj.url);
        };


        $scope.saveEdit = function(penIdx){
            genHash($scope.editPenObj.url);
            embedService.updatePen(penIdx, $scope.editPenObj);
            $scope.editIndex = -1;
        };

        $scope.cancelEdit = function(){
            $scope.editIndex = -1;
        };

        $scope.addnewPen = function(){
            console.log('adding new pen');
            var newHash = genHash($scope.newpenLink);
            embedService.addingPen($scope.newpenLink, $scope.newpenHeight, $scope.newpenTitle, $scope.newpenAuthor, $scope.newtab, $scope.editPenObj.hash)
        };

        $scope.trash = function(idx){
             embedService.trashing(idx);
        };

        function genHash(url){
            var arrayHash = url.split("/");
            var indexOfPen = arrayHash.indexOf("pen");
            $scope.editPenObj.hash = arrayHash[indexOfPen + 1];
            //addnewPen and editPen using the same 'save' field but shouldn't cause a problem since you can only do one at a time.
        }
    });
