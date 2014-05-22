package ee.ut.math.vl.servlets.kasutaja;

import com.google.gson.Gson;
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
        Connection con = null ; 


        String idString = req.getParameter("id");
        if (idString != null) {
            try {
                if(replyWithKasutajaBoolean(resp, idString)==true){
                    replyWithKasutajaBoolean(resp, idString);
                }
            }  catch (Exception ex) { throw new RuntimeException(ex); }

        }
        else {resp.sendError(HttpServletResponse.SC_BAD_REQUEST); }
    }

    private boolean replyWithKasutajaBoolean(HttpServletResponse resp,
                                         String idString) throws SQLException, Exception {
        int id = Integer.parseInt(idString);


        boolean kasutaja = datastore.findKasutajaById(id);
        if (kasutaja==true){
            try {
                resp.getWriter().write(gson.toJson(kasutaja));
            }

            catch (Exception ex) {
                throw new RuntimeException(ex); }

        } else{
            resp.getWriter().write(gson.toJson(false));
        }

            return true;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

    }


}
