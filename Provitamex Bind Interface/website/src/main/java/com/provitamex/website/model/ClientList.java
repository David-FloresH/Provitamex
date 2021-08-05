package com.provitamex.website.model;

import java.util.List;

public class ClientList {
	
	private List<Client> value;
	private String count;

	public List<Client> getValue() {
		return value;
	}

	public void setValue(List<Client> value) {
		this.value = value;
	}
	
	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public void printAll() {
		for(Client w : value) {
			System.out.println(w);
		}
	}
}
