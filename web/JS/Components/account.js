/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var account = {};
var msgDiv = document.createElement("div");

(function () 
{
    account.logon = function ()
    {
        
    var findDiv = document.createElement("div");
    findDiv.classList.add("find");

    var userEmail = document.createElement('span');
    userEmail.innerHTML = "Enter email: ";
    findDiv.appendChild(userEmail);
    
    var userEmailInput = document.createElement("input");
    findDiv.appendChild(userEmailInput);
    
    var userPass = document.createElement('span');
    userPass.innerHTML = "Enter password: ";
    findDiv.appendChild(userPass);
    
    var userPassInput = document.createElement("input");
    userPassInput.setAttribute("type", "password"); //shows dots not characters
    findDiv.appendChild(userPassInput);

    var findButton = document.createElement("button");
    findButton.innerHTML = "Find";
    findDiv.appendChild(findButton);

    findDiv.appendChild(msgDiv);
    
    
    findButton.onclick = function () 
    {

        // You have to escape user input before putting into a URL for an AJAX call.
        // Otherwise, your URL may be refused (for security reasons) by the web server.
        var url = "webAPIs/logonAPI.jsp?userEmail=" + escape(userEmailInput.value) + "&userPass=" + escape(userPassInput.value);
        console.log("onclick function will make AJAX call with url: " + url);
        ajax(url, processLogon, msgDiv);
        
        function processLogon(userObj)
        {
         msgDiv.innerHTML = account.buildProfile(userObj);   
        } //end

    }; //end onclick function()
        return findDiv;
    }; //end account.logon()
    
    
    account.buildProfile = function (userObj) 
    {
            var msg = "";
            console.log(userObj);
            if (userObj.errorMsg.length > 0)
            {
                msg += "<strong>Error: " + userObj.errorMsg + "</strong>";
            } 
            else 
            {
                msg += "<strong>Welcome Web User " + userObj.webUserId + "</strong>";
                msg += "<br/> Birthday: " + userObj.birthday;
                msg += "<br/> MembershipFee: " + userObj.membershipFee;
                msg += "<br/> User Role: " + userObj.userRoleId + " " + userObj.userRoleType;
                msg += "<p> <img src ='" + userObj.image + "'></p>";
            }
            return msg;
    };//end account.buildProfile()

    account.getProfile = function ()
    {
        var findProfile = document.createElement("div");
        findProfile.classList.add("userinfo");
        findProfile.appendChild(msgDiv);
        
        var url = "webAPIs/getProfile.jsp";
        console.log("onclick function will make AJAX call with url: " + url);
        ajax(url, processLogon, msgDiv);
        function processLogon(userObj)
        {
            msgDiv.innerHTML = account.buildProfile(userObj);
        } //end
        return findProfile;
    };

    account.logoff = function ()
    {
        var findLogoff = document.createElement("div");
        findLogoff.classList.add("userinfo");
        findLogoff.appendChild(msgDiv);
        
        var url = "webAPIs/logoffAPI.jsp";
        console.log("onclick function will make AJAX call with url: " + url);
        ajax(url, processLogon, msgDiv);
        function processLogon(userObj)
        {
            msgDiv.innerHTML = account.buildProfile(userObj);
        } //end
        
        return findLogoff;
    };
    
}());