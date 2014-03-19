package ee.ut.math.vl;

import java.util.Date;

public class Kommentaarid {
	
	public Integer id;
	public Integer artikkel;
    public String autor;
    public String kommentaar;
    public Date aeg;
    
    
    public Kommentaarid () {
    }

    public Kommentaarid (Integer id, Integer artikkel, String autor, String kommentaar, Date aeg) {
    	this.id = id;
    	this.artikkel = artikkel;
    	this.autor = autor;
    	this.kommentaar = kommentaar;
    	this.aeg = aeg;
    }

	
	

}
