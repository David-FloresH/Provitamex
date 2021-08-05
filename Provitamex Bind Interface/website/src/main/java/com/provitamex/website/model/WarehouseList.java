package com.provitamex.website.model;

import java.util.List;

public class WarehouseList {
	private List<Warehouse> value;

	public List<Warehouse> getValue() {
		return value;
	}

	public void setValue(List<Warehouse> value) {
		this.value = value;
	}

	public void printAll() {
		for(Warehouse w : value) {
			System.out.println(w);
		}
	}
	@Override
	public String toString() {
		return "Entity [value=" + value + "]";
	}
	
}
