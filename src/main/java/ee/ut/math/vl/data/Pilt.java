package ee.ut.math.vl.data;

public class Pilt {
	
	public Integer id;
	public Integer artikkel;
    public byte[] piltBaidis;
    public String nimi;
    public String tyyp;
	
	
	 public Pilt(Integer id, Integer artikkel, byte[] piltBaidis, String nimi, String tyyp) {

		this.id = id;
		this.artikkel = artikkel;
		this.piltBaidis = piltBaidis;
		this.nimi = nimi;
		this.tyyp = tyyp;
		
	}


	public Pilt () {
	    }
	    

}
