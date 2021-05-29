package com.provitamex.website.model;

import java.util.List;

public class InvoiceList {
	private List<Invoice> value;
	private String count;
	public List<Invoice> getValue() {
		return value;
	}
	public void setValue(List<Invoice> value) {
		this.value = value;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	
}
