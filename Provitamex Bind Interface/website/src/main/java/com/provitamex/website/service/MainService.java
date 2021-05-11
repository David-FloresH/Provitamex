package com.provitamex.website.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
            System.out.println(e);
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
        }
        catch (Exception e)
        {
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
            System.out.println(e);
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
            System.out.println(e);
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
            System.out.println(e);
        }
		return clientDetails;
	}
	
	public String setNewClient() {
		String clientinfo= "{\"LegalName\": \"DavidFlores\", \"CommercialName\": \"David SA de CV\", \"RFC\": \"XAXX010101000\", \"CreditDays\": \"0\", \"CreditAmount\": \"0\", \"PriceListID\": \"4cda058c-2d0a-4635-a7b2-597de294afed\", \"AccountingNumber\": \"105-01-001\" ,\"Telephone\":\"6861880576\",\"Address\":{\"Streetname\": \"hola\", \"ExteriorNumber\": \"2\", \"Colonia\": \"hola2\", \"ZipCode\":\"52522\", \"City\": \"Mexicali\", \"State\": \"Baja California\", \"InteriorNumber\": \"1\"}}";
		String clientid= "";
		try {
			System.out.println(clientinfo);
            clientid= apiservice.postRequest("https://api.bind.com.mx/api/Clients",clientinfo);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
		return clientid;
	}
}
