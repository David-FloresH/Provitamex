package com.provitamex.website.model;

import java.util.List;

public class OrderDetails {
	private String ID;
	private String ClientName;
	private String ClientID;
	private String WarehouseName;
	private String OrderDate;
	private String Comments;
	private String Address;
	private String PhoneNumber;
	private String EmployeeName;
	private String Status;
	private String Total;
	private String ProductSubtotal;
	private String Discount;
	private List<Product2> Products;
	
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getClientName() {
		return ClientName;
	}
	public void setClientName(String clientName) {
		ClientName = clientName;
	}
	public String getClientID() {
		return ClientID;
	}
	public void setClientID(String clientID) {
		ClientID = clientID;
	}
	public String getWarehouseName() {
		return WarehouseName;
	}
	public void setWarehouseName(String warehouseName) {
		WarehouseName = warehouseName;
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
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public String getPhoneNumber() {
		return PhoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		PhoneNumber = phoneNumber;
	}
	public String getEmployeeName() {
		return EmployeeName;
	}
	public void setEmployeeName(String employeeName) {
		EmployeeName = employeeName;
	}
	public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
	}
	public String getTotal() {
		return Total;
	}
	public void setTotal(String total) {
		Total = total;
	}
	public List<Product2> getProducts() {
		return Products;
	}
	public void setProducts(List<Product2> products) {
		Products = products;
	}
	public String getProductSubtotal() {
		return ProductSubtotal;
	}
	public void setProductSubtotal(String productSubtotal) {
		ProductSubtotal = productSubtotal;
	}
	public String getDiscount() {
		return Discount;
	}
	public void setDiscount(String discount) {
		Discount = discount;
	}
	
}
