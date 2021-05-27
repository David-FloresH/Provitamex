package com.provitamex.website.model;

public class ClientDetails {
	private String CommercialName;
	private String Telephones;
	private String PriceListID;
	private String[] Addresses;
	private String Comments;
	
	public String getCommercialName() {
		return CommercialName;
	}
	public void setCommercialName(String commercialName) {
		CommercialName = commercialName;
	}
	public String getTelephones() {
		return Telephones;
	}
	public void setTelephones(String telephones) {
		Telephones = telephones;
	}
	public String[] getAddresses() {
		return Addresses;
	}
	public void setAddresses(String[] addresses) {
		Addresses = addresses;
	}
	public String getPriceListID() {
		return PriceListID;
	}
	public void setPriceListID(String priceListID) {
		PriceListID = priceListID;
	}
	public String getComments() {
		return Comments;
	}
	public void setComments(String comments) {
		Comments = comments;
	}
	
	
}
