package ee.ut.math.vl.data;


public class Kasutaja {
	
	public long id;
    public String nimi;
    public String username;
    public boolean admin;
    
    
    public Kasutaja() {
    }

    public Kasutaja(int id, String nimi, String username, boolean admin) {
    	this.id = id;
    	this.nimi = nimi;
    	this.username = username;
    	this.admin = admin;
    	
    }
}
