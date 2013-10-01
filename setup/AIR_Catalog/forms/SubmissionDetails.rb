require File.join(File.dirname(__FILE__),"../config.rb")

service_item "Submission Details" do
  catalog CATALOG_NAME
  categories ""
  type "Portal"
  description "Time Line"
  display_page SUBMISSION_DETAILS_PAGE
  display_name "#{DISPLAY_NAME_FOR_URL}_SubmissionDetails"
  web_server WEB_SERVER
  authentication :template, :template_name => "Catalog Login"
  form_type :launcher
  page "Initial Page",
    :contents,
    :horizontal_buttons,
    :submit_button_value => "Submit" do
  end
end
