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

import com.google.gson.Gson;
import com.provitamex.website.model.Account;
import com.provitamex.website.model.AccountList;
import com.provitamex.website.model.Client;
import com.provitamex.website.model.ClientDetails;
import com.provitamex.website.model.ClientList;
import com.provitamex.website.model.Invoice;
import com.provitamex.website.model.InvoiceDetails;
import com.provitamex.website.model.InvoiceList;
import com.provitamex.website.model.Order;
import com.provitamex.website.model.OrderDetails;
import com.provitamex.website.model.OrderList;
import com.provitamex.website.model.Payment;
import com.provitamex.website.model.Product2;
import com.provitamex.website.model.ProductList;
import com.provitamex.website.model.Warehouse;
import com.provitamex.website.model.WarehouseList;


@Service
public class MainService {
	
	Logger logger = LogManager.getLogger("Provitamex");

	@Autowired
	ApiService apiservice;
	
								////////////////////////////          WAREHOUSE METHODS              ///////////////////////////////////////
	/* 
	 * Method called to get all the warehouses available
	 * Returns: List of all warehouses with Id and Name
	 */
	public List<Warehouse> getWarehouses(){
		WarehouseList warehouses = new WarehouseList();
        try {
            String entity= apiservice.getRequest("https://api.bind.com.mx/api/Warehouses");
            Gson g = new Gson(); 
            warehouses = g.fromJson(entity, WarehouseList.class);
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting locations. Full stack trace: ",e);
        	e.printStackTrace();
        }

		return warehouses.getValue();
	}
	
	/*
	 * Method called to get all the inventory inside a warehouses
	 * Params: Needs the warehouseId and pricelist to be used (mayoreo/menudeo)
	 * Returns: Products list with price, available qty and existing qty.
	 */
	public List<Product2> getProductsInWarehouse(String warehouseId, String pricelistId){
		Product2[] products;
		List<Product2> productsList= new ArrayList<>();
		ProductList prods;
		List<Product2> tempProductsList= new ArrayList<>();
		String entity= "";
		String entity2= "";
        try {
            entity= apiservice.getRequest("https://api.bind.com.mx/api/ProductsPriceAndInventory?warehouseId="+warehouseId+"&priceListId="+pricelistId);
            Gson g = new Gson(); 
            products = g.fromJson(entity, Product2[].class);
            productsList= Arrays.asList(products);
            Stream<Product2> stream= productsList.stream().filter(p -> Double.parseDouble(p.getInventory()) > 0.000000);
            productsList= stream.collect(Collectors.toList());
            entity2= apiservice.getRequest("https://api.bind.com.mx/api/Inventory?warehouseID="+warehouseId+"&%24filter=CurrentInventory%20gt%200");
            Gson g2 = new Gson(); 
            prods= g2.fromJson(entity2, ProductList.class);
            tempProductsList= prods.getValue();
            // If there are more than 100 products, we need to do the call to the api again to get the next 100 
            int productsCount= Integer.parseInt(prods.getCount());
            int skip=100;
            while(productsCount > 100) {
            	entity2= apiservice.getRequest("https://api.bind.com.mx/api/Inventory?warehouseID="+warehouseId+"&%24filter=CurrentInventory%20gt%200%20&%24skip="+skip);
            	g2 = new Gson(); 
                prods= g2.fromJson(entity2, ProductList.class);
            	skip+=100;
            	productsCount-=100;
            	tempProductsList.addAll(prods.getValue());
            }
            logger.info("Lista con precios: "+productsList.size()+" Lista con disponibilidad: "+tempProductsList.size());
            // Add Balance to Products List to be returned
            for(Product2 p2: productsList) {
            	Product2 tempProduct= null;
            	try {
            		tempProduct= tempProductsList.stream().filter(p -> p.getProductID().equals(p2.getID())).findFirst().get();
            	}catch(Exception e) {
            		
            	}
            	if(tempProduct==null) {
            		p2.setBalance("0.000000");
            	}
            	else {
            		p2.setBalance(tempProduct.getBalance());
            	}
            }
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting products in warehouse. Full stack trace: ",e);
            e.printStackTrace();
        }
		return productsList;
	}
		
