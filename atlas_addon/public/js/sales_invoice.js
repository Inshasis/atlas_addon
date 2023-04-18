// Copyright (c) 2023, hidayatali and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Invoice', {
	setup(frm) {
        if(cur_frm.doc.invoice_template){
           cur_frm.set_value("naming_series",".{abbr}./.MM.-.YY./.{customer}./.L.-.####");
        }		
	}
});

frappe.ui.form.on('Sales Invoice', {
	invoice_template(frm) {
        if(cur_frm.doc.invoice_template){
          cur_frm.set_value("naming_series",".{abbr}./.MM.-.YY./.{customer}./.L.-.####");
        }
        else{
            cur_frm.set_value("naming_series",".{abbr}./.MM.-.YY./.{customer}./.SINV.-.####");
        }
	}
});