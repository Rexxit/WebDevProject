/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

function games()
{
    
            "use strict"; // turn off the "auto variable declaration" feature of the browser.
            
            var clickSortContainer = document.createElement("div");
            clickSortContainer.classList.add("clickSort");
            var header = document.createElement("h2");
            header.innerHTML = "Games";
            clickSortContainer.appendChild(header);

            // invoke ajax function to read cars.json and if the call was successful, 
            // run function processJSON, otherwise, put an error message in the DOM element 
            // that has id "listHere".
            ajax("Json/games.json", processData, clickSortContainer);

            function processData(list) 
            {

                // print out JS object/array that was converted from JSON data by ajax function
                console.log(list);

                // build new list as we want the fields to appear in the HTML table
                // we can decide the order we want the fields to appear (first property defined is shown first)
                // we can combine, decide to exclude etc...
                var gameList = [];

                // modify properties (image and price) of the array of objects so it will look 
                // better on the page.
                for (var i = 0; i < list.length; i++) 
                {
                    // Don't show the id (no meaningful data)
                    gameList[i] = {}; // id
                    gameList[i].game_name = list[i].game_name;
                    gameList[i].game_image = "<img  src='" + list[i].game_image + "' style='width:5rem; margin:0.5rem'>";
                    //gameList[i].game_url = list[i].game_url; // url                   
                    gameList[i].game_cost = list[i].game_cost;
                    gameList[i].release_date = list[i].release_date;
                    gameList[i].game_genre = list[i].game_genre;
                    gameList[i].game_console = list[i].game_console;
                    gameList[i].user_email = list[i].user_email;
                    //gameList[i].role = list[i].userRoleId + " " + list[i].userRoleType;
                }

                console.log("GAME LIST");
                console.log(gameList);
                console.log("done");

                // Making a DOM object, nothing shows yet... 
                clickSortContainer.appendChild(makeTable(gameList, "game_name", "Styles/sortUpDown16.png"));
                console.log("making table");
            }
            return clickSortContainer;

}