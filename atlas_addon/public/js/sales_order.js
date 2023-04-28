// Copyright (c) 2023, hidayatali and contributors
// For license information, please see license.txt

//Invoice Templete Select After Auto Insert Data In Child table
frappe.ui.form.on('Sales Order', {
	invoice_template(frm) {
	    if(cur_frm.doc.invoice_template){
		frappe.call({
            method: 'atlas_addon.atlas_addon.doctype.sales_order.sales_order.fetch_data',
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
frappe.ui.form.on('Sales Order', {
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
frappe.ui.form.on('Sales Order', {
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