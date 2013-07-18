<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><%= bundle.getProperty("companyName") + " " + bundle.getProperty("catalogName")%></title>

        <%-- Include the common content. --%>
        <%@include file="../../../common/interface/fragments/headContentMobile.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/submissionDetails.css" type="text/css" />
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/jquery.qtip.css" type="text/css" />
        <!-- Page Javascript -->
         <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/jquery.qtip.min.js"></script>
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/submissionDetailsMobile.js"></script>
    </head>
    
    <body>
        <%@include file="../../../common/interface/fragments/contentHeaderMobile.jspf"%>
        <div class="container">
            <div class="topNavContainer">
                Submission Details
            </div>
            <%
                if (context == null) {
                    ResponseHelper.sendUnauthorizedResponse(response);
                } else {
                    String csrv = request.getParameter("submissionId");
                    Submission submission = Submission.findByInstanceId(context, csrv);

                    if (submission == null) {
            %>
            <div class="submissionDetails">
                Unable to locate record
            </div>
            <%} else {
            %>
            <div class="submissionDetails">
                <div class="timeline">
                    <ul class="events">
                        <%-- REQUEST START VIEW --%>
                        <li>
                            <div class="requestId">
                                <a title="Review Submission" class="read" href="<%= bundle.applicationPath()%>ReviewRequest?csrv=<%=submission.getId()%>&excludeByName=Review%20Page">
                                    Kinetic Request - <%= submission.getRequestId()%>
                                </a>
                            </div>
                            <div class="template">
                                <%= submission.getTemplateName()%>
                                <div class="details">
                                    <div class="detail">
                                        <% if(!submission.getNotes().equals("")) {%>
                                        Notes: <%= submission.getNotes()%>
                                        <%}%>
                                    </div>
                                    <div id="submissionStartDate" class="detail" data-created="<%= DateHelper.formatDate(submission.getCreateDate(), request.getLocale())%>">
                                        <%= DateHelper.formatDate(submission.getCreateDate(), request.getLocale())%>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <%-- TASKS VIEW --%>
                        <% for (String treeName : submission.getTaskTreeExecutions(context).keySet()) {%>
                            <% for (Task task : submission.getTaskTreeExecutions(context).get(treeName)) {%>
                            <li class="task" style="width: 30%;" data-created="<%= DateHelper.formatDate(task.getCreateDate(), request.getLocale())%>"
                            <% if (task.getStatus().equals("Closed")) {%>
                                data-closed="<%= DateHelper.formatDate(task.getModifiedDate(), request.getLocale())%>"
                            <% } else {%>
                                 data-closed="<%= DateHelper.getCurrentDateTime(request.getLocale())%>"
                            <% }%> >
                                <% TaskMessage[] messages = task.getMessages(context); %>
                                <% if(task.hasMessages()) {%>
                                    <div>
                                        <img width="16" height="16" src="<%=bundle.packagePath()%>resources/images/comments.png" />
                                    </div>
                                 <% }%>
                                <div class="taskName">
                                    <%= task.getName()%>                                          
                                </div>
                                <div class="details hidden">
                                    <div class="detail">
                                        Status: <%= task.getStatus()%>
                                    </div>
                                    <div class="detail">
                                        Initiated: <%= DateHelper.formatDate(task.getCreateDate(), request.getLocale())%>
                                    </div>
                                    <% if (task.getStatus().equals("Closed")) {%>
                                    <div class="detail">
                                        Completed: <%= DateHelper.formatDate(task.getModifiedDate(), request.getLocale())%>
                                    </div>
                                    <%}%>
                                    <% if(task.hasMessages()) {%>
                                        Messages:
                                        <% for (TaskMessage message : messages) {%>
                                            <div class="detail"> 
                                                <div class="message"><%= message.getMessage()%></div>  
                                            </div>
                                        <% }%>
                                    <% }%>
                                </div>
                            </li>
                            <% }%>
                        <% }%>
                        
                        <%-- REQUEST COMPLETE/OPEN VIEW --%>
                        <li>
                        <% if (submission.getRequestStatus().equals("Closed")) {%>
                            Request Closed
                            <div class="details">
                                <div id="submissionCloseDate" class="detail" data-closed="<%= DateHelper.formatDate(submission.getRequestClosedDate(), request.getLocale())%>">
                                    &nbsp;(<%= DateHelper.formatDate(submission.getCreateDate(), request.getLocale())%> - <%= DateHelper.formatDate(submission.getRequestClosedDate(), request.getLocale())%>)
                                </div>
                                Elapsed Days&nbsp;<span id="elapsed-days"></span>
                            </div>
                        <%} else {%>
                             Request Open
                            <div class="details">
                                 <div id="submissionCloseDate" class="detail" data-closed="<%= DateHelper.getCurrentDateTime(request.getLocale())%>">
                                     &nbsp;(<%= DateHelper.formatDate(submission.getCreateDate(), request.getLocale())%> - <%= DateHelper.getCurrentDateTime(request.getLocale())%>)
                                 </div> 
                                Elapsed Days&nbsp;<span id="elapsed-days"></span>
                            </div>
                        <% }%>
                        </li>
                    </ul>
                </div>
                <div style="height: 1px;"></div>
            </div>
            <% }%>
            <% }%>
        </div>
        <%@include file="../../../common/interface/fragments/contentFooterMobile.jspf"%>
    </body>
</html>