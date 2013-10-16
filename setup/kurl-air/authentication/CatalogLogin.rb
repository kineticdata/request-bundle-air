require File.join(File.dirname(__FILE__),"../config.rb")

service_item "Catalog Login" do
  catalog CATALOG_NAME
  categories ""
  type "Launcher"
  description "Includes login, searching by template name, \"My Requests\" and \"box\" categorization."
  display_page LOGIN_PAGE
  web_server WEB_SERVER
  form_type :launcher
  page "Service Catalog Display",
    :confirmation,
    :vertical_buttons,
    :submit_button_value => "Submit" do
    text "Blank", "Blank"
  end
end
