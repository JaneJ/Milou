package ee.ut.math.vl.data;
import java.util.Date;

public class Artikkel {

    public Integer id;
    public String autor;
    public String pealkiri;
    public String pilt;
    public String kirjeldus;
    public String uudis;
    public String teema;
    public Integer vaatamisi;
    public Date lisatud;
 
    
	
     

    public Artikkel () {
    }
    
    
    public Artikkel (String autor, String pealkiri,String pilt, String uudis,
    		String teema, Date lisatud, Integer vaatamisi) {
        this.autor = autor;
        this.pealkiri = pealkiri;
        this.pilt = pilt;
        this.uudis = uudis;
        this.teema = teema;
        this.lisatud = lisatud;
        this.vaatamisi=10; //lisasin katsetamiseks
    }
    
    
    public Artikkel (String autor, String pealkiri, String pilt, String kirjeldus, 
    		String teema, Integer vaatamisi, Date lisatud) {
        this.autor = autor;
        this.pealkiri = pealkiri;
        this.pilt = pilt;
        this.kirjeldus = kirjeldus;
        this.teema = teema;
        this.vaatamisi = vaatamisi;
        this.lisatud = lisatud;
    }

    public Artikkel (Integer id, String autor, String pealkiri,String pilt, String kirjeldus, String uudis,
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
