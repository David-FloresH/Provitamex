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
import com.provitamex.website.model.Account;
import com.provitamex.website.model.Client;
import com.provitamex.website.model.ClientDetails;
import com.provitamex.website.model.Invoice;
import com.provitamex.website.model.InvoiceDetails;
import com.provitamex.website.model.Order;
import com.provitamex.website.model.OrderDetails;
import com.provitamex.website.model.Payment;
import com.provitamex.website.model.Product2;
import com.provitamex.website.model.Warehouse;
import com.provitamex.website.service.MainService;

@RestController
public class MainController {
	
	Logger logger = LogManager.getLogger("Provitamex");
	@Autowired
	MainService service;
	
				////////////////////////////          WAREHOUSES METHODS              ///////////////////////////////////////
	
	@CrossOrigin
	@GetMapping("/warehouses")
	public List<Warehouse> getWarehouses(){
		logger.info("WAREHOUSE METHOD CALLED");
		System.out.println("WAREHOUSE METHOD CALLED");
		return service.getWarehouses();
	}
	
	@CrossOrigin
	@GetMapping("/inventory/{warehouseId}/{pricelistId}")
	public List<Product2> getProducts(@PathVariable String warehouseId, @PathVariable String pricelistId){
		logger.info("WAREHOUSE INVENTORY METHOD CALLED");
		System.out.println("WAREHOUSE INVENTORY METHOD CALLED");
		return service.getProductsInWarehouse(warehouseId,pricelistId);
	}
	
			////////////////////////////         CLIENTS METHODS              ///////////////////////////////////////
	
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
		logger.info(mode+" client method called");
		System.out.println(mode+" client method called");
		if(mode.equals("edit")) {
			String id= details.get("id");
			return service.setClient(mode,id,legalName,pricelistId,telephone,streetName,exteriorNo,colonia,zipCode,city,state,interiorNo);
		}
		else {
			return service.setClient(mode,"",legalName,pricelistId,telephone,streetName,exteriorNo,colonia,zipCode,city,state,interiorNo);
		}
	}

				////////////////////////////          ORDERS METHODS              ///////////////////////////////////////

	@CrossOrigin
	@GetMapping("/orders")
	public List<Order> getOrders(@RequestBody Map<String,String> details){
		String status= details.get("status");
		String orderDate= details.get("orderDate");
		String warehouseId= details.get("warehouseId");
		logger.info("Orders method called");
		System.out.println("Orders method called");
		return service.getOrders(status,orderDate,warehouseId);
	}
	
	@CrossOrigin
	@GetMapping("/orders/{id}")
	public OrderDetails getOrderDetails(@PathVariable String id){
		logger.info("Order details method called");
		System.out.println("Order details method called");
		return service.getOrderDetails(id);
	}
	
	@CrossOrigin
	@PostMapping("/order/{mode}")
	public String setNewOrder(@PathVariable String mode, @RequestBody Map<String,Object> details) {
		String addressId = String.valueOf(details.get("addressId"));
		String clientId = String.valueOf(details.get("clientId"));
		String locationId = String.valueOf(details.get("locationId"));
		String pricelistId = String.valueOf(details.get("pricelistId"));
		String warehouseId = String.valueOf(details.get("warehouseId"));
		String orderDate=  String.valueOf(details.get("orderDate"));
		String discountAmount = String.valueOf(details.get("discountAmount"));
		String products= String.valueOf(details.get("products"));
		Gson g = new Gson(); 
        Product2[] productsList = g.fromJson(products, Product2[].class);
		List<Product2> productsList2 = Arrays.asList(productsList);
		String comments= String.valueOf(details.get("comments"));
		logger.info(mode+" order method called");
		System.out.println(mode+" order method called");
		if(mode.equals("edit")) {
			String id= String.valueOf(details.get("id"));
			return service.setOrder(mode,id,addressId,clientId,locationId,pricelistId,warehouseId,orderDate,discountAmount,productsList2,comments);
		}
		else {
			return service.setOrder(mode,"",addressId,clientId,locationId,pricelistId,warehouseId,orderDate,discountAmount,productsList2,comments);
		}
	}
	
				////////////////////////////         INVOICE METHODS              ///////////////////////////////////////
	
	@CrossOrigin
	@GetMapping("/invoices")
	public List<Invoice> getInvoices(@RequestBody Map<String,String> details){
		String status= details.get("status");
		String invoiceDate= details.get("invoiceDate");
		String warehouseId= details.get("warehouseId");
		logger.info("INVOICES method called");
		System.out.println("INVOICES method called");
		return service.getInvoices(status,invoiceDate,warehouseId);
	}
	
	@CrossOrigin
	@GetMapping("/invoices/{id}")
	public InvoiceDetails getInvoiceDetails(@PathVariable String id){
		logger.info("INVOICE DETAILS method called");
		System.out.println("INVOICE DETAILS method called");
		return service.getInvoiceDetails(id);
	}
	
	@CrossOrigin
	@PostMapping("/newinvoice")
	public String setNewInvoice(@RequestBody Map<String,Object> details) {
		String clientId = String.valueOf(details.get("clientId"));
		String locationId = String.valueOf(details.get("locationId"));
		String warehouseId = String.valueOf(details.get("warehouseId"));
		String pricelistId = String.valueOf(details.get("pricelistId"));
		String discountAmount = String.valueOf(details.get("discountAmount"));
		String products= String.valueOf(details.get("products"));
		Gson g = new Gson(); 
        Product2[] productsList = g.fromJson(products, Product2[].class);
		List<Product2> productsList2 = Arrays.asList(productsList);
		String payments= String.valueOf(details.get("payments"));
		Gson g2 = new Gson(); 
        Payment[] paymentsList = g2.fromJson(payments, Payment[].class);
		List<Payment> paymentsList2 = Arrays.asList(paymentsList);
		logger.info("NEW INVOICE method called");
		System.out.println("NEW INVOICE method called");
		return service.setNewInvoice(clientId,locationId,warehouseId,pricelistId,discountAmount,productsList2,paymentsList2);
	}
	
			////////////////////////////         COMMON METHODS              ///////////////////////////////////////

	
	@CrossOrigin
	@DeleteMapping("/delete/{type}/{id}")
	public String deleteObject(@PathVariable String type,@PathVariable String id) {
		logger.info("Delete "+type+" method called");
		System.out.println("DELETE "+type+" method called");
		return service.deleteObject(type,id);
	}
	
	@CrossOrigin
	@GetMapping("/accounts")
	public List<Account> getBankAccounts(){
		logger.info("BANK ACCOUNTS method called");
		System.out.println("BANK ACCOUNTS method called");
		return service.getBankAccounts();
	}
}
