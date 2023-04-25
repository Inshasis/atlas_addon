# Copyright (c) 2023, hidayatali and contributors
# For license information, please see license.txt

import frappe

def after_insert(doc,method):
	auto_create_address(doc)

def auto_create_address(doc):
	add = frappe.get_doc({
		"doctype": "Address",
		"address_title": doc.name,
		"city": doc.citys,
		"state": doc.province,
		"address_line2": doc.areas,
		"address_line1": doc.plate_no+"-"+doc.sub_area
	})
	add.append("links", {
		'link_doctype': 'Lead',
		'link_name': doc.name,
		'link_title': doc.name,
	})

	add.save()
	
