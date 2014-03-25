package ee.ut.math.vl.data;


public class Kasutaja {
	
	public String id;
    public String nimi;
    public boolean admin;
    
    
    public Kasutaja() {
    }

    public Kasutaja(String id, String nimi, boolean admin) {
    	this.id = id;
    	this.nimi = nimi;
    	this.admin = admin;
    	
    }
}
