// Copyright (c) 2023, hidayatali and contributors
// For license information, please see license.txt

frappe.ui.form.on('Lead', {
	onload_post_render: function(frm) {
	    frm.set_df_property('naming_series', "hidden", 1);
	    frm.set_df_property('middle_name', "hidden", 1);
	    frm.set_df_property('last_name', "hidden", 1);
	    
	    //Hidden Contact Info
        frm.set_df_property('email_id', "hidden", 1);
        frm.set_df_property('website', "hidden", 1);
        frm.set_df_property('mobile_no', "hidden", 1);
        frm.set_df_property('whatsapp_no', "hidden", 1);
        frm.set_df_property('phone', "hidden", 1);
        frm.set_df_property('phone_ext', "hidden", 1);
        
        //Hidden Organization Info
        frm.set_df_property('company_name', "hidden", 1);
        frm.set_df_property('no_of_employees', "hidden", 1);
        frm.set_df_property('annual_revenue', "hidden", 1);
        frm.set_df_property('industry', "hidden", 1);
        frm.set_df_property('market_segment', "hidden", 1);
        frm.set_df_property('territory', "hidden", 1);
        frm.set_df_property('fax', "hidden", 1);
    }
});

frappe.ui.form.on('Lead', {
	refresh(frm) {
		refresh_location(frm);
	}
});

frappe.ui.form.on("Lead", "province", function(frm) {
cur_frm.fields_dict['citys'].get_query = function(doc) {	return {filters: {"province": cur_frm.doc.province?cur_frm.doc.province:"N/A"}}}
    cur_frm.refresh_field('citys');
    
});
frappe.ui.form.on("Lead", "citys", function(frm) {
cur_frm.fields_dict['areas'].get_query = function(doc) {	return {filters: {"parent_city": cur_frm.doc.citys?cur_frm.doc.citys:"N/A"}}}
    cur_frm.refresh_field('areas');
});
frappe.ui.form.on("Lead", "areas", function(frm) {
cur_frm.fields_dict['sub_area'].get_query = function(doc) {	return {filters: {"parent_area": cur_frm.doc.areas?cur_frm.doc.areas:"N/A"}}}
    cur_frm.refresh_field('sub_area');
});

function refresh_location(frm){
    cur_frm.fields_dict['citys'].get_query = function(doc) {	return {filters: {"province": cur_frm.doc.province?cur_frm.doc.province:"N/A"}}}
    cur_frm.fields_dict['areas'].get_query = function(doc) {	return {filters: {"parent_city": cur_frm.doc.citys?cur_frm.doc.citys:"N/A"}}}
    cur_frm.fields_dict['sub_area'].get_query = function(doc) {	return {filters: {"parent_area": cur_frm.doc.areas?cur_frm.doc.areas:"N/A"}}}
    cur_frm.refresh_field('citys');
    cur_frm.refresh_field('areas');
    cur_frm.refresh_field('sub_area');
}

