require File.join(File.dirname(__FILE__),"../config.rb")

service_item "Catalog Portal" do
  catalog CATALOG_NAME
  categories ""
  type "Portal"
  description "Includes login, searching by template name, \"My Requests\" and \"box\" categorization."
  display_page CATALOG_PAGE
  display_name "#{DISPLAY_NAME_FOR_URL}_Catalog"
  web_server WEB_SERVER
  authentication :template, :template_name => "Catalog Login"
  form_type :launcher
  attachment :file_name => "CatalogPortal/background_large_1.png",
    :type => :image,
    :description => "acmeBackground"
  page "Service Catalog Display",
    :confirmation,
    :vertical_buttons,
    :submit_button_value => "Submit" do
    text "Catalog Portal", "\n\n"
  end
end
