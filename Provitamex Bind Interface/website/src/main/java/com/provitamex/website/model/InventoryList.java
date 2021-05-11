package com.provitamex.website.model;

import java.util.List;

public class InventoryList {
	private List<Inventory> value;

	public List<Inventory> getValue() {
		return value;
	}

	public void setValue(List<Inventory> value) {
		this.value = value;
	}
	
	public void printAll() {
		for(Inventory w : value) {
			System.out.println(w);
		}
	}
}
