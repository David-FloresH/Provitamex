package com.provitamex.website.model;

import java.util.List;

public class ProductList {
	private List<Product2> value;
	private String count;

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
	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "ProductList [value=" + value + ", count=" + count + "]";
	}
	
	
}