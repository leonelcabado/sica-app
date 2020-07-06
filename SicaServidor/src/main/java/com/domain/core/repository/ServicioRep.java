package com.domain.core.repository;


import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import com.domain.core.document.Location;
import com.domain.core.document.Notificacion;
import com.domain.core.document.Sonda;
import com.domain.core.document.Usuario;
import com.domain.core.security.EncriptadorAES;
import com.mongodb.client.result.UpdateResult;
@Repository
public class ServicioRep {

	
	@Autowired //ver inyeccion de dependecias (para explicar mejor)
	private MongoTemplate mt;
	EncriptadorAES encriptador = new EncriptadorAES();
	
	
	//METODOS LOCALIZACIONES---------------------------------------------------------------------------------------------------
	
	public Location save(Location location) { //sE GUARDA LOCALIZACION EN MONGO
		return mt.save(location);
	}

	
	public UpdateResult addNotificacion(String idLocation, Notificacion notificacion) { //AGREGO NOTIFICACIONES A LOCALIZACION
		return mt.updateFirst(
				new Query().addCriteria(Criteria.where("_id").is(idLocation)),
				new Update().addToSet("notificaciones", notificacion),
				"Location");
	}
	
	public Location deleteNotificacion(String idNotificacion, Location location) { //ELIMINO NOITIFICACION 
		Query query = new Query();
		Query queryLoc = new Query();
		Criteria c = new Criteria().andOperator(
				Criteria.where("_id").is(location.getId()),
				Criteria.where("notificaciones._id").is(idNotificacion)
				);
        query.addCriteria(c);
        location.setNotificaciones(mt.find(query, Location.class).get(0).getNotificaciones());
        for(int i=0 ; i < location.getNotificaciones().size() ; i++) {    	
        	if(location.getNotificaciones().get(i).getId().equals(idNotificacion)) {
        		location.getNotificaciones().remove(i);
        		
        	}
        }
      
        queryLoc.addCriteria(Criteria.where("_id").is(location.getId()));
        Update update = new Update();
        if(location.getNotificaciones()!= null) {update.set("notificaciones", location.getNotificaciones());}
        return mt.findAndModify(queryLoc, update, Location.class);
        
	}
	
	public Location deleteSonda(String idSonda, Location location) { //ELIMINO SONDA 
		Query query = new Query();
		Query queryLoc = new Query();
		Criteria c = new Criteria().andOperator(
				Criteria.where("_id").is(location.getId()),
				Criteria.where("sondas._id").is(idSonda)
				);
        query.addCriteria(c);
        location.setSondas(mt.find(query, Location.class).get(0).getSondas());
        for(int i=0 ; i < location.getSondas().size() ; i++) {    	
        	if(location.getSondas().get(i).getId().equals(idSonda)) {
        		location.getSondas().remove(i);
        		
        	}
        }
      
        queryLoc.addCriteria(Criteria.where("_id").is(location.getId()));
        Update update = new Update();
        if(location.getSondas()!= null) {update.set("sondas", location.getSondas());}
        return mt.findAndModify(queryLoc, update, Location.class);
        
	}
	
	public List<Location> findAll(){ //OBTENGO TODAS LAS LOCALIZACIONES DE MONGO
		return mt.findAll(Location.class);
	}
	
	public Location find(String idLocation) { //OBTENGO UNA LOCALIZACION A TRAVES DE ID
		return mt.find(new Query().addCriteria(Criteria.where("_id").is(idLocation)), Location.class).get(0);

	}
	
	public List<Location> search(String search){ //ver más!
		return mt.aggregate(Aggregation.newAggregation(Aggregation.match(new Criteria().orOperator(
				Criteria.where("nombre").regex(search),
				Criteria.where("descripcion").regex(search)
				))
				),"Location",Location.class).getMappedResults();
	}
	
