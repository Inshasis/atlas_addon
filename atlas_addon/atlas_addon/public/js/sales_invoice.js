// Copyright (c) 2023, hidayatali and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Invoice', {
	setup(frm) {
        if(cur_frm.doc.invoice_template){
           cur_frm.set_value("naming_series",".{abbr}./.{customer}./.MM.-.YY./.L.-.####");
        }		
	}
});

frappe.ui.form.on('Sales Invoice', {
	invoice_template(frm) {
        if(cur_frm.doc.invoice_template){
          cur_frm.set_value("naming_series",".{abbr}./.{customer}./.MM.-.YY./.L.-.####");
        }
        else{
            cur_frm.set_value("naming_series",".{abbr}./.{customer}./.MM.-.YY./.SINV.-.####");
        }
	}
});


//Invoice Templete Select After Auto Insert Data In Child table
frappe.ui.form.on('Sales Invoice', {
	invoice_template(frm) {
	    if(cur_frm.doc.invoice_template){
		frappe.call({
            method: 'atlas_addon.atlas_addon.doctype.sales_invoice.sales_invoice.fetch_data',
            args: {
                invoice_template: cur_frm.doc.invoice_template,
            },
            callback: function (r) {
                console.log(r.message);
                cur_frm.clear_table("items");
                $.each(r.message, function(_i, e){
                let entry = frm.add_child("items");
                entry.item_group = e.item_group;
                });
                refresh_field("items");
            }
        });
	    }
	    else{
	        cur_frm.clear_table("items");
            cur_frm.refresh_fields("items");
	    }
	}
});

//Item Group Wise Item Code Fetch
frappe.ui.form.on('Sales Invoice', {
    invoice_template: function (frm, cdt, cdn) {
            cur_frm.set_query("item_code", "items", function (doc, cdt, cdn) {
                var d = locals[cdt][cdn];
                return {
                    filters: [
                        ['Item', 'item_group', 'in', d.item_group]
                    ]
                };
            });
    }
});

//Bank Account Filter
frappe.ui.form.on('Sales Invoice', {
        party_type: function (frm) {
            cur_frm.set_query("party", function (doc) {
                return {
                    filters: [
                        ['Bank Account', 'party_type', 'in', cur_frm.doc.party_type]
                    ]
                };
            });
        }
});

//Payment Terms 
frappe.ui.form.on('Sales Invoice', {
    setup: function(frm, cdt, cdn){
    frm.set_df_property('sales_order', "hidden", 1);
    var d = cur_frm.doc.items;
    console.log(d[0].sales_order);
    frm.set_value("sales_order",d[0].sales_order);
    }
});


frappe.ui.form.on('Sales Invoice', {
  onload: function(frm){
    if(frm.is_new() && cur_frm.doc.sales_order){
    frappe.call({
    method: 'atlas_addon.atlas_addon.doctype.sales_invoice.sales_invoice.so_payment_terms_fetch',
    args: {sales_order: cur_frm.doc.sales_order}
    }).done((r) => {
        console.log(r);
        $.each(r.message, function(_i, e){
        let entry = frm.add_child("payment_schedule");
        entry.payment_term = e.payment_term;
        entry.description = e.description;
        entry.due_date = e.due_date;
        entry.invoice_portion = e.invoice_portion;
        entry.payment_amount = e.payment_amount;
        
        });
        refresh_field("payment_schedule");

    });
    }
    }
});

