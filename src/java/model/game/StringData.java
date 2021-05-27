package model.game;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData 
{ 

    public String gameTableId = "";
    public String gameName = "";
    public String gameName2 = "";
    public String gameURL = "";
    public String gameCost = "";
    public String releaseDate = "";
    public String gameGenre = "";
    public String gameConsole = "";
    public String webUserId = "";   // Foreign Key
    public String userImage = ""; // getting it from joined user_role table.

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) 
    {
        try {
            // plainInteger returns integer converted to string with no commas.
            this.gameTableId = FormatUtils.formatInteger(results.getObject("game_table_id"));
            this.gameName = FormatUtils.formatString(results.getObject("game_name"));
            this.gameURL = FormatUtils.formatString(results.getObject("game_url"));
            this.gameCost = FormatUtils.formatDollar(results.getObject("game_cost"));
            this.releaseDate = FormatUtils.formatDate(results.getObject("release_date"));
            this.gameGenre = FormatUtils.formatString(results.getObject("game_genre"));
            this.gameConsole = FormatUtils.formatString(results.getObject("game_console"));
            this.webUserId = FormatUtils.plainInteger(results.getObject("game_table.web_user_id"));
            this.userImage = FormatUtils.formatString(results.getObject("image"));
        } 
        catch (Exception e) 
        {
            this.errorMsg = "Exception thrown in model.game.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() 
    {
        String s = this.gameTableId + this.gameName + this.gameName2 + this.gameURL + this.gameCost + this.releaseDate
                + this.gameGenre + this.webUserId + this.userImage;
        return s.length();
    }

    public String toString() 
    {
        return "Game Table Id:" + this.gameTableId
                + ", Game Name: " + this.gameName
                + ", Game Name2: " + this.gameName2
                + ", Game URL: " + this.gameURL
                + ", Game Cost: " + this.gameCost
                + ", Release Date: " + this.releaseDate
                + ", Game Genre: " + this.gameGenre
                + ", User Role Id: " + this.webUserId
                + ", User Image: " + this.userImage;
    }
}
