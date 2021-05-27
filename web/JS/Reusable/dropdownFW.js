/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

        "use strict";
        // cleans out the container and then injects (into container) whatever was passed in.
        // if you don't clean out first, it appends, not replaces.
        function inject(what) 
        {
                document.getElementById("view").innerHTML = "";
                document.getElementById("view").appendChild(what);
        }
        // sends the output of the call to home() to the inject function 
        inject(home());



//the script for the drop down menu. This shows the drop down menu and closes it on window click
  window.onclick = function (event) 
            {

                var clickedEle = event.target;  // this is the DOM element (anywhere on page) that was clicked.
                
                if (clickedEle.classList.contains("dropHeader")) 
                {
                    // getElementsByClassName returns an array - add [0] to access the first element of that array.
                    var nextEle = clickedEle.parentElement.getElementsByClassName("dropContent")[0];
                    // console.log("nextEle on next line");
                    // console.log(nextEle);

                    if (nextEle.classList.contains("show")) 
                    {
                        hide(nextEle);
                    } 
                    else 
                    {
                        show(nextEle);          //shows the one we want
                        hideDropMenu(nextEle);    //closes other dropdown menues
                    }
                
                } 
                else 
                {
                    // This is when they click anywhere on the page (not a dropHeader).
                    var dropContentList = document.getElementsByClassName("dropContent");
                    for (var i = 0; i < dropContentList.length; i++) 
                    {
                        dropContentList[i].classList.remove("show");
                        dropContentList[i].classList.add("hide");
                    }
                }

                // private function defined inside of another function
                function hide(ele) 
                {
                    ele.classList.remove("show");
                    ele.classList.add("hide");
                }

                // private function defined inside of another function
                function show(ele) 
                {
                    ele.classList.remove("hide");
                    ele.classList.add("show");
                }
                
                function hideDropMenu(ele)
                {
                    var dropContentList = document.getElementsByClassName("dropContent");
                    for(var i = 0; i < dropContentList.length; i++)
                    {
                        if(dropContentList[i] != ele)
                        {
                            hide(dropContentList[i]);
                        }
                    }
                }

            }; // end function dropdown
            
    
              // window.onclick function 