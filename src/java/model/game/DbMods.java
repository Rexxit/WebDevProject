package model.game;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    public static StringData findById(DbConn dbc, String id) {

        StringData sd = new StringData();
        try {
            String sql = "SELECT game_table_id, game_name, game_url, game_cost, release_date, game_genre, game_console, "  
                    + "game_table.web_user_id, image "
                    + "FROM game_table, web_user WHERE game_table.web_user_id = web_user.web_user_id "
                    + "AND game_table_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                
                //StringData sd = new StringData();

                // plainInteger returns integer converted to string with no commas.
                sd.gameTableId = FormatUtils.plainInteger(results.getObject("game_table_id"));
                sd.gameName = FormatUtils.formatString(results.getObject("game_name"));
                sd.gameURL = FormatUtils.formatString(results.getObject("game_url"));
                sd.gameCost = FormatUtils.formatDollar(results.getObject("game_cost"));
                sd.releaseDate = FormatUtils.formatDate(results.getObject("release_date"));
                sd.gameGenre = FormatUtils.formatString(results.getObject("game_genre"));
                sd.gameConsole = FormatUtils.formatString(results.getObject("game_console"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("game_table.web_user_id"));
                sd.userImage = FormatUtils.formatString(results.getObject("image"));
                //sdl.add(sd);
            }
            else
            {
                sd.errorMsg = "Web User Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            //StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in gameView.getGameById(): " + e.getMessage();
            //sdl.add(sd);
        }
        return sd;

    } // getUserById

    
    
    
    
    
    
    /******************************************** Validate method ***********************/
    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
    public String gameTableId = "";
    public String gameName = "";
    public String gameURL = "";
    public String gameCost = "";
    public String releaseDate = "";
    public String gameGenre = "";
    public String gameConsole = "";
    public String webUserId = "";   // Foreign Key
    public String userImage = ""; // getting it from joined user_role table.
         */
        
        // Validation
        errorMsgs.gameName = ValidationUtils.stringValidationMsg(inputData.gameName, 100, true);
        errorMsgs.gameURL = ValidationUtils.stringValidationMsg(inputData.gameURL, 100, true);

        if (inputData.gameName.compareTo(inputData.gameName2) != 0) { // case sensative comparison
            errorMsgs.gameName2 = "Both names must match";
        }

        errorMsgs.userImage = ValidationUtils.stringValidationMsg(inputData.userImage, 300, false);

        errorMsgs.releaseDate = ValidationUtils.dateValidationMsg(inputData.releaseDate, false);
        errorMsgs.gameCost = ValidationUtils.decimalValidationMsg(inputData.gameCost, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        return errorMsgs;
    } // validate 

    
    /********************************* INSERT FUNCTION
     * @param inputData
     * @param dbc
     * @return  *************************/
    public static StringData insert(StringData inputData, DbConn dbc) 
    {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO game_table (game_name, game_url, game_genre, game_console, game_cost, release_date , web_user_id) "
                    + "values (?,?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.gameName); // string type is simple
            pStatement.setString(2, inputData.gameURL);
            pStatement.setString(3, inputData.gameGenre);
            pStatement.setString(4, inputData.gameConsole);
            pStatement.setBigDecimal(5, ValidationUtils.decimalConversion(inputData.gameCost));
            pStatement.setDate(6, ValidationUtils.dateConversion(inputData.releaseDate));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That game name already exists";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert
    
    
    
    
    
    
    
    
    

    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE game_table SET game_name=?, game_url=?, game_console= ?, game_cost=?, release_date=?, "
                    + "web_user_id=? WHERE game_table_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.gameName); // string type is simple
            pStatement.setString(2, inputData.gameURL);
            pStatement.setString(3, inputData.gameConsole);
            pStatement.setBigDecimal(4, ValidationUtils.decimalConversion(inputData.gameCost));
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.releaseDate));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.gameTableId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That game name is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
    
    
    
    
    
    
    
    
    
    
    public static String delete(String gameTableId, DbConn dbc) {

        if (gameTableId == null) {
            return "Error in modelwebUser.DbMods.delete: cannot delete web_user record because 'userId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM game_table WHERE game_table_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, gameTableId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with game_table_id " + gameTableId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.webUser.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }
    
} // class