		////////////////////////////          CLIENTS METHODS              ///////////////////////////////////////
	
		
	/*
	* Method called to get all existing clients
	* Return: List of all clients with ids.
	*/
	public List<Client> getClients(){
		ClientList tempClients= new ClientList();
		List<Client> clients = new ArrayList<>();
		try {
			String entity= apiservice.getRequest("https://api.bind.com.mx/api/Clients");
			Gson g = new Gson(); 
			tempClients = g.fromJson(entity, ClientList.class);
			// If there are more than 100 products, we need to do the call to the api again to get the next 100 
			int clientsCount= Integer.parseInt(tempClients.getCount());
			int skip=100;
			clients = tempClients.getValue();
			while(clientsCount > 100) {
				entity= apiservice.getRequest("https://api.bind.com.mx/api/Clients?%24skip="+skip);
				g = new Gson(); 
				tempClients= g.fromJson(entity, ClientList.class);
				skip+=100;
				clientsCount-=100;
				clients.addAll(tempClients.getValue());
			}
		} catch (Exception e){
			logger.error("An error ocurred while getting clients. Full stack trace: ",e);
			e.printStackTrace();
		}
		return clients;
	}
	
	/*
	* Method called to get all details of one specific client
	* Params: Id of the client to be detailed
	* Return: Details of the client.
	*/
	public ClientDetails getClientDetails(String id){
		ClientDetails clientDetails= new ClientDetails();
		try {
			String entity= apiservice.getRequest("https://api.bind.com.mx/api/Clients/"+id);
			Gson g = new Gson(); 
			clientDetails = g.fromJson(entity, ClientDetails.class);
		} catch (Exception e){
			logger.error("An error ocurred while getting details of a client. Full stack trace: ",e);
			e.printStackTrace();
		}
		return clientDetails;
	}
	
	/* 
	* Method called to create or edit a client.
	* Params: Mode - new/edit , all the client details to be created/edited.
	* Returns: ClientId if it is a new order or a success message if it is an edit.
	*/
	public String setClient(String mode, String id,String legalName,String pricelistId,String telephone,String streetName,String exteriorNo,
		String colonia,String zipCode,String city,String state, String interiorNo) {
		String clientinfo;
		String comment= streetName + " No. "+exteriorNo+" "+interiorNo+" Col. "+colonia+", "+city+", "+state+" C.P "+zipCode+" Mexico";
		if(mode.equals("edit")) {
			clientinfo= "{ \"ID\": \""+id+"\", \"LegalName\": \""+legalName+"\", \"CommercialName\": \""+legalName+"\", \"RFC\": \"XAXX010101000\", \"CreditDays\": \"0\", \"CreditAmount\": \"0\", \"PriceListID\": \""+pricelistId+"\", \"AccountingNumber\": \"105-01-001\" ,\"Telephone\":\""+telephone+"\", \"Comment\":\""+comment+"\", \"Address\":{\"Streetname\": \""+streetName +"\", \"ExteriorNumber\": \""+exteriorNo+"\", \"Colonia\": \""+colonia+"\", \"ZipCode\":\""+zipCode+"\", \"City\": \""+city+"\", \"State\": \""+state+"\", \"InteriorNumber\": \""+interiorNo+"\"}}";
		}
		else  {
			clientinfo= "{\"LegalName\": \""+legalName+"\", \"CommercialName\": \""+legalName+"\", \"RFC\": \"XAXX010101000\", \"CreditDays\": \"0\", \"CreditAmount\": \"0\", \"PriceListID\": \""+pricelistId+"\", \"AccountingNumber\": \"105-01-001\" ,\"Telephone\":\""+telephone+"\", \"Comment\":\""+comment+"\", \"Address\":{\"Streetname\": \""+streetName +"\", \"ExteriorNumber\": \""+exteriorNo+"\", \"Colonia\": \""+colonia+"\", \"ZipCode\":\""+zipCode+"\", \"City\": \""+city+"\", \"State\": \""+state+"\", \"InteriorNumber\": \""+interiorNo+"\"}}";
		}
		String clientId= "";
		try {
			logger.info(clientinfo);
			System.out.println(clientinfo);
			if(mode.equals("edit")) {
				apiservice.putRequest("https://api.bind.com.mx/api/Clients",clientinfo);
				clientId="Client Edit Success";
			}
			else {
				clientId= apiservice.postRequest("https://api.bind.com.mx/api/Clients",clientinfo);
			}
		} catch (Exception e){
			logger.error("An error ocurred while setting new client. Full stack trace: ",e);
			e.printStackTrace();
		}
		return clientId;
	}
	
