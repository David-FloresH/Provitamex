package com.provitamex.website.model;

public class Invoice {
	private String ID;
	private String ClientName;
	private String Total;
	private String Status;
	private String WarehouseID;
	private String Date;
	
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
	public String getTotal() {
		return Total;
	}
	public void setTotal(String total) {
		Total = total;
	}
	public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
	}
	public String getWarehouseID() {
		return WarehouseID;
	}
	public void setWarehouseID(String warehouseID) {
		WarehouseID = warehouseID;
	}
	public String getDate() {
		return Date;
	}
	public void setDate(String date) {
		Date = date;
	}
	
}
