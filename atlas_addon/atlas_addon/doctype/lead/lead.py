# Copyright (c) 2023, InshaSiS Technologies and contributors
# For license information, please see license.txt

import frappe

def after_insert(doc,method):
	auto_create_address(doc)

def auto_create_address(doc):
	if doc.custom_address_line:
		add = frappe.get_doc({
			"doctype": "Address",
			"address_title": doc.name,
			"city": doc.citys,
			"state": doc.province,
			"address_line2": doc.areas,
			"address_line1": doc.custom_address_line,
			"custom_google_map_link": doc.google_map_link,
			"custom_full_address": doc.full_address
		})
		add.append("links", {
			'link_doctype': 'Lead',
			'link_name': doc.name,
			'link_title': doc.name,
		})
		add.save()

	# else:
	# 	add = frappe.get_doc({
	# 		"doctype": "Address",
	# 		"address_title": doc.name,
	# 		"city": doc.citys,
	# 		"state": doc.province,
	# 		"address_line2": doc.areas,
	# 		"address_line1": doc.plate_no
	# 	})
	# 	add.append("links", {
	# 		'link_doctype': 'Lead',
	# 		'link_name': doc.name,
	# 		'link_title': doc.name,
	# 	})
	# 	add.save()
