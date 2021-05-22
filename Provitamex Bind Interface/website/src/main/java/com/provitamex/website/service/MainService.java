package com.provitamex.website.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.provitamex.website.model.Client;
import com.provitamex.website.model.ClientDetails;
import com.provitamex.website.model.ClientList;
import com.provitamex.website.model.Inventory;
import com.provitamex.website.model.InventoryList;
import com.provitamex.website.model.Order;
import com.provitamex.website.model.OrderDetails;
import com.provitamex.website.model.OrderList;
import com.provitamex.website.model.Product2;
import com.provitamex.website.model.Warehouse;
import com.provitamex.website.model.WarehouseList;


@Service
public class MainService {
	
	Logger logger = LogManager.getLogger("Provitamex");

	@Autowired
	ApiService apiservice;
	
	public List<Warehouse> getWarehouses(){
		WarehouseList warehouses = new WarehouseList();
        try {
            String entity= apiservice.getRequest("https://api.bind.com.mx/api/Warehouses");
            Gson g = new Gson(); 
            warehouses = g.fromJson(entity, WarehouseList.class);
            warehouses.printAll();
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting locations. Full stack trace: ",e);
        	e.printStackTrace();
        }

		return warehouses.getValue();
	}
	
	public List<Product2> getProductsInWarehouse(String warehouseId, String pricelistId){
		Product2[] products;
		List<Product2> productsList= new ArrayList<>();
		String entity= "";
        try {
            entity= apiservice.getRequest("https://api.bind.com.mx//api/ProductsPriceAndInventory?warehouseId="+warehouseId+"&priceListId="+pricelistId);
            System.out.println(entity);
            Gson g = new Gson(); 
            products = g.fromJson(entity, Product2[].class);
            productsList= Arrays.asList(products);
            Stream<Product2> stream= productsList.stream().filter(p -> Double.parseDouble(p.getInventory()) > 0.000000);
            productsList= stream.collect(Collectors.toList());
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting products in warehouse. Full stack trace: ",e);
            e.printStackTrace();
        }
		return productsList;
	}
	
	public List<Order> getOrders(){
		OrderList orders= new OrderList();
        try {
            String entity= apiservice.getRequest("https://api.bind.com.mx/api/Orders");
            Gson g = new Gson(); 
            orders = g.fromJson(entity, OrderList.class);
            orders.printAll();
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting orders. Full stack trace: ",e);
            e.printStackTrace();
        }
		return orders.getValue();
	}
	
	public OrderDetails getOrderDetails(String id){
		OrderDetails orderDetails= new OrderDetails();
        try {
            String entity= apiservice.getRequest("https://api.bind.com.mx/api/Orders/"+id);
            Gson g = new Gson(); 
            orderDetails = g.fromJson(entity, OrderDetails.class);
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting details of an order. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return orderDetails;
	}
	
	public List<Client> getClients(){
		ClientList clients= new ClientList();
        try {
            String entity= apiservice.getRequest("https://api.bind.com.mx/api/Clients");
            Gson g = new Gson(); 
            clients = g.fromJson(entity, ClientList.class);
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting clients. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return clients.getValue();
	}
	
	public ClientDetails getClientDetails(String id){
		ClientDetails clientDetails= new ClientDetails();
        try {
            String entity= apiservice.getRequest("https://api.bind.com.mx/api/Clients/"+id);
            Gson g = new Gson(); 
            clientDetails = g.fromJson(entity, ClientDetails.class);
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting details of a client. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return clientDetails;
	}
	
	public String setNewClient(String legalName,String pricelistId,String telephone,String streetName,String exteriorNo,String colonia,String zipCode,String city,String state, String interiorNo) {
		String clientinfo= "{\"LegalName\": \""+legalName+"\", \"CommercialName\": \""+legalName+"\", \"RFC\": \"XAXX010101000\", \"CreditDays\": \"0\", \"CreditAmount\": \"0\", \"PriceListID\": \""+pricelistId+"\", \"AccountingNumber\": \"105-01-001\" ,\"Telephone\":\""+telephone+"\",\"Address\":{\"Streetname\": \""+streetName +"\", \"ExteriorNumber\": \""+exteriorNo+"\", \"Colonia\": \""+colonia+"\", \"ZipCode\":\""+zipCode+"\", \"City\": \""+city+"\", \"State\": \""+state+"\", \"InteriorNumber\": \""+interiorNo+"\"}}";
		String clientId= "";
		try {
			System.out.println(clientinfo);
            clientId= apiservice.postRequest("https://api.bind.com.mx/api/Clients",clientinfo);
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while setting new client. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return clientId;
	}
	
	public String setNewOrder(String addressId,String clientId,String locationId,String pricelistId,String warehouseId,String products,String comments) {
		Date date= new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss");
		String orderDate= formatter.format(date);
		//debo ver como formatear products dinamicamente
		String orderinfo= "{\"AddressID\": \""+addressId+"\", \"ClientID\": \""+clientId+"\", \"CurrencyID\": \"b7e2c065-bd52-40ca-b508-3accdd538860\", \"LocationID\": \""+locationId+"\", \"OrderDate\": \""+orderDate+"\", \"PriceListID\": \""+pricelistId+"\", \"WarehouseID\": \""+warehouseId+"\" ,\"Products\":["+products+"],\"Comments\": \""+comments+"\"}";
		String orderId= "";
		try {
			System.out.println(orderinfo);
            orderId= apiservice.postRequest("https://api.bind.com.mx/api/Orders",orderinfo);
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while setting new order. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return orderId;
	}
	
	public String setNewInvoice(String clientId,String locationId,String warehouseId,String invoiceDate,String pricelistId,String products,String payments) {
		Date date= new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss");
		String orderDate= formatter.format(date);
		//debo ver como formatear products dinamicamente
		String invoiceinfo= "{\"ClientID\": \""+clientId+"\", \"CurrencyID\": \"b7e2c065-bd52-40ca-b508-3accdd538860\", \"LocationID\": \""+locationId+"\", \"OrderDate\": \""+orderDate+"\", \"PriceListID\": \""+pricelistId+"\", \"WarehouseID\": \""+warehouseId+"\" ,\"Products\":["+products+"]}";
		String invoiceId= "";
		try {
			System.out.println(invoiceinfo);
            invoiceId= apiservice.postRequest("https://api.bind.com.mx/api/Invoices",invoiceinfo);
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while setting new invoice. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return invoiceId;
	}
}
