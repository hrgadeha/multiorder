# -*- coding: utf-8 -*-
# Copyright (c) 2018, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint
from frappe.model.document import Document
from frappe.utils import money_in_words

class MultiOrder(Document):
	def on_submit(doc):
		doc.in_words = money_in_words(doc.grand_total)
		for c in doc.multiorder_customer:
			items = []
			for d in doc.multiorder_item:
				item_li = {"item_code": d.item_code,"qty": d.qty,"rate": d.rate,"warehouse":d.warehouse}
				items.append(item_li)
			sales_order = frappe.get_doc({
			"doctype": "Sales Order", 
			"customer": c.customer, 
			"delivery_date": "2018-09-23",
			"apply_discount_on":doc.apply_discount_on,
			"additional_discount_percentage":doc.additional_discount_percentage,
			"total":doc.net_total,
			"tc_name":doc.terms,
			"items": items
			})
			sales_order.insert(ignore_permissions=True)
			sales_order.submit()
