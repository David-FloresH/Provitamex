package com.provitamex.website.model;

public class Product2 {
	private String Name;
	private String Title;
	private String Price;
	private String Inventory;
	private String Qty;
	private String ID;
	public String getTitle() {
		return Title;
	}
	public void setTitle(String title) {
		Title = title;
	}
	public String getPrice() {
		return Price;
	}
	public void setPrice(String price) {
		Price = price;
	}
	public String getInventory() {
		return Inventory;
	}
	public void setInventory(String inventory) {
		Inventory = inventory;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getQty() {
		return Qty;
	}
	public void setQty(String qty) {
		Qty = qty;
	}
	@Override
	public String toString() {
		return "Product2 [Name=" + Name + ", Title=" + Title + ", Price=" + Price + ", Inventory=" + Inventory
				+ ", Qty=" + Qty + ", ID=" + ID + "]";
	}
	
}
