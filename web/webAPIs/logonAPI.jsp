<%-- 
    Document   : logonAPI
    Created on : Oct 13, 2020, 3:16:29 PM
    Author     : wild_
takes url email and passworf
--%>

<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    
    String getEmail = request.getParameter("userEmail");
    String getPass = request.getParameter("userPass");
    
    if (getEmail == null || getPass == null) 
    {
        sd.errorMsg = "Cannot find. email and password most be supplied";
    } 
    else 
    {
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr(); 
        if (sd.errorMsg.length() == 0) 
        { 
            System.out.println("*** Ready to call DbMods.logonSearch");
            sd = DbMods.logonSearch(dbc, getEmail, getPass);  
            
            if(sd.errorMsg.length() > 0)
            {
                session.invalidate();
            }//end of if
            else
            {
                session.setAttribute("user", sd);
            }//end of else
        }//end of if
        dbc.close(); 
    }//end of else
    Gson gson = new Gson();
    out.print(gson.toJson(sd));
%>