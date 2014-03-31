package ee.ut.math.vl.data;
import java.awt.Image;
import java.util.Date;

public class Artikkel {

    public Integer id;
    public String autor;
    public String pealkiri;
    public Image pilt;
    public String kirjeldus;
    public String uudis;
    public String teema;
    public Integer vaatamisi;
    public Date lisatud;
 
    
	
     

    public Artikkel () {
    }

    public Artikkel (Integer id, String autor, String pealkiri,Image pilt, String kirjeldus, String uudis,
    		String teema, Integer vaatamisi, Date lisatud) {
        this.id = id;
        this.autor = autor;
        this.pealkiri = pealkiri;
        this.pilt = pilt;
        this.kirjeldus = kirjeldus;
        this.uudis = uudis;
        this.teema = teema;
        this.vaatamisi = vaatamisi;
        this.lisatud = lisatud;
    }

}
