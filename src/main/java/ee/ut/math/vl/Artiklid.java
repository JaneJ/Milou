package ee.ut.math.vl;

import java.awt.Image;
import java.util.Date;

public class Artiklid {

    public Integer Id;
    public String Autor;
    public String Pealkiri;
    public Image Pilt;
    public String Lühikirjeldus;
    public String Artikkel;
    public String Teema;
    public long Vaatamisi;
    public Date Lisatud;
 
    
	
     

    public Artiklid () {
    }

    public Artiklid (Integer Id, String Autor, String Pealkiri,Image Pilt, String Lühikirjeldus, String Artikkel,
    		String Teema, long Vaatamisi, Date Lisatud) {
        this.Id = Id;
        this.Autor = Autor;
        this.Pealkiri = Pealkiri;
        this.Pilt = Pilt;
        this.Lühikirjeldus = Lühikirjeldus;
        this.Artikkel = Artikkel;
        this.Teema = Teema;
        this.Vaatamisi = Vaatamisi;
        this.Lisatud = Lisatud;
    }

}
