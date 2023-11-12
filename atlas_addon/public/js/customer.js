// Copyright (c) 2023, hidayatali and contributors
// For license information, please see license.txt

frappe.ui.form.on('Customer', {
	validate(frm) {
		if(cur_frm.doc.lead_name){
		    frappe.db.get_list('Lead',{ 
            fields:['google_map_link'], 
            filters:{ 
                'name':frm.doc.lead_name 
            } 
            }).then(function(doc){ 
                // console.log(doc); 
                cur_frm.set_value("custom_google_map_link",doc[0].google_map_link); 
            });
    		    
    		}
	},
	custom_open_with_google_map(frm) {
		window.open(cur_frm.doc.custom_google_map_link);
	}
});
