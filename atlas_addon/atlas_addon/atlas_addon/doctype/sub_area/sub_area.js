// Copyright (c) 2023, hidayatali and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sub Area', {
	refresh(frm) {
		refresh_location(frm);
	}
})
frappe.ui.form.on("Sub Area", "parent_province", function(frm) {
cur_frm.fields_dict['parent_city'].get_query = function(doc) {	return {filters: {"province": cur_frm.doc.parent_province?cur_frm.doc.parent_province:"N/A"}}}
    cur_frm.refresh_field('parent_city');
});
frappe.ui.form.on("Sub Area", "parent_city", function(frm) {
cur_frm.fields_dict['parent_area'].get_query = function(doc) {	return {filters: {"parent_city": cur_frm.doc.parent_city?cur_frm.doc.parent_city:"N/A"}}}
    cur_frm.refresh_field('parent_area');
});

function refresh_location(frm){
    cur_frm.fields_dict['parent_city'].get_query = function(doc) {	return {filters: {"province": cur_frm.doc.parent_province?cur_frm.doc.parent_province:"N/A"}}}
    cur_frm.refresh_field('parent_city');
    cur_frm.fields_dict['parent_area'].get_query = function(doc) {	return {filters: {"parent_city": cur_frm.doc.parent_city?cur_frm.doc.parent_city:"N/A"}}}
    cur_frm.refresh_field('parent_area');
}
