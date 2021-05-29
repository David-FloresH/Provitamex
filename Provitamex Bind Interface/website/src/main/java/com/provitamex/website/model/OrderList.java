package com.provitamex.website.model;

import java.util.List;

public class OrderList {
	private List<Order> value;
	private String count;
	
	public List<Order> getValue() {
		return value;
	}

	public void setValue(List<Order> value) {
		this.value = value;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public void printAll() {
		for(Order w : value) {
			System.out.println(w);
		}
	}
	@Override
	public String toString() {
		return "OrderList [value=" + value + ", count=" + count + "]";
	}
	
}
