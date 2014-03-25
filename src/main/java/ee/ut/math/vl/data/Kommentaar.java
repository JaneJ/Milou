package ee.ut.math.vl.data;

import java.util.Date;

public class Kommentaar {
	
	public Integer id;
	public Integer artikkel;
    public String autor;
    public String kommentaar;
    public Date aeg;
    
    
    public Kommentaar () {
    }

    public Kommentaar (Integer id, Integer artikkel, String autor, String kommentaar, Date aeg) {
    	this.id = id;
    	this.artikkel = artikkel;
    	this.autor = autor;
    	this.kommentaar = kommentaar;
    	this.aeg = aeg;
    }

	
	

}
