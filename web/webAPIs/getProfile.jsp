<%-- 
    Document   : getProfile
    Created on : Oct 13, 2020, 3:17:24 PM
    Author     : wild_

--%>


<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
 
    if(session.getAttribute("user") != null)
    {
        sd = (StringData) session.getAttribute("user");
    }//end of if
    
    else
    {
        sd.errorMsg = "Information Unavailable. You are not logged on";
    }//end of else
    
    Gson gson = new Gson();
    out.print(gson.toJson(sd));
%>