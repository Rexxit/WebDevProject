function home () {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
      <h2>Home</h2>
      <h3>Welcome to the G-Zone~</h3>
    
            <p>
                You'll find all upcoming games, and streams from all across
                each platform. Here you can easily access and view a variety of games
                that are already out or going to come out. You can see descriptions of the 
                games, pricing, console correlation, and ratings. Also, you can use this site
                to view a variety of streamers from all across different platforms here.
                The streamers links will send you to their corresponding site to view and
                watch them.
            </p>
            
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele; 
}