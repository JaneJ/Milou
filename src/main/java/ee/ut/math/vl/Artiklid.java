package ee.ut.math.vl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Artiklid {
	
	@Id
	@GeneratedValue
	private long Id;
	
	@Column(name = "Autor")
	private String Autor;
	
	@Column(name = "Pealkiri")
	private String Pealkiri;
	
	
	//pilt
	
	//lühikirjeldus
	
	//private String Artikkel;
	
	//Lisatud 
	
	
	@Column(name = "Teema")
	private String Teema;
	
	@Column(name = "Vaatamisi")
	private long Vaatamisi;
	
	
	
	public long getId() {
		return Id;
	}
	public void setId(long id) {
		Id = id;
	}
	public String getAutor() {
		return Autor;
	}
	public void setAutor(String autor) {
		Autor = autor;
	}
	public String getPealkiri() {
		return Pealkiri;
	}
	public void setPealkiri(String pealkiri) {
		Pealkiri = pealkiri;
	}
	public String getTeema() {
		return Teema;
	}
	public void setTeema(String teema) {
		Teema = teema;
	}
	public long getVaatamisi() {
		return Vaatamisi;
	}
	public void setVaatamisi(long vaatamisi) {
		Vaatamisi = vaatamisi;
	}


}
