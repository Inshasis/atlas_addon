# Copyright (c) 2023, hidayatali and contributors
# For license information, please see license.txt

import frappe

@frappe.whitelist() 
def fetch_address(customer):
	address = frappe.db.sql("select parent from `tabDynamic Link` where link_doctype = 'Customer' AND parenttype='Address' AND link_name=%s",customer)
	return address
