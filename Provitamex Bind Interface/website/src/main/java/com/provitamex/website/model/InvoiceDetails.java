package com.provitamex.website.model;

import java.util.List;

public class InvoiceDetails {
	private String ID;
	private String ClientID;
	private String ClientName;
	private String Status;
	private String ClientPhoneNumber;
	private String ApplicationDate;
	private String WarehouseID;
	private String Subtotal;
	private String Discount;
	private String Payments;
	private List<Product2> Products;
	
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getClientID() {
		return ClientID;
	}
	public void setClientID(String clientID) {
		ClientID = clientID;
	}
	public String getClientName() {
		return ClientName;
	}
	public void setClientName(String clientName) {
		ClientName = clientName;
	}
	public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
	}
	public String getClientPhoneNumber() {
		return ClientPhoneNumber;
	}
	public void setClientPhoneNumber(String clientPhoneNumber) {
		ClientPhoneNumber = clientPhoneNumber;
	}
	public String getApplicationDate() {
		return ApplicationDate;
	}
	public void setApplicationDate(String applicationDate) {
		ApplicationDate = applicationDate;
	}
	public String getWarehouseID() {
		return WarehouseID;
	}
	public void setWarehouseID(String warehouseID) {
		WarehouseID = warehouseID;
	}
	public String getSubtotal() {
		return Subtotal;
	}
	public void setSubtotal(String subtotal) {
		Subtotal = subtotal;
	}
	public String getDiscount() {
		return Discount;
	}
	public void setDiscount(String discount) {
		Discount = discount;
	}
	public String getPayments() {
		return Payments;
	}
	public void setPayments(String payments) {
		Payments = payments;
	}
	public List<Product2> getProducts() {
		return Products;
	}
	public void setProducts(List<Product2> products) {
		Products = products;
	}
	
	
}
