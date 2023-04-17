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