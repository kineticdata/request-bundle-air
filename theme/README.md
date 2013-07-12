# Request Bundle Air Documentation

## Overview
This project represents an out of the box Bundle solution for Request. It currently contains three packages, base, catalog and submissions.  Each package contains mobile and desktop display pages and resource files.  A helper file has been implemented to facilitate the routing between the mobile and desktop views with the option for the client to choose which view they want presented in their web browser.  See common/framework/helpers for more information on the MobileDetectionHelper.

## Theming and Branding Information
The Common directory contains the html resources that represent the theming for this Bundle.  Inside common/resources/css you will find a commonDesktop.css and CommonMobile.css.  These style sheets contain a listing of classes used throughout the Bundle's packages.  In addition to this, the very top of these style sheets contain the classes that deal with the color configuration for the Bundle.  Keeping the color configuration for a Bundle inside the common directory allows for easy implementation of theming without editing the style sheets for each of the packages.

## Packages Information

### Base
Contains the display pages that deal with the submittable Request service items. It contains the display and review pages.

### Catalog
Contains the display pages that deal specifically with navigating and searching the Request catalog for submittable Request service items.

### Submissions
Contains the display page that deals specifically with viewing requests that are open, closed, pending (needing approvals), completed (approval completed) and parked (unfinished request items).  In addition to this, there is a diplay page for viewing the submission details (timeline).

## Implementing the Portal

### Configuration - The Bundle
Every Bundle has a common configuration file.  This file is stored inside common/config/config.jspf.  In order to get the Bundle to communicate with Request, you must setup the configuration to point to the catalog you have created inside Request using the bundle.setProperty method.  An example of this is already provided at the top of the common/config/config.jspf file.

~~~~
bundle.setProperty("catalogName", "Air");
~~~~

### Portal Page Configuration - Request
Each package contains the display pages, which handle the routing for the mobile and desktop views.  For example, the catalog package has a catalog.jsp and search.jsp display page.  In order to start using these packages and their portal pages with Request, you must create a service item with the type "Portal". This service item must point to the display page you want to serve up in your web browser. Using the advance tab, the "Display Page (JSP)" field is where you supply the file path of the display page you want to use.  For example, the file path would look like this: /themes/bundle-request-air/packages/catalog/catalog.jsp with "bundle-request-air" being the name of the Bundle.  You can rename "bundle-request-air" to whatever you want.

If this service item is meant to be a submittable Request item, you will point the service item to the base package display page: /themes/bundle-request-air/packages/base/display.jsp.  It's recommended that this kind of service item should not be labeled with the type "portal" because it's not meant to be a portal.