package com.domain.core.document;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

public class Notificacion {
	
	@Id
	private String id = new ObjectId().toString();
	
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	private Date fecha = new Date();
	
	private String temperatura, turbidez, conductividad, fechaMuestra, estadoBateria, idSonda, vuTemp, vuTurb, vuCond, idLocalizacion;
	
	private Boolean bateria = false;
	
	private Boolean importante = false;
	
	public String getIdLocalizacion() {
		return idLocalizacion;
	}

	public void setIdLocalizacion(String idLocalizacion) {
		this.idLocalizacion = idLocalizacion;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getFechaMuestra() {
		return fechaMuestra;
	}

	public void setFechaMuestra(String fechaMuestra) {
		this.fechaMuestra = fechaMuestra;
	}

	public String getEstadoBateria() {
		return estadoBateria;
	}

	public void setEstadoBateria(String estadoBateria) {
		this.estadoBateria = estadoBateria;
	}

	public String getIdSonda() {
		return idSonda;
	}

	public void setIdSonda(String idSonda) {
		this.idSonda = idSonda;
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

	public Boolean getBateria() {
		return bateria;
	}

	public void setBateria(Boolean bateria) {
		this.bateria = bateria;
	}

	public Boolean getImportante() {
		return importante;
	}

	public void setImportante(Boolean importante) {
		this.importante = importante;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	private String titulo,descripcion;
	

	public Notificacion() {
		
	}

	public Notificacion(String titulo, String descripcion) {
		this.titulo = titulo;
		this.descripcion = descripcion;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	

}
