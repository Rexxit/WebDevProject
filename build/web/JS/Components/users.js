/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

function users()
{
    
            "use strict"; // turn off the "auto variable declaration" feature of the browser.
            
            var clickSortContainer = document.createElement("div");
            clickSortContainer.classList.add("clickSort");
            var header = document.createElement("h2");
            header.innerHTML = "Users";
            clickSortContainer.appendChild(header);

            // invoke ajax function to read cars.json and if the call was successful, 
            // run function processJSON, otherwise, put an error message in the DOM element 
            // that has id "listHere".
            ajax("Json/users.json", processData, clickSortContainer);

            function processData(list) 
            {

                // print out JS object/array that was converted from JSON data by ajax function
                console.log(list);

                // build new list as we want the fields to appear in the HTML table
                // we can decide the order we want the fields to appear (first property defined is shown first)
                // we can combine, decide to exclude etc...
                var userList = [];

                // modify properties (image and price) of the array of objects so it will look 
                // better on the page.
                for (var i = 0; i < list.length; i++) 
                {

                    userList[i] = {};
                    // Don't show the id (no meaningful data)
                    userList[i].image = "<img  src='" + list[i].image + "' style='width:5rem; margin:0.5rem'>";
                    userList[i].userEmail = list[i].userEmail; // show this first
                    // Don't show the password
                    userList[i].birthday = list[i].birthday;
                    userList[i].membershipFee = list[i].membershipFee;
                    userList[i].role = list[i].userRoleId + " " + list[i].userRoleType;
                }

                console.log("USER LIST");
                console.log(userList);

                // Making a DOM object, nothing shows yet... 
                clickSortContainer.appendChild(makeTable(userList, "userEmail", "Styles/sortUpDown16.png"));
            }
            return clickSortContainer;

}