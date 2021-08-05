package com.provitamex.website.model;

public class Order {

	private String ClientName;
	private String PhoneNumber;
	private String Status;
	private String ProductSubtotal;
	private String ClientID;
	private String ID;
	private String OrderDate;
	private String Comments;
	private String WarehouseID;
	
	public String getClientName() {
		return ClientName;
	}
	public void setClientName(String clientName) {
		ClientName = clientName;
	}
	public String getPhoneNumber() {
		return PhoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		PhoneNumber = phoneNumber;
	}
	public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
	}
	public String getProductSubtotal() {
		return ProductSubtotal;
	}
	public void setProductSubtotal(String productSubtotal) {
		ProductSubtotal = productSubtotal;
	}
	public String getClientID() {
		return ClientID;
	}
	public void setClientID(String clientID) {
		ClientID = clientID;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getOrderDate() {
		return OrderDate;
	}
	public void setOrderDate(String orderDate) {
		OrderDate = orderDate;
	}
	public String getComments() {
		return Comments;
	}
	public void setComments(String comments) {
		Comments = comments;
	}
	public String getWarehouseID() {
		return WarehouseID;
	}
	public void setWarehouseID(String warehouseID) {
		WarehouseID = warehouseID;
	}
	@Override
	public String toString() {
		return "Order [ClientName=" + ClientName + ", PhoneNumber=" + PhoneNumber + ", Status=" + Status
				+ ", ProductSubtotal=" + ProductSubtotal + ", ClientID=" + ClientID + ", ID=" + ID + ", OrderDate="
				+ OrderDate + ", Comments=" + Comments + ", WarehouseID=" + WarehouseID + "]";
	}
	
}
