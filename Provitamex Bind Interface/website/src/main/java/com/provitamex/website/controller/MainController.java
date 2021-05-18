package com.provitamex.website.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.provitamex.website.model.Client;
import com.provitamex.website.model.ClientDetails;
import com.provitamex.website.model.Order;
import com.provitamex.website.model.OrderDetails;
import com.provitamex.website.model.Product2;
import com.provitamex.website.model.Warehouse;
import com.provitamex.website.service.MainService;

@RestController
public class MainController {
	
	@Autowired
	MainService service;
	
	@CrossOrigin
	@GetMapping("/warehouses")
	public List<Warehouse> getWarehouses(){
		System.out.println("WAREHOUSE METHOD CALLED");
		return service.getWarehouses();
	}
	
	@CrossOrigin
	@GetMapping("/orders")
	public List<Order> getOrders(){
		System.out.println("ORDERS METHOD CALLED");
		return service.getOrders();
	}
	
	@CrossOrigin
	@GetMapping("/inventory/{warehouseId}/{pricelistId}")
	public List<Product2> getProducts(@PathVariable String warehouseId, @PathVariable String pricelistId){
		System.out.println("WAREHOUSE INVENTORY METHOD CALLED");
		return service.getProductsInWarehouse(warehouseId,pricelistId);
	}
	
	@CrossOrigin
	@GetMapping("/orders/{id}")
	public OrderDetails getOrderDetails(@PathVariable String id){
		System.out.println("ORDER DETAILS METHOD CALLED");
		return service.getOrderDetails(id);
	}
	
	@CrossOrigin
	@GetMapping("/clients")
	public List<Client> getClients(){
		System.out.println("CLIENT METHOD CALLED");
		return service.getClients();
	}
	
	@CrossOrigin
	@GetMapping("/clients/{id}")
	public ClientDetails getClientDetails(@PathVariable String id){
		System.out.println("CLIENT DETAILS METHOD CALLED");
		return service.getClientDetails(id);
	}
	
	@CrossOrigin
	@PostMapping("/newclient")
	public String setNewClient(@RequestBody Map<String,String> details) {
		String legalName = details.get("legalName");
		String pricelistId = details.get("pricelistId");
		String telephone = details.get("telephone");
		String streetName = details.get("streetName");
		String exteriorNo = details.get("exteriorNo");
		String colonia = details.get("colonia");
		String zipCode = details.get("zipCode");
		String city = details.get("city");
		String state = details.get("state");
		String interiorNo = details.get("interiorNo");
		System.out.println("NEW CLIENT METHOD CALLED");
		return service.setNewClient(legalName,pricelistId,telephone,streetName,exteriorNo,colonia,zipCode,city,state,interiorNo);
	}
	
	@CrossOrigin
	@PostMapping("/neworder")
	public String setNewOrder(@RequestBody Map<String,Object> details) {
		String addressId = String.valueOf(details.get("addressId"));
		String clientId = String.valueOf(details.get("clientId"));
		String locationId = String.valueOf(details.get("locationId"));
		String orderDate = String.valueOf(details.get("orderDate"));
		String pricelistId = String.valueOf(details.get("pricelistId"));
		String warehouseId = String.valueOf(details.get("warehouseId"));
		String products= String.valueOf(details.get("products"));
		String comments= String.valueOf(details.get("comments"));
		System.out.println("NEW ORDER METHOD CALLED");
		return service.setNewOrder();
	}
	
	@CrossOrigin
	@PostMapping("/newinvoice")
	public String setNewInvoice(@RequestBody Map<String,Object> details) {
		String clientId = String.valueOf(details.get("clientId"));
		String locationId = String.valueOf(details.get("locationId"));
		String warehouseId = String.valueOf(details.get("warehouseId"));
		String invoiceDate = String.valueOf(details.get("invoiceDate"));
		String pricelistId = String.valueOf(details.get("pricelistId"));
		String products= String.valueOf(details.get("products"));
		String payments= String.valueOf(details.get("payments"));
		System.out.println("NEW INVOICE METHOD CALLED");
		return service.setNewOrder();
	}
}
