package com.domain.core.document;


public class Sonda {
	
	private String id, temperatura, turbidez, conductividad, fechaMuestra, estadoBateria, idNodo;
	
	private String historico[][] = new String[5][5];
	
	public Sonda() {
		
	}

	public String[][] getHistorico() {
		return historico;
	}

	public void setHistorico(String[][] historico) {
		this.historico = historico;
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

	public String getIdNodo() {
		return idNodo;
	}

	public void setIdNodo(String idNodo) {
		this.idNodo = idNodo;
	}

}
