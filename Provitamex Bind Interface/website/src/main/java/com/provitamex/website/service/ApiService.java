package com.provitamex.website.service;

import java.net.URI;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

@Service
public class ApiService {
	
	Logger logger = LogManager.getLogger("Provitamex");

	public String getRequest(String url) {
		HttpClient httpclient = HttpClients.createDefault();
		String entity = "";
        try
        {
            URIBuilder builder = new URIBuilder(url);

			URI uri = builder.build();
			HttpGet request = new HttpGet(uri);
			request.setHeader("Cache-Control", "no-cache");
			request.setHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImthcmVuMXw3MjE4MSIsIkludGVybmFsSUQiOiI1Njc0OWE5Yy04ZTdjLTQ4YTktYjkxYS0wMjkyN2U3MGY4MDIiLCJuYmYiOjE2MTkzOTc2ODUsImV4cCI6MTY1MDkzMzY4NSwiaWF0IjoxNjE5Mzk3Njg1LCJpc3MiOiJNaW5udF9Tb2x1dGlvbnNfU0FfREVfQ1YiLCJhdWQiOiJCaW5kX0VSUF9BUElfVXNlcnMifQ.wjhxCvaXIv6A0Y2ook8dPdGF7WOHqf-i_vzoDJPTxQg");
			
			HttpResponse response = httpclient.execute(request);
            entity = EntityUtils.toString(response.getEntity());
            
        } catch(Exception e) {
        	logger.error("Error on GET Request. Full stack trace:",e);
        	e.printStackTrace();
        } 
        return entity;
	}
	
	public String postRequest(String url,String body) {
		HttpClient httpclient = HttpClients.createDefault();
		String entity = "";
        try
        {
            URIBuilder builder = new URIBuilder(url);

			URI uri = builder.build();
			HttpPost request = new HttpPost(uri);
			StringEntity ent = new StringEntity(body);
			request.setEntity(ent);
			request.setHeader("Cache-Control", "no-cache");
			request.setHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImthcmVuMXw3MjE4MSIsIkludGVybmFsSUQiOiI1Njc0OWE5Yy04ZTdjLTQ4YTktYjkxYS0wMjkyN2U3MGY4MDIiLCJuYmYiOjE2MTkzOTc2ODUsImV4cCI6MTY1MDkzMzY4NSwiaWF0IjoxNjE5Mzk3Njg1LCJpc3MiOiJNaW5udF9Tb2x1dGlvbnNfU0FfREVfQ1YiLCJhdWQiOiJCaW5kX0VSUF9BUElfVXNlcnMifQ.wjhxCvaXIv6A0Y2ook8dPdGF7WOHqf-i_vzoDJPTxQg");
			request.setHeader("Content-Type", "application/json");
			HttpResponse response = httpclient.execute(request);
            entity = EntityUtils.toString(response.getEntity());
        } catch(Exception e) {
        	logger.error("Error on POST Request. Full stack trace:",e);
        	e.printStackTrace();
        } 
        return entity;
	}
	
	public void putRequest(String url,String body) {
		HttpClient httpclient = HttpClients.createDefault();
        try
        {
            URIBuilder builder = new URIBuilder(url);

			URI uri = builder.build();
			HttpPut request = new HttpPut(uri);
			StringEntity ent = new StringEntity(body);
			request.setEntity(ent);
			request.setHeader("Cache-Control", "no-cache");
			request.setHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImthcmVuMXw3MjE4MSIsIkludGVybmFsSUQiOiI1Njc0OWE5Yy04ZTdjLTQ4YTktYjkxYS0wMjkyN2U3MGY4MDIiLCJuYmYiOjE2MTkzOTc2ODUsImV4cCI6MTY1MDkzMzY4NSwiaWF0IjoxNjE5Mzk3Njg1LCJpc3MiOiJNaW5udF9Tb2x1dGlvbnNfU0FfREVfQ1YiLCJhdWQiOiJCaW5kX0VSUF9BUElfVXNlcnMifQ.wjhxCvaXIv6A0Y2ook8dPdGF7WOHqf-i_vzoDJPTxQg");
			request.setHeader("Content-Type", "application/json");
			httpclient.execute(request);
        } catch(Exception e) {
        	logger.error("Error on PUT Request. Full stack trace:",e);
        	e.printStackTrace();
        } 
	}
	
	
	public void deleteRequest(String mode,String id) {
		HttpClient httpclient = HttpClients.createDefault();
        try
        {
            URIBuilder builder = new URIBuilder("https://api.bind.com.mx/api/"+mode+"/"+id);
			URI uri = builder.build();
			HttpDelete request = new HttpDelete(uri);
			request.setHeader("Cache-Control", "no-cache");
			request.setHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImthcmVuMXw3MjE4MSIsIkludGVybmFsSUQiOiI1Njc0OWE5Yy04ZTdjLTQ4YTktYjkxYS0wMjkyN2U3MGY4MDIiLCJuYmYiOjE2MTkzOTc2ODUsImV4cCI6MTY1MDkzMzY4NSwiaWF0IjoxNjE5Mzk3Njg1LCJpc3MiOiJNaW5udF9Tb2x1dGlvbnNfU0FfREVfQ1YiLCJhdWQiOiJCaW5kX0VSUF9BUElfVXNlcnMifQ.wjhxCvaXIv6A0Y2ook8dPdGF7WOHqf-i_vzoDJPTxQg");
			httpclient.execute(request);
        } catch(Exception e) {
        	logger.error("Error on DELETE Request. Full stack trace:",e);
        	e.printStackTrace();
        } 
	}
	
}
