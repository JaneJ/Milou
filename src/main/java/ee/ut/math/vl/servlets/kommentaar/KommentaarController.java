package ee.ut.math.vl.servlets.kommentaar;

import com.google.gson.Gson;
import ee.ut.math.vl.data.Kommentaar;
import ee.ut.math.vl.datastore.kommentaar.KommentaarData;
import ee.ut.math.vl.datastore.kommentaar.KommentaarDataProvider;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;


@WebServlet(value = "/kommentaar")
public class KommentaarController extends HttpServlet {


    private static final long serialVersionUID = 1L;
    private Gson gson;
    private KommentaarDataProvider datastore;

    @Override
    public void init() throws ServletException {
        super.init();
        gson = new Gson();
        datastore = new KommentaarData();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
    	resp.setContentType("application/json; charset=UTF-8");
        
        Connection con = null ; //peab olema meetod, mis tekitab connectioneid (muide peabki olema väärtus null)
        //try sees open connection
        //finally : if con!=null close connection


        String idString = req.getParameter("id");
        if (idString != null) {
            try {

                replyWithKommentaarid(resp, idString);
            }  catch (Exception ex) { throw new RuntimeException(ex); }

        }
        else {resp.sendError(HttpServletResponse.SC_BAD_REQUEST); }
    }

    private void replyWithKommentaarid(HttpServletResponse resp,
                                         String idString) throws SQLException, Exception {
        int id = Integer.parseInt(idString);
	 //   resp.getWriter().write("id on "+id);


        List<Kommentaar> kommentaar = datastore.findKommentaarByArtikkel(id);
            try {
            resp.getWriter().write(gson.toJson(kommentaar));

        }

        catch (Exception ex) { throw new RuntimeException(ex); }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        try {



            Kommentaar kommentaar = gson.fromJson(req.getReader(), Kommentaar.class);
            datastore.lisaKommentaar(kommentaar);
            resp.getWriter().write("{}");


/*
            String kommentaarEcho = gson.toJson(kommentaar);
            resp.setHeader("Content-Type", "application/json");
            resp.getWriter().write(kommentaarEcho);
*/

        } catch (Exception ex) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
        }
    }


}
