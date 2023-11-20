// Copyright (c) 2023, hidayatali and contributors
// For license information, please see license.txt

frappe.ui.form.on('Area', {
	refresh(frm) {
		refresh_location(frm);
	}
})
frappe.ui.form.on("Area", "parent_province", function(frm) {
cur_frm.fields_dict['parent_city'].get_query = function(doc) {	return {filters: {"province": cur_frm.doc.parent_province?cur_frm.doc.parent_province:"N/A"}}}
    cur_frm.refresh_field('parent_city');
});

function refresh_location(frm){
    cur_frm.fields_dict['parent_city'].get_query = function(doc) {	return {filters: {"province": cur_frm.doc.parent_province?cur_frm.doc.parent_province:"N/A"}}}
    cur_frm.refresh_field('parent_city');
}
