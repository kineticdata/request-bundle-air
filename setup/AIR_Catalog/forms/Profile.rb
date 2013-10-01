require File.join(File.dirname(__FILE__),"../config.rb")

service_item "Profile" do
  catalog CATALOG_NAME
  categories ""
  type "Service Item"
  description "\n    <div class=\"serviceItemDescriptionHeader rounded6\" >Profile</div>\n    <div id=\"descriptionContent\" class=\"descriptionContent\">                     \n      <div style=\"float:right;padding-left:5px;padding-bottom:5px;\">\n        <img src=\"/kinetic/themes/acme/images/primo_icons/PNG/64x64/user.png\"/>\n      </div>\n      <br/>\n      Update personal information.<br/>\n    </div>\n    <div style=\"clear:both;\"> </div>\n  "
  display_page DISPLAY_PAGE
  display_name "#{DISPLAY_NAME_FOR_URL}_UserProfile"
  web_server WEB_SERVER
  page "Initial Page",
    :contents,
    :horizontal_buttons,
    :submit_button_value => "Submit" do
    text "Service Item Description", "    <h2 class=\"serviceItemDescriptionHeader \" >Profile</h2>\n    <div id=\"descriptionContent\" class=\"descriptionContent\">                     \n      <div style=\"float:right;padding-left:5px;padding-bottom:5px;\">\n        <img src=\"\"/>\n      </div>\n      <br/>\n      Update personal information.<br/>\n    </div>\n    <div style=\"clear:both;\"> </div>"
    text "Gravatar", "<div id=\"gravatar\" style=\"float:right;\"></div>\n<script type=\"text/javascript\">\njQuery(document).ready(function() {\ngravatar($.trim($('.email input').val()), '#gravatar');\n});\n</script>"
    section  "Submitter"
    question "Requester First Name", "First Name", :free_text,
      :required,
      :advance_default,
      :editor_label => "Req First Name",
      :answer_mapping => "First Name",
      :default_form => "KS_SAMPLE_People",
      :default_field => "First Name",
      :default_qual => "'AR Login'=$\\USER$",
      :size => "20",
      :rows => "1",
      :max => "50",
      :required_text => "Requester First Name"
    question "Requester Last Name", "Last Name", :free_text,
      :required,
      :advance_default,
      :editor_label => "Req Last Name",
      :answer_mapping => "Last Name",
      :default_form => "KS_SAMPLE_People",
      :default_field => "Last Name",
      :default_qual => "'AR Login'=$\\USER$",
      :size => "20",
      :rows => "1",
      :max => "100",
      :required_text => "Requester Last Name"
    question "Requester Email Address", "Email", :email,
      :required,
      :advance_default,
      :editor_label => "Req Email Address",
      :answer_mapping => "Contact Info Value",
      :default_form => "KS_SAMPLE_People",
      :default_field => "Email",
      :default_qual => "'AR Login'=$\\USER$",
      :size => "20",
      :required_text => "Requester Email",
      :pattern_label => "Standard Email Address",
      :pattern => "^[\\w-\\.]+\\@[\\w\\.-]+\\.[a-zA-Z]{2,4}$",
      :validation_text => "Requester Email Address (Standard Email Address)",
      :style_class => " email ",
      :field_map_number => "1"
    question "Address", "Address", :free_text,
      :advance_default,
      :default_form => "KS_SAMPLE_People",
      :default_field => "AddrLine1",
      :default_qual => "'AR Login'=$\\USER$",
      :size => "20",
      :rows => "1",
      :field_map_number => "2"
    question "City", "City", :free_text,
      :advance_default,
      :default_form => "KS_SAMPLE_People",
      :default_field => "City",
      :default_qual => "'AR Login'=$\\USER$",
      :size => "20",
      :rows => "1",
      :field_map_number => "3"
    question "State", "State", :free_text,
      :advance_default,
      :default_form => "KS_SAMPLE_People",
      :default_field => "State/Prov",
      :default_qual => "'AR Login'=$\\USER$",
      :size => "20",
      :rows => "1",
      :field_map_number => "4"
    question "Zip", "Zip", :free_text,
      :advance_default,
      :default_form => "KS_SAMPLE_People",
      :default_field => "Postal Code",
      :default_qual => "'AR Login'=$\\USER$",
      :size => "20",
      :rows => "1",
      :field_map_number => "5"
  end
  page "Confirmation Page",
    :confirmation,
    :vertical_buttons,
    :submit_button_value => "Submit" do
    section  "Details"
    text "Service Item Description", "<p>\n    <div class=\"serviceItemDescriptionHeader rounded6\" >Profile</div>\n    <div id=\"descriptionContent\" class=\"descriptionContent\">                     \n      <div style=\"float:right;padding-left:5px;padding-bottom:5px;\">\n        <img src=\"/kinetic/themes/acme/images/primo_icons/PNG/64x64/user.png\"/>\n      </div>\n      <br/>\n      <p>&nbsp;</p><br/>\n    </div>\n    <div style=\"clear:both;\"> </div>\n  </p>"
    text "Thanks", "Thank you",
      :style_class => " primaryColorHeader "
    text "Thanks/Submission ID", "<p>Thanks for your submission.</p>    <p><b>Submission ID:  </b><FLD>Submission ID;536870913;BASE</FLD> </p>"
    text "Request Info", ""
    text "Return to catalog/improve our service", "\n    <p><a href=\"DisplayPage?name=AON_Catalog\">Back to the service catalog</a><br/></p>\n    <p><a href=\"DisplayPage?name=AON_ImproveOurService&custId=<FLD>CustomerSurveyInstanceId;179;BASE</FLD>\">Help improve our service</a></p>\n    "
  end
  task_tree "An automated create",
    :type => "Complete",
    :xml => "<taskTree schema_version=\"1.0\" version=\"\" builder_version=\"1.0.0\">\n                    <name>Standard incident process</name>\n                    <author/>\n                    <notes/>\n                    <lastID>3</lastID>\n                    <request>\n                      <task name=\"Create IT Incident\" id=\"sithco_incident_create_deferred_v1_1\" definition_id=\"sithco_incident_create_deferred_v1\" x=\"220\" y=\"280\">\n                        <version>1</version>\n                        <configured>true</configured>\n                        <defers>true</defers>\n                        <deferrable>true</deferrable>\n                        <visible>true</visible>\n                        <parameters>\n                          <parameter id=\"ar_login\" tooltip=\"Ar Login\" label=\"AR Login\" required=\"false\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"\">&lt;%=@dataset['Submitter']%&gt;</parameter>\n                          <parameter id=\"first_name\" tooltip=\"First Name\" label=\"First Name\" required=\"false\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"\">&lt;%=@answers['Req First Name']%&gt;</parameter>\n                          <parameter id=\"last_name\" tooltip=\"Last Name\" label=\"Last Name\" required=\"false\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"\">&lt;%=@answers['Req Last Name']%&gt;</parameter>\n                          <parameter id=\"email\" tooltip=\"Email Address\" label=\"Email\" required=\"false\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"\">&lt;%=@answers['Req Email Address']%&gt;</parameter>\n                          <parameter id=\"phone\" tooltip=\"Telephone Number\" label=\"Phone Number\" required=\"false\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"\"/>\n                          <parameter id=\"summary\" tooltip=\"Summary\" label=\"Summary\" required=\"false\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"\">Person Update</parameter>\n                          <parameter id=\"description\" tooltip=\"Description\" label=\"Description\" required=\"false\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"\">Justification: &lt;%=@answers['Business justification']%&gt;</parameter>\n                        </parameters>\n                        <messages>\n                          <message type=\"Create\">Created IT Ticket #&lt;%=@results['Create IT Incident']['Entry Id']%&gt;</message>\n                          <message type=\"Update\">There has been an update to IT Ticket #&lt;%=@results['Create IT Incident']['Entry Id']%&gt;</message>\n                          <message type=\"Complete\">Completed IT Ticket #&lt;%=@results['Create IT Incident']['Entry Id']%&gt;</message>\n                        </messages>\n                        <dependents>\n                          <task type=\"Complete\" label=\"\" value=\"\">kinetic_submission_update_v1_3</task>\n                        </dependents>\n                      </task>\n                      <task name=\"Request Complete\" id=\"kinetic_submission_update_v1_3\" definition_id=\"kinetic_submission_update_v1\" x=\"320\" y=\"510\">\n                        <version>1</version>\n                        <configured>true</configured>\n                        <defers>false</defers>\n                        <deferrable>false</deferrable>\n                        <visible>false</visible>\n                        <parameters>\n                          <parameter id=\"ValidationStatus\" tooltip=\"Validation status for the original request: Completed or Rejected for example.\" label=\"Validation Status\" required=\"true\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"\">Completed</parameter>\n                          <parameter id=\"RequestStatus\" tooltip=\"Value for the 'Request Status' field\" label=\"Request Status\" required=\"true\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"Open,Closed\">Closed</parameter>\n                        </parameters>\n                        <messages>\n                          <message type=\"Create\"/>\n                          <message type=\"Update\"/>\n                          <message type=\"Complete\"/>\n                        </messages>\n                        <dependents/>\n                      </task>\n                      <task name=\"Mark Request In progress\" id=\"kinetic_submission_update_v1_2\" definition_id=\"kinetic_submission_update_v1\" x=\"50\" y=\"150\">\n                        <version>1</version>\n                        <configured>true</configured>\n                        <defers>false</defers>\n                        <deferrable>false</deferrable>\n                        <visible>false</visible>\n                        <parameters>\n                          <parameter id=\"ValidationStatus\" tooltip=\"Validation status for the original request: Completed or Rejected for example.\" label=\"Validation Status\" required=\"true\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"\">In progress</parameter>\n                          <parameter id=\"RequestStatus\" tooltip=\"Value for the 'Request Status' field\" label=\"Request Status\" required=\"true\" dependsOnId=\"\" dependsOnValue=\"\" menu=\"Open,Closed\">Open</parameter>\n                        </parameters>\n                        <messages>\n                          <message type=\"Create\"/>\n                          <message type=\"Update\"/>\n                          <message type=\"Complete\"/>\n                        </messages>\n                        <dependents/>\n                      </task>\n                      <task name=\"Start\" id=\"start\" definition_id=\"system_start_v1\" x=\"180\" y=\"10\">\n                        <version>1</version>\n                        <configured>true</configured>\n                        <defers>false</defers>\n                        <deferrable>false</deferrable>\n                        <visible>false</visible>\n                        <parameters/>\n                        <messages/>\n                        <dependents>\n                          <task type=\"Complete\" label=\"\" value=\"\">sithco_incident_create_deferred_v1_1</task>\n                          <task type=\"Complete\" label=\"\" value=\"\">kinetic_submission_update_v1_2</task>\n                        </dependents>\n                      </task>\n                    </request>\n                  </taskTree>",
    :description => "Kinetic Task Process Tree",
    :notes => "A new task process"
end
