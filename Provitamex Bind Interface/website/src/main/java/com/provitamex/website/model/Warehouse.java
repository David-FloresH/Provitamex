package com.provitamex.website.model;

public class Warehouse {
	private String Name;
	private String ID;
	
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	
	@Override
	public String toString() {
		return "Warehouse [Name=" + Name + ", ID=" + ID + "]";
	}
	
	

}
