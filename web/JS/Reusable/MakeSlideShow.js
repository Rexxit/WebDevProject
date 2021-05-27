function MakeSlideShow(picObjList) 
{
    // get reference to the DOM object inside which the SlideShow image 
    // and buttons will be created.
    var slideShow = document.createElement("div");

    // add a div that will hold the image
    var div = document.createElement("div");
    slideShow.appendChild(div);

    // add image into the div & set the image's src attribute to show picture
    var myImage = document.createElement("img");
    div.append(myImage);
    
    var myCaption = document.createElement("p");
    slideShow.appendChild(myCaption);

    // add back button under the image (and empty paragraph)
    var backButton = document.createElement("button");
    backButton.innerHTML = " &lt; ";
    slideShow.appendChild(backButton);

    // add forward button under the image (and empty paragraph)
    var fwdButton = document.createElement("button");
    fwdButton.innerHTML = " &gt; ";
    slideShow.appendChild(fwdButton);



    // private variable that keeps track of which image is showing
    var picNum = 0;
    setPic();

    function setPic() 
    {
        myImage.src = picObjList[picNum].image;
        myCaption.innerHTML = picObjList[picNum].caption;
    }

    // Advance to next image in the picture list
    function nextPic() 
    {
        if (picNum < picObjList.length-1) 
        {
            picNum++;
        }
        setPic();
    }
    
    
    

    // Go to the previous image in the picture list
    function prevPic() 
    {
        if (picNum > 0) 
        {
            picNum--;
        }
        setPic();
    }

    // add next and previous funcionality to next and previous buttons
    backButton.onclick = prevPic;
    fwdButton.onclick = nextPic;

    slideShow.setPicNum = function (newNum) 
    {
        if ((newNum >= 0) && (newNum < picObjList.length)) 
        {
            picNum = newNum;
            // change the src attribute of the image element to the desired new image)				
            setPic();
        }
    };

    return slideShow;
}