package com.provitamex.website.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.provitamex.website.model.Client;
import com.provitamex.website.model.ClientDetails;
import com.provitamex.website.model.Order;
import com.provitamex.website.model.OrderDetails;
import com.provitamex.website.model.Product2;
import com.provitamex.website.model.Warehouse;
import com.provitamex.website.service.MainService;

@RestController
public class MainController {
	
	Logger logger = LogManager.getLogger("Provitamex");
	@Autowired
	MainService service;
	
	@CrossOrigin
	@GetMapping("/warehouses")
	public List<Warehouse> getWarehouses(){
		logger.info("WAREHOUSE METHOD CALLED");
		System.out.println("WAREHOUSE METHOD CALLED");
		return service.getWarehouses();
	}

	@CrossOrigin
	@GetMapping("/orders")
	public List<Order> getOrders(@RequestBody Map<String,String> details){
		String status= details.get("status");
		String orderDate= details.get("orderDate");
		String warehouseId= details.get("warehouseId");
		logger.info("ORDERS METHOD CALLED");
		System.out.println("ORDERS METHOD CALLED");
		return service.getOrders(status,orderDate,warehouseId);
	}
	
	@CrossOrigin
	@GetMapping("/inventory/{warehouseId}/{pricelistId}")
	public List<Product2> getProducts(@PathVariable String warehouseId, @PathVariable String pricelistId){
		logger.info("WAREHOUSE INVENTORY METHOD CALLED");
		System.out.println("WAREHOUSE INVENTORY METHOD CALLED");
		return service.getProductsInWarehouse(warehouseId,pricelistId);
	}
	
	@CrossOrigin
	@GetMapping("/orders/{id}")
	public OrderDetails getOrderDetails(@PathVariable String id){
		logger.info("ORDER DETAILS METHOD CALLED");
		System.out.println("ORDER DETAILS METHOD CALLED");
		return service.getOrderDetails(id);
	}
	
	@CrossOrigin
	@GetMapping("/clients")
	public List<Client> getClients(){
		logger.info("CLIENT METHOD CALLED");
		System.out.println("CLIENT METHOD CALLED");
		return service.getClients();
	}
	
	@CrossOrigin
	@GetMapping("/clients/{id}")
	public ClientDetails getClientDetails(@PathVariable String id){
		logger.info("CLIENT DETAILS METHOD CALLED");
		System.out.println("CLIENT DETAILS METHOD CALLED");
		return service.getClientDetails(id);
	}
	
	@CrossOrigin
	@PostMapping("/client/{mode}")
	public String setNewClient(@PathVariable String mode, @RequestBody Map<String,String> details) {
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
		if(mode.equals("edit")) {
			logger.info("EDIT CLIENT METHOD CALLED");
			System.out.println("EDIT CLIENT METHOD CALLED");
			String id= details.get("id");
			return service.setClient(mode,id,legalName,pricelistId,telephone,streetName,exteriorNo,colonia,zipCode,city,state,interiorNo);
		}
		else {
			logger.info("NEW CLIENT METHOD CALLED");
			System.out.println("NEW CLIENT METHOD CALLED");
			return service.setClient(mode,"",legalName,pricelistId,telephone,streetName,exteriorNo,colonia,zipCode,city,state,interiorNo);
		}
	}
	
	@CrossOrigin
	@PostMapping("/order/{mode}")
	public String setNewOrder(@PathVariable String mode, @RequestBody Map<String,Object> details) {
		String addressId = String.valueOf(details.get("addressId"));
		String clientId = String.valueOf(details.get("clientId"));
		String locationId = String.valueOf(details.get("locationId"));
		String pricelistId = String.valueOf(details.get("pricelistId"));
		String warehouseId = String.valueOf(details.get("warehouseId"));
		String products= String.valueOf(details.get("products"));
		Gson g = new Gson(); 
        Product2[] productsList = g.fromJson(products, Product2[].class);
		List<Product2> productsList2 = Arrays.asList(productsList);
		String comments= String.valueOf(details.get("comments"));
		if(mode.equals("edit")) {
			logger.info("EDIT ORDER METHOD CALLED");
			System.out.println("EDIT ORDER METHOD CALLED");
			String id= String.valueOf(details.get("id"));
			return service.setOrder(mode,id,addressId,clientId,locationId,pricelistId,warehouseId,productsList2,comments);
		}
		else {
			logger.info("NEW ORDER METHOD CALLED");
			System.out.println("NEW ORDER METHOD CALLED");
			return service.setOrder(mode,"",addressId,clientId,locationId,pricelistId,warehouseId,productsList2,comments);
		}
	}
	
	@CrossOrigin
	@PostMapping("/newinvoice")
	public String setNewInvoice(@RequestBody Map<String,Object> details) {
		String clientId = String.valueOf(details.get("clientId"));
		String locationId = String.valueOf(details.get("locationId"));
		String warehouseId = String.valueOf(details.get("warehouseId"));
		String pricelistId = String.valueOf(details.get("pricelistId"));
		String products= String.valueOf(details.get("products"));
		String payments= String.valueOf(details.get("payments"));
		logger.info("NEW INVOICE METHOD CALLED");
		System.out.println("NEW INVOICE METHOD CALLED");
		return service.setNewInvoice(clientId,locationId,warehouseId,pricelistId,products,payments);
	}
	
	@CrossOrigin
	@DeleteMapping("/deleteclient/{id}")
	public String deleteClient(@PathVariable String id) {
		logger.info("DELETE CLIENT METHOD CALLED");
		System.out.println("DELETE CLIENT METHOD CALLED");
		return service.deleteClient(id);
	}
	
	@CrossOrigin
	@DeleteMapping("/deleteorder/{id}")
	public String deleteOrder(@PathVariable String id) {
		logger.info("DELETE ORDER METHOD CALLED");
		System.out.println("DELETE ORDER METHOD CALLED");
		return service.deleteOrder(id);
	}
	
}
