from . import __version__ as app_version

app_name = "atlas_addon"
app_title = "Atlas Addon"
app_publisher = "hidayatali"
app_description = "Atlas Addon"
app_email = "hidayatmanusiya1@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/atlas_addon/css/atlas_addon.css"
# app_include_js = "/assets/atlas_addon/js/atlas_addon.js"

# include js, css files in header of web template
# web_include_css = "/assets/atlas_addon/css/atlas_addon.css"
# web_include_js = "/assets/atlas_addon/js/atlas_addon.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "atlas_addon/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
    "Lead" : "public/js/lead.js",
    "Quotation":"public/js/quotation.js",
    "Project":"public/js/project.js",
    "Sales Invoice":"public/js/sales_invoice.js",
    "Sales Order":"public/js/sales_order.js",
    "Payment Entry":"public/js/payment_entry.js",
    "Address":"public/js/address.js",
    "Customer":"public/js/customer.js",
    }
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "atlas_addon.utils.jinja_methods",
#	"filters": "atlas_addon.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "atlas_addon.install.before_install"
# after_install = "atlas_addon.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "atlas_addon.uninstall.before_uninstall"
# after_uninstall = "atlas_addon.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "atlas_addon.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"Lead": {
		"after_insert": "atlas_addon.atlas_addon.doctype.lead.lead.after_insert",
	},
    "Customer": {
		"after_insert": "atlas_addon.atlas_addon.doctype.customer.customer.after_insert",
	},
    "Payment Entry": {
		"on_submit": "atlas_addon.atlas_addon.doctype.payment_entry.payment_entry.on_submit",
	}
  #   "Sales Order": {
	# 	"validate": "atlas_addon.atlas_addon.doctype.sales_order.sales_order.validate",
	# }
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"atlas_addon.tasks.all"
#	],
#	"daily": [
#		"atlas_addon.tasks.daily"
#	],
#	"hourly": [
#		"atlas_addon.tasks.hourly"
#	],
#	"weekly": [
#		"atlas_addon.tasks.weekly"
#	],
#	"monthly": [
#		"atlas_addon.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "atlas_addon.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "atlas_addon.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "atlas_addon.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]


# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"atlas_addon.auth.validate"
# ]
