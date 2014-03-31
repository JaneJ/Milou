package ee.ut.math.vl.data;


public class Kasutaja {
	
	public String id;
    public String nimi;
    public String token;
    public boolean admin;
    
    
    public Kasutaja() {
    }

    public Kasutaja(String id, String nimi, String token, boolean admin) {
    	this.id = id;
    	this.nimi = nimi;
    	this.token = token;
    	this.admin = admin;
    	
    }
}
