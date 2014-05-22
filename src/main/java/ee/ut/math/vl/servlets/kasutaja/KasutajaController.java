package ee.ut.math.vl.servlets.kasutaja;

import com.google.gson.Gson;

import ee.ut.math.vl.data.Kasutaja;
import ee.ut.math.vl.datastore.kasutaja.KasutajaData;
import ee.ut.math.vl.datastore.kasutaja.KasutajaDataProvider;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet(value = "/kasutaja")
public class KasutajaController extends HttpServlet {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private Gson gson;
    private KasutajaDataProvider datastore;

    @Override
    public void init() throws ServletException {
        super.init();
        gson = new Gson();
        datastore = new KasutajaData();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json; charset=UTF-8");
       


        String idString = req.getParameter("id");
        
        try {

			if (idString != null) {
				replyWithKasutaja(resp, idString);
			
		} 
			}catch (Exception e) {
			throw new RuntimeException(e);
		}
        }
        
       

    private void  replyWithKasutaja(HttpServletResponse resp,
                                         String idString) throws SQLException, Exception {
        long id = Long.parseLong(idString);


        Kasutaja kasutaja = datastore.findKasutajaById(id);
        resp.getWriter().write(gson.toJson(kasutaja));
            
    
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

    }


}
