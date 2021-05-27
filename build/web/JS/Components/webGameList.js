function webGameList() {

    var contentDOM = document.createElement("div");
    contentDOM.classList.add("clickSort");
    
    ajax("webAPIs/listGameAPI.jsp", success, contentDOM);
    function success(obj) {
        
        console.log("listGameAPI.jsp AJAX successfully returned the following data");
        console.log(obj);
        
        // Remember: getting a successful ajax call does not mean you got data. 
        // There could have been a DB error (like DB unavailable). 
        if (obj.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }

        var heading = Utils.make({
            htmlTag: "h2",
            parent: contentDOM
        });
        Utils.make({// don't need reference to this span tag...
            htmlTag: "span",
            innerHTML: "Game List ",
            parent: heading
        });
        var img = Utils.make({
            htmlTag: "img",
            parent: heading
        });
        img.src = CRUD_icons.insert;
      
        img.onclick = function () {
            // By changing the URL, you invoke the user insert. 
            window.location.hash = "#/gameInsert";
        };


        /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        // create userList (new array of objects) to have only the desired properties of obj.webUserList. 
        // Add the properties in the order you want them to appear in the HTML table.

        var gamesList = [];
        for (var i = 0; i < obj.webGameList.length; i++) {
            gamesList[i] = {}; // add new empty object to array

            gamesList[i].gameTableId = obj.webGameList[i].gameTableId;
            console.log("TABLE ID: "+obj.webGameList[i].gameTableId);
            gamesList[i].gameName = obj.webGameList[i].gameName;
            gamesList[i].gameURL = obj.webGameList[i].gameURL;
            gamesList[i].gameCost = obj.webGameList[i].gameCost;
            gamesList[i].releaseDate = obj.webGameList[i].releaseDate;
            gamesList[i].gameGenre = obj.webGameList[i].gameGenre;
            gamesList[i].gameConsole = obj.webGameList[i].gameConsole;
            gamesList[i].webUserId = obj.webGameList[i].webUserId;
     

            // Remove this once you are done debugging...
            //gameList[i].errorMsg = obj.gameList[i].errorMsg;


            gamesList[i].update = `<img src="` + CRUD_icons.update + 
            `" onclick= "window.location.hash = '#/gameUpdate/`+gamesList[i].gameTableId+`'">`;
    
            gamesList[i].delete = `<img src="` + CRUD_icons.delete +
            `" onclick= " webGameList.delete(`+gamesList[i].gameTableId +`,this);" >`;
        }

        var gameTable = makeTable(gamesList, "gameName", "Styles/sortUpDown16.png", "Games");

        contentDOM.appendChild(gameTable);
    } // end of function success

    return contentDOM;
} // gameList

// invoke a web API passing in userId to say which record you want to delete. 
// but also remove the row (of the clicked upon icon) from the HTML table -- if Web API sucessful... 
webGameList.delete = function (gameTableId,icon) {
    
    console.log("what the hell is going on");

    var contentDOM = document.getElementById("div");

    // parameter properties needed for ajax call: url, successFn, and errorId
    ajax("webAPIs/deleteGame.jsp?deleteId=" + gameTableId, confirmDelete, contentDOM);
    function confirmDelete(obj) {

        // Empty string means sucessful delete. The HTML coder gets to decide how to 
        // deliver the good news.
        if (obj.errorMsg.length === 0) {
            if (confirm("Do you really want to delete game " + gameTableId + "? ")) {
                console.log("icon that was passed into JS function is printed on next line");
                console.log(icon);
                
                // icon's parent is cell whose parent is row 
                var dataRow = icon.parentNode.parentNode;
                var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
                var dataTable = dataRow.parentNode;
                dataTable.deleteRow(rowIndex);
                alert("Deletion Sucessful");
              
            }//end of if

        }//end of if 
        
        else {
            console.log("Delete game got this error: " + obj.errorMsg);
            alert("Deletion Failed");
        }//end of else

    }//end of confirmDelete
};

