# Copyright (c) 2023, hidayatali and contributors
# For license information, please see license.txt

import frappe

def on_submit(doc,method):
	update_payment_term(doc)

def update_payment_term(doc):
	per = frappe.get_doc('Payment Entry Reference',{"parent": doc.name})
	si = str(per.reference_name)
	pay_term = str(per.payment_term)
	
	# mode_of_payment = frappe.db.sql(f""" select pe.mode_of_payment,pe.reference_no,per.payment_term from `tabPayment Entry` pe left join `tabPayment Entry Reference` per on per.parent=pe.name where per.reference_doctype="Sales Invoice" AND per.reference_name='{si}' AND payment_term='{pay_term}'""",as_dict=1)

	mode_of_payment = frappe.db.sql(f""" select pe.mode_of_payment from `tabPayment Entry` pe left join `tabPayment Entry Reference` per on per.parent=pe.name where per.reference_doctype="Sales Invoice" AND per.reference_name='{si}' AND payment_term='{pay_term}'""",as_dict=1)
	mode_of_payment = str(mode_of_payment)
	mode_of_payment = mode_of_payment.replace("[", "")
	mode_of_payment = mode_of_payment.replace("]", "")
	mode_of_payment = mode_of_payment.replace("{", "")
	mode_of_payment = mode_of_payment.replace("}", "")
	mode_of_payment = mode_of_payment.replace("'", "")
	mode_of_payment = mode_of_payment.replace("mode_of_payment:", "")

	reference_no = frappe.db.sql(f""" select pe.reference_no from `tabPayment Entry` pe left join `tabPayment Entry Reference` per on per.parent=pe.name where per.reference_doctype="Sales Invoice" AND per.reference_name='{si}' AND payment_term='{pay_term}'""",as_dict=1)
	reference_no = str(reference_no)
	reference_no = reference_no.replace("[", "")
	reference_no = reference_no.replace("]", "")
	reference_no = reference_no.replace("{", "")
	reference_no = reference_no.replace("}", "")
	reference_no = reference_no.replace("'", "")
	reference_no = reference_no.replace("reference_no:", "")


	if doc.mode_of_payment == "Cash":
		frappe.db.sql("""UPDATE `tabPayment Schedule` ps SET ps.mode_of_payment='%s',ps.cheque_no = 'NULL' WHERE ps.parent='%s' AND ps.payment_term='%s'"""%(doc.mode_of_payment,si,pay_term), as_list=1)
		frappe.db.commit()
		
	else:
		frappe.db.sql("""UPDATE `tabPayment Schedule` ps SET ps.mode_of_payment='%s',ps.cheque_no = '%s' WHERE ps.parent='%s' AND ps.payment_term='%s'"""%(doc.mode_of_payment,reference_no,si,pay_term), as_list=1)
		frappe.db.commit()

@frappe.whitelist() 
def si_payment_terms_fetch(sales_invoice):
	si_pay_terms = frappe.db.sql(f""" select payment_term,description,due_date,invoice_portion,payment_amount from `tabPayment Schedule` where parenttype='Sales Invoice' AND parent='{sales_invoice}' Order By idx ASC;""",as_dict=1)
	return si_pay_terms