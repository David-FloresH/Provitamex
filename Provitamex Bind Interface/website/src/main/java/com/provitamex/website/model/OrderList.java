package com.provitamex.website.model;

import java.util.List;

public class OrderList {
	private List<Order> value;

	public List<Order> getValue() {
		return value;
	}

	public void setValue(List<Order> value) {
		this.value = value;
	}

	public void printAll() {
		for(Order w : value) {
			System.out.println(w);
		}
	}
	@Override
	public String toString() {
		return "Entity [value=" + value + "]";
	}
}
