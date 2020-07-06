package com.domain.core.controllers;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.core.repository.ServicioRep;
import com.mongodb.client.result.UpdateResult;
import com.domain.core.document.Location;
import com.domain.core.document.Notificacion;
import com.domain.core.document.Usuario;

@RestController /*La diferencia fundamental entre una aplicación web y una API REST es que la respuesta 
de una aplicación web es generalmente vista ( HTML + CSS + JavaScript ) porque están destinados a usuarios humanos mientras 
REST API solo devuelve datos en forma de JSON o XML porque la mayoría de los clientes REST son programas. 
Esta diferencia también es obvia en el @Controllery anotación @RestController.
El trabajo de @Controller es crear un Mapa del objeto modelo y encontrar una vista, 
pero @RestController simplemente devuelve el objeto y los datos del objeto se escriben directamente 
en la respuesta HTTP como JSON o XML*/

@RequestMapping("/api/v1")
@CrossOrigin()
public class AdminController {
	
	@Autowired
	private ServicioRep servicioRep;
	
	//METODOS LOCALIZACIONES------------------------------------------------------------------------
	
	@GetMapping("/list/") //TODAS LAS LOCALIZACIONES DE MONGO
	public List<Location> findAll(){
		return servicioRep.findAll();
	}
	
	@PostMapping("/list") //AGREGO LOCALIZACION NUEVA
	public Location save(@RequestBody Location location) {
		return servicioRep.save(location);
		
	}
	
	@GetMapping("/location/{idLocation}") //OBTENGO LOCALIZACION POR MEDIO DE ID
	public Location find(@PathVariable("idLocation") String idLocation) {
		return servicioRep.find(idLocation);
	}
	
	@GetMapping("/list/{searchLocation}") //BUSCADOR DE LOCALIZACIONES
	public List<Location> search(@PathVariable("searchLocation") String searchLocation) {
		return servicioRep.search(searchLocation);
	}
	
	@PutMapping("/location/update/{idLocation}") //ACTUALIZACION DE LOCALIZACIONES
    public Location updateLoc(@RequestBody Location location, @PathVariable String idLocation) {
        location.setId(idLocation);
        servicioRep.update(location);
        return location;
    }
	
	@DeleteMapping("location/delete/{idLocation}") //ELIMINACIÓN DE LOCALIZACIONES
    public String deleteDept(@PathVariable String idLocation) {
		servicioRep.deleteById(idLocation);
        return idLocation;
    }
	
	@PostMapping("/list/{idLocation}/addNotificacion") //AGREGO UNA NOTIFICACION NUEVA
	public UpdateResult addNotificacion(@PathVariable("idLocation") String idLocation,@RequestBody Notificacion notificacion) {
		return servicioRep.addNotificacion(idLocation,notificacion);
	}
	
	@PutMapping("/list/{idLocation}/deleteNotificacion/{idNotificacion}") //ELIMINO UNA NOTIFICACION
    public Location deleteNotificacion(@PathVariable("idLocation") String idLocation, @PathVariable("idNotificacion") String idNotificacion, @RequestBody Location location) {
		location.setId(idLocation);
		servicioRep.deleteNotificacion(idNotificacion,location);
        return location;
    }
	
	@PutMapping("/location/obs/{idLocation}") //OBSERVAR LOCALIZACIONES
    public Location updateLocationObs(@RequestBody Location location, @PathVariable String idLocation) {
		location.setId(idLocation);
		servicioRep.updateLocationObs(location);
        return location;
    }
	
	@PutMapping("/list/{idLocation}/deleteSonda/{idSonda}") //ELIMINO UNA SONDA
    public Location deleteSonda(@PathVariable("idLocation") String idLocation, @PathVariable("idSonda") String idSonda, @RequestBody Location location) {
		location.setId(idLocation);
		servicioRep.deleteSonda(idSonda,location);
        return location;
    }
	//METODOS USUARIOS------------------------------------------------------------------------
	
	@PostMapping("/usuario/registrar/") //AGREGO USUARIO NUEVO
	public Usuario saveUser(@RequestBody Usuario usuario) throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException{
		return servicioRep.saveUser(usuario); //devuelvo metodo de repositorio
		
	}
	
	@PutMapping("/usuario/update/{idUsuario}") //ACTUALIZACION DE USUARIO
    public Usuario updateUser(@RequestBody Usuario usuario, @PathVariable String idUsuario) throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {
		usuario.setId(idUsuario);
		servicioRep.updateUser(usuario);
        return usuario;
    }
	
	@DeleteMapping("usuario/delete/{idUsuario}") //ELIMINACION DE USUARIO
    public String deleteUser(@PathVariable String idUsuario) {
		servicioRep.deleteByIdUser(idUsuario);
        return idUsuario;
    }
	
	@GetMapping("/list-user/") //OBTENGO TODOS LOS USUARIOS
	public List<Usuario> findAllUser() throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException{
		return servicioRep.findAllUser();
	}
	
	@GetMapping("/usuario/{idUser}") //OBTENGO USUARIO A TRAVES DE ID
	public Usuario findUser(@PathVariable("idUser") String idUser) throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {
		return servicioRep.findUser(idUser);
	}
	
	
	

}
