# Copyright (c) 2023, hidayatali and contributors
# For license information, please see license.txt

import frappe

def after_insert(doc,method):
	address_find_auto_set(doc)

def address_find_auto_set(doc):
	if doc.lead_name:
		add = frappe.get_doc('Address',{"address_title": doc.lead_name})
		add_name = str(add.name)
		if add_name:
			add_on_entry_child = add.append('links',{})
			add_on_entry_child.link_doctype = "Customer"
			add_on_entry_child.link_name = doc.name
			add_on_entry_child.link_title = doc.name
			add.save()
