/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function slideShows()
{
            ajax("Json/cats.json", processCatList, document.getElementById("firstSlideId"));
            
            function processCatList(catList) 
            {

                // MakeSlideShow expects a property called "image", so provide that... 
                for (var i = 0; i < catList.length; i++) 
                {
                    catList[i].image;
                    catList[i].caption = catList[i].nickname;
                    console.log("image " + i + " " + catList[i].image);
                }
                
                var ss1 = MakeSlideShow(catList);
                document.getElementById("firstSlideId").appendChild(ss1);
                
                // Example showing why you need to get the ss reference, so the HTML page can invoke 
                // any public methods that may be available from the returned slide show object.
                //ss.setPicNum(2);
            }
          
          
            ajax("Json/cars.json", processCarList, document.getElementById("secondSlideId"));
            
            function processCarList(carList) 
            {

                // MakeSlideShow expects a property called "image", so provide that... 
                for (var i = 0; i < carList.length; i++) 
                {
                    carList[i].image;
                    carList[i].caption = carList[i].make;
                    console.log("image " + i + " " + carList[i].image);
                }
                
                var ss2 = MakeSlideShow(carList);
                document.getElementById("secondSlideId").appendChild(ss2);
                
                // Example showing why you need to get the ss reference, so the HTML page can invoke 
                // any public methods that may be available from the returned slide show object.
                //ss.setPicNum(2);
            }
            
            ajax("Json/waterFun.json", processWaterList, document.getElementById("thirdSlideId"));
            
            function processWaterList(waterList) 
            {

                // MakeSlideShow expects a property called "image", so provide that... 
                for (var i = 0; i < waterList.length; i++) 
                {
                    waterList[i].image;
                    waterList[i].caption = waterList[i].item;
                    console.log("image " + i + " " + waterList[i].image);
                }
                
                var ss3 = MakeSlideShow(waterList);
                document.getElementById("thirdSlideId").appendChild(ss3);
                
                // Example showing why you need to get the ss reference, so the HTML page can invoke 
                // any public methods that may be available from the returned slide show object.
                //ss.setPicNum(2);
            }
}
