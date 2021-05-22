package com.provitamex.website.model;

public class Warehouse {
	private String Name;
	private String ID;
	private String LocationID;
	
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
	public String getLocationID() {
		return LocationID;
	}
	public void setLocationID(String locationID) {
		LocationID = locationID;
	}
	@Override
	public String toString() {
		return "Warehouse [Name=" + Name + ", ID=" + ID + ", LocationID=" + LocationID + "]";
	}

}
