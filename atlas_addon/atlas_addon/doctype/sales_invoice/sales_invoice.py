# Copyright (c) 2023, hidayatali and contributors
# For license information, please see license.txt

import frappe

@frappe.whitelist() 
def fetch_data(invoice_template):
	items = frappe.db.sql(f""" select itt.item_group from `tabInvoice Template` it left join `tabInvoice Template Table` itt on itt.parent=it.name where it.name='{invoice_template}' ORDER BY itt.idx ASC;""",as_dict=1)
	return items

@frappe.whitelist() 
def so_payment_terms_fetch(sales_order):
	so_pay_terms = frappe.db.sql(f""" select payment_term,description,due_date,invoice_portion,payment_amount from `tabPayment Schedule` where parenttype='Sales Order' AND parent='{sales_order}' Order By idx ASC;""",as_dict=1)
	return so_pay_terms

