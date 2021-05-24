package com.provitamex.website.model;

import java.util.List;

public class ProductList {
	private List<Product2> value;

	public List<Product2> getValue() {
		return value;
	}

	public void setValue(List<Product2> value) {
		this.value = value;
	}

	public void printAll() {
		for(Product2 w : value) {
			System.out.println(w);
		}
	}
	@Override
	public String toString() {
		return "Entity [value=" + value + "]";
	}
	
}