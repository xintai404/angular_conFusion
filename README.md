# angular_conFusion

 1. Implemented a single page application using AngularJS
 2. Bulid client-server commnuication using RESTful API angular-resource and server is set up by json-server
 3. Applied task-runner Gulp to watch and bulid(jshint, usemin, minify, uglify, rev) automatically
 
# To Run:
 Start Gulp:<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;cd ./conFusion<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;gulp watch   (after building, copy all files from /conFusion/dist to /json-server/public)<br/>

 
 Start Server:<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;cd ./json-server <br/>
   &nbsp;&nbsp;&nbsp;&nbsp;json-server --watch db.json<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;type "localhost:3000" in your browser<br/>