						////////////////////////////          ORDERS METHODS              ///////////////////////////////////////

	/*
	 * Method called to get all existing orders. Can be filtered to a certain warehouse, status, or date.
	 * Params: The optional filters to be applied: status, date or warehouse
	 * Returns: List of orders with details(client, date, subtotal,warehouse) but NO products
	 */
	public List<Order> getOrders(String status,String orderDate,String warehouseId){
		OrderList tempOrders= new OrderList();
		List<Order> orders= new ArrayList<>();
        try {
        	String filters="";
        	if(status!=null && !status.equals("")) {
        		filters += "?%24filter=Status%20eq%20"+status;
        	}
        	if(warehouseId!=null && !warehouseId.equals("")) {
        		if(filters.equals("")) {
        			filters += "?%24filter=WarehouseID%20eq%20guid'"+warehouseId+"'";
        		}
        		else {
        			filters += "%20and%20WarehouseID%20eq%20guid'"+warehouseId+"'";
        		}
        	}
        	if(orderDate!=null && !orderDate.equals("")) {
        		if(filters.equals("")) {
        			filters += "?%24filter=OrderDate%20eq%20DateTime'"+orderDate+"'";
        		}
        		else {
        			filters += "%20and%20OrderDate%20eq%20DateTime'"+orderDate+"'";
        		}
        	}
        	logger.info("Filters are:"+filters);
            String entity= apiservice.getRequest("https://api.bind.com.mx/api/Orders"+filters);
            Gson g = new Gson(); 
            tempOrders = g.fromJson(entity, OrderList.class);
            // If there are more than 100 products, we need to do the call to the api again to get the next 100 
            int ordersCount= Integer.parseInt(tempOrders.getCount());
            int skip=100;
            orders = tempOrders.getValue();
            while(ordersCount > 100) {
            	if(filters.equals("")) {
            		entity= apiservice.getRequest("https://api.bind.com.mx/api/Orders?%24skip="+skip);
            	}
            	else {
            		entity= apiservice.getRequest("https://api.bind.com.mx/api/Orders"+filters+"&%24skip="+skip);
            	}
            	g = new Gson(); 
                tempOrders= g.fromJson(entity, OrderList.class);
            	skip+=100;
            	ordersCount-=100;
            	orders.addAll(tempOrders.getValue());
            }
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting orders. Full stack trace: ",e);
            e.printStackTrace();
        }
		return orders;
	}
	
	/*
	 * Method called to get details of one specific order
	 * Params: order id to be detailed
	 * Return: Details of the order requested with products ordered. 
	 */
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
	
