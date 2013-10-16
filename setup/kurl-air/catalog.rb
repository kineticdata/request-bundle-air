require File.join(File.dirname(__FILE__),"config.rb")

catalog CATALOG_NAME,
  :description => CATALOG_SERVICE_CATALOG_NAME,
  :web_server_url => WEB_SERVER,
  :display_page => DISPLAY_PAGE,
  :assignee_group => "0;",
  :management_group => MANAGEMENT_GROUP do
  category "Example Templates",
    :active,
    :description => "<h2>Example Service Item Templates</h2>\n\n<p>Included in this catalog is a sample template to get you started, <strong>Service Item Example with Person Search</strong><br />\nThis template is an example template that includes a simple data request lookup on the CTM: People form and a sample task tree with workflow for creating an incident. You can clone this template to create service items for incidents, create a change, etc.</p>\n\n\n<p>For a full list of example service items visit the Kinetic Community at <a href=\"http://community.kineticdata.com/10_Kinetic_Request/Resources/Example_Service_Items\" target=\"_blank\">http://community.kineticdata.com/10_Kinetic_Request/Resources/Example_Service_Items</a></p>"
  logout_action :go_to_template,
     :template_name => STANDARD_AUTHENTICATION_FORM,
     :catalog_name => CATALOG_NAME
 end
