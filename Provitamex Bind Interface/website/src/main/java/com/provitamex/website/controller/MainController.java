package com.provitamex.website.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.provitamex.website.model.Client;
import com.provitamex.website.model.ClientDetails;
import com.provitamex.website.model.Inventory;
import com.provitamex.website.model.Order;
import com.provitamex.website.model.OrderDetails;
import com.provitamex.website.model.Product2;
import com.provitamex.website.model.Warehouse;
import com.provitamex.website.service.MainService;

@RestController
public class MainController {
	
	@Autowired
	MainService service;
	
	@GetMapping("/warehouses")
	public List<Warehouse> getWarehouses(){
		System.out.println("WAREHOUSE METHOD CALLED");
		return service.getWarehouses();
	}
	
	@GetMapping("/orders")
	public List<Order> getOrders(){
		System.out.println("ORDERS METHOD CALLED");
		return service.getOrders();
	}
	
	@GetMapping("/inventory/{warehouseId}/{pricelistId}")
	public List<Product2> getProducts(@PathVariable String warehouseId, @PathVariable String pricelistId){
		System.out.println("WAREHOUSE INVENTORY METHOD CALLED");
		return service.getProductsInWarehouse(warehouseId,pricelistId);
	}
	
	@GetMapping("/orders/{id}")
	public OrderDetails getOrderDetails(@PathVariable String id){
		System.out.println("ORDER DETAILS METHOD CALLED");
		return service.getOrderDetails(id);
	}
	
	@GetMapping("/clients")
	public List<Client> getClients(){
		System.out.println("CLIENT METHOD CALLED");
		return service.getClients();
	}
	
	@GetMapping("/clients/{id}")
	public ClientDetails getClientDetails(@PathVariable String id){
		System.out.println("CLIENT DETAILS METHOD CALLED");
		return service.getClientDetails(id);
	}
	
	@PostMapping("/newclient")
	public String setNewClient() {
		System.out.println("NEW CLIENT METHOD CALLED");
		return service.setNewClient();
	}
	
}
