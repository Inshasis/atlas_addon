// Copyright (c) 2023, hidayatali and contributors
// For license information, please see license.txt

frappe.ui.form.on('Project', {
	refresh(frm) {
		refresh_location(frm);
	}
});

frappe.ui.form.on("Project", "province", function(frm) {
cur_frm.fields_dict['city'].get_query = function(doc) {	return {filters: {"province": cur_frm.doc.province?cur_frm.doc.province:"N/A"}}}
    cur_frm.refresh_field('city');
    
});
frappe.ui.form.on("Project", "city", function(frm) {
cur_frm.fields_dict['area'].get_query = function(doc) {	return {filters: {"parent_city": cur_frm.doc.city?cur_frm.doc.city:"N/A"}}}
    cur_frm.refresh_field('area');
});
frappe.ui.form.on("Project", "area", function(frm) {
cur_frm.fields_dict['sub_area'].get_query = function(doc) {	return {filters: {"parent_area": cur_frm.doc.area?cur_frm.doc.area:"N/A"}}}
    cur_frm.refresh_field('sub_area');
});

function refresh_location(frm){
    cur_frm.fields_dict['city'].get_query = function(doc) {	return {filters: {"province": cur_frm.doc.province?cur_frm.doc.province:"N/A"}}}
    cur_frm.fields_dict['area'].get_query = function(doc) {	return {filters: {"parent_city": cur_frm.doc.city?cur_frm.doc.city:"N/A"}}}
    cur_frm.fields_dict['sub_area'].get_query = function(doc) {	return {filters: {"parent_area": cur_frm.doc.area?cur_frm.doc.area:"N/A"}}}
    cur_frm.refresh_field('city');
    cur_frm.refresh_field('area');
    cur_frm.refresh_field('sub_area');
}
frappe.ui.form.on("Project", {
    plate_no(frm) {
    if(cur_frm.doc.province && cur_frm.doc.city && cur_frm.doc.area){
        cur_frm.set_value("full_address",
        cur_frm.doc.province+', '
        +cur_frm.doc.city+', '
        +cur_frm.doc.area+', '
        +cur_frm.doc.sub_area+', '
        +cur_frm.doc.plate_no
        );
        cur_frm.refresh_field('full_address');
        }
    }
    
});


frappe.ui.form.on("Project", "open_with_google_map", function(frm) {
    var myWin = window.open(cur_frm.doc.google_map_link);
});

frappe.ui.form.on('Project', {
	onload(frm) {
    	if(cur_frm.doc.google_map_link){
    	    frm.set_df_property('open_with_google_map', "hidden", 0);
    	}
    	else{
    	    frm.set_df_property('open_with_google_map', "hidden", 1);
    	}
    },
    google_map_link(frm) {
	    if(cur_frm.doc.google_map_link){
    	    frm.set_df_property('open_with_google_map', "hidden", 0);
    	}
    	else{
    	    frm.set_df_property('open_with_google_map', "hidden", 1);
    	}
	}
});