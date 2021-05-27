
            "use strict";
            
//            
//            //var myArray = {};
//            var myArray=[];
//            myArray["a123"] = "hammer";
//            myArray.b234 = "wrench";
//            

            // set up route associative (key/value) array to hold link/content associations.
            var routes = [];

            // Add link/content entries into the route array. 
            // Using JS associative array notation to store key/value pair like a hash. 
            // With associative array syntax, the key looks like an array index 
            // (even though its a character string, not an integer).
            routes['/'] = home; // note: this not in quotes - home means the JS function home.
            routes['#/home'] = home; // the  JS function home. 
            routes['#/blog'] = blog; // the JS function blog.
            routes['#/slideShows'] = slideShows;
            routes['#/Gamers'] = users;
            //routes['#/liveGamers'] = liveUsers;
            routes['#/liveGamers'] = webUserList;
            routes['#/userInsert'] = webUserMods.insert;
            routes['#/gameInsert'] = webGameMods.insert;
            routes['#/liveUpcomingGames'] = webGameList;
            routes['#/UpcomingGames'] = games;
            routes['#/logOn'] = account.logon;
            routes['#/logOff'] = account.logoff;
            routes['#/Profile'] = account.getProfile;
            routes['#/userUpdate'] = webUserMods.update;
            routes['#/gameUpdate'] = webGameMods.update;
            
            routes[2]="hello";         
            console.log("length of routing table is "+routes.length);
            
            routes.courseNum = "3308";
            console.log(routes.courseNum);

            console.log("routes printed on next line ");
            console.log(routes);

            function inject (what) {
                document.getElementById("view").innerHTML = "";
                document.getElementById("view").appendChild(what);
            }
            
            
            function parsePath(path) {

        // start out assuming that this is a parameterless path (URL)
        var obj = {
            param: "",
            funcName: path
        };

        // search for last '/' in the path (URL)
        var n = path.lastIndexOf("/");

        // n = -1 means no '/' 
        // #/home would be a "normal" (parameterless) URL. For this, n would be 1 
        // (indicating the last/only '/' in the URL).
        if (n > 1) {
            obj.param = path.substring(n + 1);
            console.log('routParamFw extracted parameter [' + obj.param + '] from path [' + path + ']');
            obj.funcName = path.substring(0, n);
        }
        console.log("*** parsePath: path is [" + path + "] param is [" + obj.param + "] and funcName is [" + obj.funcName + "]");
        return obj;
    } // parsePath

            function router() {

        var path = location.hash;

        var ele;
        var pathObj = parsePath(path);
        if (!routes[pathObj.funcName]) {  // the funcName of the URL was never registered in the routing table

            ele = document.createElement("div");
            ele.innerHTML = "<p>Error: unknown link '" + pathObj.funcName
                    + "' was never added to the routing table.</p>";

        } else if (pathObj.param.length > 0) { // if this URL has a parameter after the last /

            // Invoke the function that's stored in the routing table, passing in the parameter. 
            ele = routes[pathObj.funcName](pathObj.param);

        } else {  //    This is a "regular" URL with no parameters, so dont pass any parameters into 
            // the single use component.
            var ele = routes[pathObj.funcName](); // returns DOM element from the function stored in the routes associative array
        }

        inject(ele);
    } // router

            // Listen on hash change (whenever a link is clicked)
            // In other words, whenever a link is clicked, invoke function router.
            window.addEventListener('hashchange', router);

            // invoke an invalid content/link so that the next line will definitely change location.hash
            // Otherwise sometimes with refresh you do not see the home content
            window.location.hash = '#/xxx';

            // content for when page is first rendered.
            window.location.hash = '#/home';

