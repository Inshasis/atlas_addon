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


frappe.ui.form.on('Payment Entry', {
  setup: function(frm, cdt, cdn){
  frm.set_df_property('sales_invoice', "hidden", 1);
  var d = cur_frm.doc.references;
  if(d[0].reference_doctype == "Sales Invoice"){
      console.log(d[0].reference_name);    
      frm.set_value("sales_invoice",d[0].reference_name);
  }
  }
});


frappe.ui.form.on('Payment Entry', {
onload: function(frm){
  if(frm.is_new() && cur_frm.doc.sales_invoice){
  frappe.call({
  method: 'atlas_addon.atlas_addon.doctype.payment_entry.payment_entry.si_payment_terms_fetch',
  args: {sales_invoice: cur_frm.doc.sales_invoice}
  }).done((r) => {
      console.log(r);
      cur_frm.clear_table("references");
      $.each(r.message, function(_i, e){
      let entry = frm.add_child("references");
      entry.reference_doctype = "Sales Invoice";
      entry.reference_name = cur_frm.doc.sales_invoice;
      entry.due_date = e.due_date;
      entry.payment_term = e.payment_term;
      entry.allocated_amount = e.payment_amount;
      });
      refresh_field("references");

  });
  }
  }
});