	/* 
	 * Method called to create or edit an order.
	 * Params: Mode - new/edit , all the order details to be created/edited.
	 * Returns: OrderId if it is a new order or a success message if it is an edit.
	 */
	public String setOrder(String mode, String id,String addressId,String clientId,String locationId,String pricelistId,String warehouseId,String orderDate ,String discountAmount,List<Product2> products,String comments) {
		String productList="";
		String serviceList="";
		for(Product2 p: products){
			productList= productList + "{\"ID\": \""+p.getID()+"\", \"Price\": \""+p.getPrice()+"\", \"Qty\": \""+p.getQty()+"\", \"Unit\": \"pieza\"},";
		}
		/*for(Product2 p: services){
			serviceList= serviceList + "{\"ID\": \""+p.getID()+"\", \"Title\": \""+p.getTitle()+"\", \"Price\": \""+p.getPrice()+"\", \"Qty\": \""+p.getQty()+"\", \"Unit\": \"pieza\"},";
		}*/
		//serviceList= serviceList.substring(0,serviceList.length()-1);
		productList= productList.substring(0,productList.length()-1);
		//String orderinfo= "{\"AddressID\": \""+addressId+"\", \"ClientID\": \""+clientId+"\", \"CurrencyID\": \"b7e2c065-bd52-40ca-b508-3accdd538860\", \"LocationID\": \""+locationId+"\", \"OrderDate\": \""+orderDate+"\", \"PriceListID\": \""+pricelistId+"\", \"WarehouseID\": \""+warehouseId+"\" , \"DiscountAmount\": \""+discountAmount+"\" , \"Products\":["+productList+"], \"Services\":["+serviceList+"], \"Comments\": \""+comments+"\"}";
		String orderinfo= "{\"AddressID\": \""+addressId+"\", \"ClientID\": \""+clientId+"\", \"CurrencyID\": \"b7e2c065-bd52-40ca-b508-3accdd538860\", \"LocationID\": \""+locationId+"\", \"OrderDate\": \""+orderDate+"\", \"PriceListID\": \""+pricelistId+"\", \"WarehouseID\": \""+warehouseId+"\" , \"DiscountAmount\": \""+discountAmount+"\" , \"Products\":["+productList+"], \"Comments\": \""+comments+"\"}";
		String orderId= "";
		try {
			logger.info(orderinfo);
			System.out.println(orderinfo);
			if(mode.equals("edit")) {
				apiservice.putRequest("https://api.bind.com.mx/api/Orders",orderinfo);
				orderId="Order Edit Success";
			}
			else {
				orderId= apiservice.postRequest("https://api.bind.com.mx/api/Orders",orderinfo);
			}
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while setting new order. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return orderId;
	}
	
						////////////////////////////          INVOICES METHODS              ///////////////////////////////////////

	/*
	 * Method called to get all existing invoices. Can be filtered to a certain warehouse, status, or date.
	 * Params: The optional filters to be applied: status, date or warehouse
	 * Returns: List of invoices with details(client, date, subtotal,warehouse) but NO products
	 */
	public List<Invoice> getInvoices(String status,String invoiceDate,String warehouseId){
		InvoiceList tempInvoices= new InvoiceList();
		List<Invoice> invoices= new ArrayList<>();
        try {
        	String filters="";
        	if(status!=null && !status.equals("")) {
        		filters += "?%24filter=Status%20eq%20"+status;
        	}
        	if(warehouseId!=null && !warehouseId.equals("")) {
        		if(filters.equals("")) {
        			filters += "?%24filter=WarehouseID%20eq%20guid'"+warehouseId+"'";
        		}
        		else {
        			filters += "%20and%20WarehouseID%20eq%20guid'"+warehouseId+"'";
        		}
        	}
        	if(invoiceDate!=null && !invoiceDate.equals("")) {
        		if(filters.equals("")) {
        			filters += "?%24filter=Date%20eq%20DateTime'"+invoiceDate+"'";
        		}
        		else {
        			filters += "%20and%20Date%20eq%20DateTime'"+invoiceDate+"'";
        		}
        	}
        	logger.info("Filters are:"+filters);
            String entity= apiservice.getRequest("https://api.bind.com.mx/api/Invoices"+filters);
            Gson g = new Gson(); 
            tempInvoices = g.fromJson(entity, InvoiceList.class);
            // If there are more than 100 products, we need to do the call to the api again to get the next 100 
            logger.info(tempInvoices.getCount());
            int invoicesCount= Integer.parseInt(tempInvoices.getCount());
            int skip=100;
            invoices = tempInvoices.getValue();
            while(invoicesCount > 100) {
            	if(filters.equals("")) {
            		entity= apiservice.getRequest("https://api.bind.com.mx/api/Invoices?%24skip="+skip);
            	}
            	else {
            		entity= apiservice.getRequest("https://api.bind.com.mx/api/Invoices"+filters+"&%24skip="+skip);
            	}
            	g = new Gson(); 
                tempInvoices= g.fromJson(entity, InvoiceList.class);
            	skip+=100;
            	invoicesCount-=100;
            	invoices.addAll(tempInvoices.getValue());
            }
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting invoices. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return invoices;
	}
	
	/*
	 * Method called to get details of one specific invoice
	 * Params: invoice id to be detailed
	 * Return: Details of the invoice requested with products ordered. 
	 */
	public InvoiceDetails getInvoiceDetails(String id){
		InvoiceDetails invoiceDetails= new InvoiceDetails();
        try {
            String entity= apiservice.getRequest("https://api.bind.com.mx/api/Invoices/"+id);
            Gson g = new Gson(); 
            invoiceDetails = g.fromJson(entity, InvoiceDetails.class);
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting details of an invoice. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return invoiceDetails;
	}
	
	/*
	 * Method called to submit a new invoice
	 * Params: Details of invoice to be submitted
	 * Returns: InvoiceId created
	 */
	public String setNewInvoice(String clientId,String locationId,String warehouseId, String pricelistId,String discountAmount,List<Product2> products,List<Payment> payments) {
		Date date= new Date();
		//SimpleDateFormat formatter = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss");
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		String invoiceDate= formatter.format(date);
		String invoiceId= "";
		String productList="";
		for(Product2 p: products){
			productList= productList + "{\"ID\": \""+p.getID()+"\", \"Price\": \""+p.getPrice()+"\", \"Qty\": \""+p.getQty()+"\", \"Unit\": \"pieza\"},";
		}
		productList= productList.substring(0,productList.length()-1);
		String paymentList="";
		for(Payment p: payments) {
			paymentList= paymentList + "{\"PaymentMethod\": \""+p.getPaymentMethod()+"\", \"AccountID\": \""+p.getAccountID()+"\", \"Amount\": \""+p.getAmount()+"\", \"Reference\": \"PAGO CLIENTE\"},";
		}
		paymentList= paymentList.substring(0,paymentList.length()-1);
		String invoiceinfo= "{\"ClientID\": \""+clientId+"\", \"CurrencyID\": \"b7e2c065-bd52-40ca-b508-3accdd538860\", \"CFDIUse\": \"3\", \"LocationID\": \""+locationId+"\", \"InvoiceDate\": \""+invoiceDate+"\", \"PriceListID\": \""+pricelistId+"\", \"WarehouseID\": \""+warehouseId+"\" ,\"Products\":["+productList+"], \"Payments\":["+paymentList+"]}";
		try {
			System.out.println(invoiceinfo);
			logger.info(invoiceinfo);
            invoiceId= apiservice.postRequest("https://api.bind.com.mx/api/Invoices",invoiceinfo);
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while setting new invoice. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return invoiceId;
	}
	
						////////////////////////////          COMMON METHODS              ///////////////////////////////////////
	
	/* 
	 * Method called to get all the bank accounts available
	 * Returns: List of all bankaccounts with Id and Name
	 */
	public List<Account> getBankAccounts(){
		AccountList accounts = new AccountList();
        try {
            String entity= apiservice.getRequest("https://api.bind.com.mx/api/BankAccounts");
            Gson g = new Gson(); 
            accounts = g.fromJson(entity, AccountList.class);
        }
        catch (Exception e)
        {
        	logger.error("An error ocurred while getting bank accounts. Full stack trace: ",e);
        	e.printStackTrace();
        }
		return accounts.getValue();
	}
	
	/*
	 * Method called to delete an object
	 * Params: , type of object and Id of object to be deleted
	 * Return: Success/Error message
	 */
	public String deleteObject(String type,String id) {
		String result;
		try {
			String objectType="";
			if(type.equals("client")) {
				objectType="Clients";
			}
			else if(type.equals("order")) {
				objectType="Orders";
			}
			else if(type.equals("invoice")) {
				objectType="Invoices";
			}
			apiservice.deleteRequest(objectType,id);
			result="Success";
		} catch(Exception e) {
			logger.error("An error occured while deleting client. Full stack trace: ",e);
			e.printStackTrace();
			result="Error";
		}
		return result;
	}
	
}
