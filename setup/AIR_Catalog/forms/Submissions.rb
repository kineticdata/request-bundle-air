require File.join(File.dirname(__FILE__),"../config.rb")

service_item "Submissions" do
  catalog CATALOG_NAME
  categories ""
  type "Portal"
  description "Submissions"
  display_page SUBMISSIONS_PAGE
  display_name "#{DISPLAY_NAME_FOR_URL}_Submissions"
  web_server WEB_SERVER
  authentication :template, :template_name => "Catalog Login"
  form_type :launcher
  page "Initial Page",
    :contents,
    :horizontal_buttons,
    :submit_button_value => "Submit" do
  end
end
