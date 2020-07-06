package com.domain.core.document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

@Document(collection = "Location") //MAPEO LA COLECCION CON ESTE MODELO
public class Location {

	@Id
	private String id = new ObjectId().toString();

	private String nombre, municipio,temperatura, turbidez, conductividad, fechaMuestra, estadoBateria, idNodo, idSonda, vuTemp, vuTurb, vuCond;
	
	private String telefono = "No asignado";
	private String descripcion = "No asignado";
	private String lat = "No asignado";
	private String lon = "No asignado";
	private String idSensores = "No asignado";
	public String getMunicipio() {
		return municipio;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public void setMunicipio(String municipio) {
		this.municipio = municipio;
	}

	private String imagen = "/assets/img/localizacion_background.jpg";
	
	public String getImagen() {
		return imagen;
	}

	public String getIdNodo() {
		return idNodo;
	}

	public void setIdNodo(String idNodo) {
		this.idNodo = idNodo;
	}

	public String getIdSonda() {
		return idSonda;
	}

	public void setIdSonda(String idSonda) {
		this.idSonda = idSonda;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	private Boolean observable = false;
	
	private Boolean marcaNotificación = false;

	public Boolean getMarcaNotificación() {
		return marcaNotificación;
	}

	public void setMarcaNotificación(Boolean marcaNotificación) {
		this.marcaNotificación = marcaNotificación;
	}

	public Boolean getObservable() {
		return observable;
	}

	public void setObservable(Boolean observable) {
		this.observable = observable;
	}

	public String getIdSensores() {
		return idSensores;
	}

	public String getVuTemp() {
		return vuTemp;
	}

	public void setVuTemp(String vuTemp) {
		this.vuTemp = vuTemp;
	}

	public String getVuTurb() {
		return vuTurb;
	}

	public void setVuTurb(String vuTurb) {
		this.vuTurb = vuTurb;
	}

	public String getVuCond() {
		return vuCond;
	}

	public void setVuCond(String vuCond) {
		this.vuCond = vuCond;
	}

	public void setIdSensores(String idSensores) {
		this.idSensores = idSensores;
	}

	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	private Date fecha = new Date();
	
	public List<Sonda> getSondas() {
		return sondas;
	}

	public void setSondas(List<Sonda> sondas) {
		this.sondas = sondas;
	}

	private String matriz[][] = new String[5][5];
	
	private List<Notificacion> notificaciones = new ArrayList<Notificacion>(); 
	
	private List<Sonda> sondas = new ArrayList<Sonda>(); 
	

	public String getFechaMuestra() {
		return fechaMuestra;
	}

	public void setFechaMuestra(String fechaMuestra) {
		this.fechaMuestra = fechaMuestra;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLat() {
		return lat;
	}

	public Location() {

	}

	public Location(String id, String nombre, String descripcion, String lat ,String lon, Date fecha, String temperatura, String turbidez, String conductividad, String fechaMuestra, String estadoBateria, String vutemp, String vuturb, String vucond, String id_sensor) {
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.lat = lat;
		this.lon = lon;
		this.fecha = fecha;
		this.temperatura = temperatura;
		this.turbidez = turbidez;
		this.conductividad = conductividad;
		this.fechaMuestra= fechaMuestra; 
		this.estadoBateria = estadoBateria;
		this.idSensores = id_sensor;
		this.vuTemp = vutemp;
		this.vuTurb = vuturb;
		this.vuCond = vucond;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getTemperatura() {
		return temperatura;
	}

	public void setTemperatura(String temperatura) {
		this.temperatura = temperatura;
	}

	public String getTurbidez() {
		return turbidez;
	}

	public void setTurbidez(String turbidez) {
		this.turbidez = turbidez;
	}

	public String getConductividad() {
		return conductividad;
	}

	public void setConductividad(String conductividad) {
		this.conductividad = conductividad;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	public String[][] getMatriz() {
		return matriz;
	}

	public void setMatriz(String matriz[][]) {
		this.matriz = matriz;
	}

	public String getEstadoBateria() {
		return estadoBateria;
	}

	public void setEstadoBateria(String estadoBateria) {
		this.estadoBateria = estadoBateria;
	}

	public List<Notificacion> getNotificaciones() {
		return notificaciones;
	}

	public void setNotificaciones(List<Notificacion> notificaciones) {
		this.notificaciones = notificaciones;
	}
	
}
