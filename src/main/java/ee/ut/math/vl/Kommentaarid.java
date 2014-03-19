package ee.ut.math.vl;

import java.util.Date;

public class Kommentaarid {
	
	public Integer Id;
	public Integer Artikkel;
    public String Autor;
    public String Kommentaar;
    public Date Aeg;
    
    
    public Kommentaarid () {
    }

    public Kommentaarid (Integer Id, Integer Artikkel, String Autor, String Kommentaar, Date Aeg) {
    	this.Id = Id;
    	this.Artikkel = Artikkel;
    	this.Autor = Autor;
    	this.Kommentaar = Kommentaar;
    	this.Aeg = Aeg;
    }

	
	

}
