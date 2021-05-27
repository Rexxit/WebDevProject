/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function logonSearch() {

    var findDiv = document.createElement("div");
    findDiv.classList.add("find");

    var emailIdSpan = document.createElement('span');
    emailIdSpan.innerHTML = "Search for Web User with email: ";
    findDiv.appendChild(emailIdSpan);
    var emailIdInput = document.createElement("input");
    findDiv.appendChild(emailIdInput);
    
    var passwordIdSpan = document.createElement('span');
    passwordIdSpan.innerHTML = "Password: ";
    findDiv.appendChild(passwordIdSpan);
    var passwordInput = document.createElement("input");
    findDiv.appendChild(passwordInput);

    var findButton = document.createElement("button");
    findButton.innerHTML = "Find";
    findDiv.appendChild(findButton);

    var msgDiv = document.createElement("div");
    findDiv.appendChild(msgDiv);

    findButton.onclick = function () {

        // You have to escape user input before putting into a URL for an AJAX call.
        // Otherwise, your URL may be refused (for security reasons) by the web server.
            var url = "webAPIs/logonAPI.jsp?email=" + escape(emailIdInput.value) +
              "&password=" + escape(passwordInput.value); 
        
        console.log("onclick function will make AJAX call with url: " + url);
        ajax(url, processLogon, msgDiv);

        function processLogon(obj) {
            var msg = "";
            console.log("Successfully called the find API. Next line shows the returned object.");
            console.log(obj);
            if (obj.errorMsg.length > 0) {
                msg += "<strong>Error: " + obj.errorMsg + "</strong>";
            } else {
                msg += "<strong>Welcome Web User " + obj.webUserId + "</strong>";
                msg += "<br/> Birthday: " + obj.birthday;
                msg += "<br/> MembershipFee: " + obj.membershipFee;
                msg += "<br/> User Role: " + obj.userRoleId + " " + obj.userRoleType;
                msg += "<p> <img src ='" + obj.image + "'></p>";
            }
            msgDiv.innerHTML = msg;
        }
    };  // onclick function

    return findDiv;
}
;


// I copy/paste the field names from the JSON file to be 
// sure I have them spelled correctly (and case matters).

/* "webUserId": "110",
 "userEmail": "bri",
 "userPassword": "no",
 "birthday": "",
 "membershipFee": "",
 "userRoleId": "1",
 "userRoleType": "Admin",
 "errorMsg": ""                    
 */

