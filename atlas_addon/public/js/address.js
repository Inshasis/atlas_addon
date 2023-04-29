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
frappe.ui.form.on("Address", "areas", function(frm) {
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


//Province
frappe.ui.form.on('Address', {
	province(frm) {
		cur_frm.set_value("state",cur_frm.doc.province);
        cur_frm.refresh_field("state");
	}
});

//City
frappe.ui.form.on('Address', {
	citys(frm) {
		cur_frm.set_value("city",cur_frm.doc.citys);
        cur_frm.refresh_field("city");
	}
});

//Areas
frappe.ui.form.on('Address', {
	areas(frm) {
		cur_frm.set_value("address_line2",cur_frm.doc.areas);
        cur_frm.refresh_field("address_line2");
	}
});

//Sub Area
frappe.ui.form.on('Address', {
	sub_area(frm) {
		cur_frm.set_value("address_line1",cur_frm.doc.sub_area);
        cur_frm.refresh_field("address_line1");
	}
});


//Plate No
frappe.ui.form.on('Address', {
	plate_no(frm) {
		cur_frm.set_value("address_line1",cur_frm.doc.plate_no+" - "+cur_frm.doc.sub_area);
        cur_frm.refresh_field("address_line1");
	}
});