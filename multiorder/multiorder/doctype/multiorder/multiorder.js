// Copyright (c) 2018, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on("MultiOrder Item", "multiorder_item_add", function(frm, cdt, cdn) {
	$.each(frm.doc.multiorder_item || [], function(i, d) {
		d.delivery_date = frm.doc.delivery_date;
	});
		refresh_field("multiorder_item");
});

frappe.ui.form.on("MultiOrder Item", "qty", function(frm, cdt, cdn){

	cur_frm.refresh();
	cur_frm.refresh_fields();
	var d = locals[cdt][cdn];
	frappe.model.set_value(d.doctype, d.name, "amount", (d.qty * d.rate));
		var multiorder_item = frm.doc.multiorder_item;
	  	var net_total = 0;
			for (var i in multiorder_item){
				net_total = net_total + multiorder_item[i].amount
				cur_frm.set_value("net_total",net_total.toFixed(2));
				cur_frm.set_value("grand_total",net_total.toFixed(2));
			}
});

frappe.ui.form.on("MultiOrder Item", "rate", function(frm, cdt, cdn){

	cur_frm.refresh();
	cur_frm.refresh_fields();
	var d = locals[cdt][cdn];
	frappe.model.set_value(d.doctype, d.name, "amount", (d.qty * d.rate));
		var multiorder_item = frm.doc.multiorder_item;
  		var net_total = 0;
			for (var i in multiorder_item){
				net_total = net_total + multiorder_item[i].amount
				cur_frm.set_value("net_total",net_total.toFixed(2));
				cur_frm.set_value("grand_total",net_total.toFixed(2));
			}
});

frappe.ui.form.on("MultiOrder Item", "multiorder_item_remove", function(frm, cdt, cdn){

	cur_frm.refresh();
	cur_frm.refresh_fields();
	var d = locals[cdt][cdn];
	var multiorder_item = frm.doc.multiorder_item;
  	var net_total = 0;
		for (var i in multiorder_item){
			net_total = net_total + multiorder_item[i].amount
			cur_frm.set_value("net_total",net_total.toFixed(2));
			cur_frm.set_value("grand_total",net_total.toFixed(2));
		}
});

frappe.ui.form.on("MultiOrder", {
   validate: function(frm) {
	if (frm.doc.delivery_date < frm.doc.date){
		frappe.msgprint("Please Select Delivery Date Greater Than Or Equal To Posting Date");
		frappe.validated = false;
	}
    },

    delivery_date: function(frm) {
	if (frm.doc.delivery_date < frm.doc.date){
		frappe.msgprint("Please Select Delivery Date Greater Than Or Equal To Posting Date");
	}
    },

   additional_discount_percentage: function(frm) {
	if (frm.doc.apply_discount_on == "Net Total"){
		cur_frm.set_value("grand_total",frm.doc.net_total);
			var additional_discount_amount = (frm.doc.additional_discount_percentage / 100) * frm.doc.net_total;
			var grand_total = frm.doc.net_total - additional_discount_amount;
				cur_frm.set_value("additional_discount_amount",additional_discount_amount.toFixed(2));
				cur_frm.set_value("grand_total",grand_total.toFixed(2));
			}
	else if (frm.doc.apply_discount_on == "Grand Total"){
		cur_frm.set_value("grand_total",frm.doc.net_total);
			var additional_discount_amount = (frm.doc.additional_discount_percentage / 100) * frm.doc.grand_total;
			var grand_total = frm.doc.net_total - additional_discount_amount;
				cur_frm.set_value("additional_discount_amount",additional_discount_amount.toFixed(2));
				cur_frm.set_value("grand_total",grand_total.toFixed(2));	
			}
    },

   apply_discount_on: function(frm) {
	if (frm.doc.apply_discount_on == "Net Total"){
		cur_frm.set_value("grand_total",frm.doc.net_total);
			var additional_discount_amount = (frm.doc.additional_discount_percentage / 100) * frm.doc.net_total;
			var grand_total = frm.doc.net_total - additional_discount_amount;
				cur_frm.set_value("additional_discount_amount",additional_discount_amount.toFixed(2));
				cur_frm.set_value("grand_total",grand_total.toFixed(2));
			}
	if (frm.doc.apply_discount_on == "Grand Total"){
		cur_frm.set_value("grand_total",frm.doc.net_total);
			var additional_discount_amount = (frm.doc.additional_discount_percentage / 100) * frm.doc.net_total;
			var grand_total = frm.doc.net_total - additional_discount_amount;
				cur_frm.set_value("additional_discount_amount",additional_discount_amount.toFixed(2));
				cur_frm.set_value("grand_total",grand_total.toFixed(2));
			}
    }
});
