package ee.ut.math.vl;

import java.awt.Image;
import java.util.Date;

public class Artiklid {

    public Integer id;
    public String autor;
    public String pealkiri;
    public Image pilt;
    public String kirjeldus;
    public String artikkel;
    public String teema;
    public long vaatamisi;
    public Date lisatud;
 
    
	
     

    public Artiklid () {
    }

    public Artiklid (Integer id, String autor, String pealkiri,Image pilt, String kirjeldus, String artikkel,
    		String teema, long vaatamisi, Date lisatud) {
        this.id = id;
        this.autor = autor;
        this.pealkiri = pealkiri;
        this.pilt = pilt;
        this.kirjeldus = kirjeldus;
        this.artikkel = artikkel;
        this.teema = teema;
        this.vaatamisi = vaatamisi;
        this.lisatud = lisatud;
    }

}