	public Location update(Location location){ //ACTUALIZO LOCALIZACION EN MONGO
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(location.getId()));
        Update update = new Update();
        System.out.println(location.getNombre().length());
        System.out.println(location.getImagen());
        System.out.println(location.getDescripcion());
        System.out.println(location.getIdSensores());
        System.out.println("estoy por imagen");
        if(location.getNombre()!= null) {update.set("nombre", location.getNombre());}
        if(location.getDescripcion()!= null) {update.set("descripcion", location.getDescripcion());}
        if(location.getIdSensores()!= null) {update.set("idSensores",location.getIdSensores());}
        if(location.getVuTemp()!= null) {update.set("vuTemp",location.getVuTemp());}
        if(location.getVuTurb()!= null) {update.set("vuTurb",location.getVuTurb());}
        if(location.getVuCond()!= null) {update.set("vuCond",location.getVuCond());}
        if(location.getImagen()!= null) {update.set("imagen",location.getImagen());}
        if(location.getLat()!= null) {update.set("lat",location.getLat());}
        if(location.getLon()!= null) {update.set("lon",location.getLon());}
        if(location.getMarcaNotificación()!= null) {update.set("marcaNotificación",location.getMarcaNotificación());}
        return mt.findAndModify(query, update, Location.class);
    }

	
	public void deleteById(String idLocation) { //ELIMINO LOCALIZACION
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(idLocation));
        mt.remove(query, Location.class);
    }
	
	public Location updateLocationObs(Location location){ //ACTUALIZO OBSER DE LA LOCALIZACION 
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(location.getId()));
        Update update = new Update();
        if(location.getObservable()!= null) {update.set("observable", location.getObservable());}
        return mt.findAndModify(query, update, Location.class);
    }
	
	//METODOS USUARIOS---------------------------------------------------------------------------------------------------
	
	public Usuario saveUser(Usuario usuario) throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException{ //GUARDO USUARIO EN MONGO

		/*
		 * System.out.println("Cadena Original: " + usuario.getPassword());
		 * System.out.println("Escriptado     : " +
		 * encriptador.encriptar(usuario.getPassword()));
		 * System.out.println("Desencriptado  : " +
		 * encriptador.desencriptar(encriptador.encriptar(usuario.getPassword())));
		 */
		usuario.setPassword(encriptador.encriptar(usuario.getPassword()));
		return mt.save(usuario);
	}
	
	public Usuario updateUser(Usuario usuario) throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException{ //ACTUALIZO USUARIOS EN MONGO
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(usuario.getId()));
        Update update = new Update();
        if(usuario.getFullname()!= null) {update.set("fullname", usuario.getFullname());}
        if(usuario.getEmail()!= null) {update.set("email", usuario.getEmail());}
        if(usuario.getPassword()!= null) {
        	usuario.setPassword(encriptador.encriptar(usuario.getPassword()));
        	update.set("password",usuario.getPassword());}
        if(usuario.getMunicipio()!= null) {update.set("municipio",usuario.getMunicipio());}
        return mt.findAndModify(query, update, Usuario.class);
    }
	
	public void deleteByIdUser(String idUsuario) { //ELIMINO USUARIO EN MONGO
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(idUsuario));
        mt.remove(query, Usuario.class);
    }
	
	public List<Usuario> findAllUser() throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException{ //OBTENGO TODOS LOS USUARIOS
		List<Usuario> usuarios = new ArrayList<Usuario>();
		for (Usuario usuario : mt.findAll(Usuario.class)) {
			usuario.setPassword(encriptador.desencriptar(usuario.getPassword()));
			usuarios.add(usuario);
		}
		return usuarios;
	}
	
	public Usuario findUser(String idUser) throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException { //BUSCO UN USUARIO POR ID
		Usuario usuario = mt.find(new Query().addCriteria(Criteria.where("_id").is(idUser)), Usuario.class).get(0);
		usuario.setPassword(encriptador.desencriptar(usuario.getPassword()));
		return usuario;

	}
	
}
