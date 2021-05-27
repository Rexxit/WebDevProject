<%-- 
    Document   : logoffAPI
    Created on : Oct 13, 2020, 3:16:50 PM
    Author     : wild_
--%>


<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();

    session.invalidate();
    sd.errorMsg = "You have logged off";
    
    Gson gson = new Gson();
    out.print(gson.toJson(sd));
%>