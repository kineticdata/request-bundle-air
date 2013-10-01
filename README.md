# Request Bundle Air Documentation

## Overview
This project represents an out of the box Bundle solution for Kinetic Request. It contains the Air Theme and a Kurl catalog. See the Readme in each directory for further installation instructions and details.

## Installation / Quick Start

### Bundle
The "theme" directory should be placed into the "themes" directory of your kinetic installation and renamed to match your catalog name

Parent path:  
.../apache-tomcat-X.X.XX-sr/webapps/kinetic/themes

### Catalog
1. Open the setup/AIR_Catalog/config.rb file in a text editor

2. Edit the “CATALOG_NAME” variable with the name you want to call your catalog. Use underscores or dashes instead of spaces.

3. Edit the “THEMES_BASE” with the path to the bundle directory

4. Using Kurl (http://community.kineticdata.com/10_Kinetic_Request/KURL/02_Get_Started), use the following command to start your catalog import by replacing the text, "path-to-kurl-catalog-directory", with the path (from your kurl directory) to your unzipped kurl catalog files:
~~~~
java -jar kurl.jar -action=build_catalog -directory=path-to-kurl-catalog-directory
~~~~

5. When the import is complete, verify that the catalog is visible in Remedy and all the service items are imported.
    * Catalog Login
    * Catalog Portal
    * Profile
    * Search
    * Submission Details
    * Submissions

6. In the bundle directory open the your-theme-name/common/config/config.jspf file. Update each line where the word “AIR” is with the name of your catalog then save the file.

7. Verify configuration by opening the web site in a browser:  
http://_your-web-server_/kinetic/DisplayPage?name=_your-catalog-name_

