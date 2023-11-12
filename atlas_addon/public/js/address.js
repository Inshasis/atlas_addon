// Copyright (c) 2023, hidayatali and contributors
// For license information, please see license.txt

frappe.ui.form.on('Address', {
	refresh(frm) {
		refresh_location(frm);
	}
});

frappe.ui.form.on("Address", "province", function(frm) {
cur_frm.fields_dict['citys'].get_query = function(doc) {	return {filters: {"province": cur_frm.doc.province?cur_frm.doc.province:"N/A"}}}
    cur_frm.refresh_field('citys');
    
});
frappe.ui.form.on("Address", "citys", function(frm) {
cur_frm.fields_dict['areas'].get_query = function(doc) {	return {filters: {"parent_city": cur_frm.doc.citys?cur_frm.doc.citys:"N/A"}}}
    cur_frm.refresh_field('areas');
});

function refresh_location(frm){
    cur_frm.fields_dict['citys'].get_query = function(doc) {	return {filters: {"province": cur_frm.doc.province?cur_frm.doc.province:"N/A"}}}
    cur_frm.fields_dict['areas'].get_query = function(doc) {	return {filters: {"parent_city": cur_frm.doc.citys?cur_frm.doc.citys:"N/A"}}}
    cur_frm.refresh_field('citys');
    cur_frm.refresh_field('areas');
    cur_frm.refresh_field('custom_address_line');
}

frappe.ui.form.on('Address', {
	validate(frm) {
        if(cur_frm.doc.province && cur_frm.doc.citys && cur_frm.doc.areas && cur_frm.doc.custom_address_line){
            cur_frm.set_value("custom_full_address",
            cur_frm.doc.address_line1+', '
            +cur_frm.doc.address_line2+', '
            +cur_frm.doc.city+', '
            +cur_frm.doc.state
            );
            cur_frm.refresh_field('custom_full_address');
        }
		else{
			cur_frm.set_value("custom_full_address",
            cur_frm.doc.address_line1+', '
            +cur_frm.doc.address_line2+', '
            +cur_frm.doc.city+', '
            +cur_frm.doc.state
            );
            cur_frm.refresh_field('custom_full_address');
		}
    },
	//Province
	province(frm) {
		cur_frm.set_value("state",cur_frm.doc.province);
        cur_frm.refresh_field("state");
	},
	//City
	citys(frm) {
		cur_frm.set_value("city",cur_frm.doc.citys);
		cur_frm.refresh_field("city");
	},
	//Areas
	areas(frm) {
		cur_frm.set_value("address_line2",cur_frm.doc.areas);
        cur_frm.refresh_field("address_line2");
	},
	//Custom Address Line
	custom_address_line(frm) {
		cur_frm.set_value("address_line1",cur_frm.doc.custom_address_line);
        cur_frm.refresh_field("address_line1");
	},
});

frappe.ui.form.on('Address', {
	onload(frm) {
    	if(cur_frm.doc.custom_google_map_link){
    	    frm.set_df_property('custom_open_with_google_map', "hidden", 0);
    	}
    	else{
    	    frm.set_df_property('custom_open_with_google_map', "hidden", 1);
    	}
    },
    custom_google_map_link(frm) {
	    if(cur_frm.doc.custom_google_map_link){
    	    frm.set_df_property('custom_open_with_google_map', "hidden", 0);
    	}
    	else{
    	    frm.set_df_property('custom_open_with_google_map', "hidden", 1);
    	}
	}
});

frappe.ui.form.on("Address", "custom_open_with_google_map", function(frm) {
    var myWin = window.open(cur_frm.doc.custom_google_map_link);
});