package com.provitamex.website.controller;

import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.provitamex.website.model.WarehouseList;
import com.provitamex.website.service.MainService;

@RestController
public class MainController {
	
	Logger logger = LogManager.getLogger("Provitamex");
	@Autowired
	MainService service;
	
	@CrossOrigin
	@GetMapping("/test")
	public void testMethod(){
		Date date= new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss");
		String strDate= formatter.format(date);
		System.out.println(strDate);
	}
	
	@CrossOrigin
	@GetMapping("/warehouses")
	public List<Warehouse> getWarehouses(){
		logger.info("WAREHOUSE METHOD CALLED");
		System.out.println("WAREHOUSE METHOD CALLED");
		return service.getWarehouses();
	}

	@CrossOrigin
	@GetMapping("/orders")
	public List<Order> getOrders(){
		logger.info("ORDERS METHOD CALLED");
		System.out.println("ORDERS METHOD CALLED");
		return service.getOrders();
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
		logger.info("NEW CLIENT METHOD CALLED");
		System.out.println("NEW CLIENT METHOD CALLED");
		return service.setNewClient(legalName,pricelistId,telephone,streetName,exteriorNo,colonia,zipCode,city,state,interiorNo);
	} /*
	{
		"addressId":"89f97ac9-8952-411f-9b21-300b5357c3b3",
		"clientId":"8e1ed991-2231-4617-ab1c-571287483305",
		"locationId":"bb2f2d8f-4e26-48ec-a562-eb12671de881",
		"pricelistId":"4cda058c-2d0a-4635-a7b2-597de294afed",
		"warehouseId":"410fb6eb-539b-4554-b5bf-ddb043b33c57",
		"products":[
		      {"id":"1589becc-5c46-4fbf-bbee-12d9b7045d18","price":"270.00","qty":1},
		      {"id":"5116d09d-80be-4525-b688-3f0b1505b150","price":"97.22","qty":1},
		      {"id":"c9818525-7b2c-483b-9a25-466016a22285","price":"240.74","qty":3}
		      	  ],
		"comments":"01-05-2021 11:00 AM 11:00 AM"
		}*/
	@CrossOrigin
	@PostMapping("/neworder")
	public String setNewOrder(@RequestBody Map<String,Object> details) {
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
		logger.info("NEW ORDER METHOD CALLED");
		System.out.println("NEW ORDER METHOD CALLED");
		return service.setNewOrder(addressId,clientId,locationId,pricelistId,warehouseId,productsList2,comments);
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
	
	
}
