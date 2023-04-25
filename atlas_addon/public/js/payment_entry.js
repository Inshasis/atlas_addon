// Copyright (c) 2023, hidayatali and contributors
// For license information, please see license.txt

frappe.ui.form.on('Payment Entry', {
	payment_type(frm) {
        if(cur_frm.doc.payment_type == "Pay"){
          cur_frm.set_value("naming_series",".{abbr}./.{party}./.MM.-.YY./.PAY.-.#####");
        }
        else if(cur_frm.doc.payment_type == "Receive"){
            cur_frm.set_value("naming_series",".{abbr}./.{party}./.MM.-.YY./.REC.-.#####");
        }
	}
});