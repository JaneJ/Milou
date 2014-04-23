package ee.ut.math.vl.servlets.artikkel;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;

import ee.ut.math.vl.data.Artikkel;
import ee.ut.math.vl.data.Pilt;
import ee.ut.math.vl.datastore.artikkel.ArtikkelData;
import ee.ut.math.vl.datastore.artikkel.ArtikkelDataProvider;
import ee.ut.math.vl.datastore.pilt.PiltData;
import ee.ut.math.vl.datastore.pilt.PiltDataProvider;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet(value = "/artiklid")
public class ArtikkelController extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Gson gson;
	private ArtikkelDataProvider articles;
    private PiltDataProvider pictures;

	@Override
	public void init() throws ServletException {
		super.init();
		gson = new Gson();
        articles = new ArtikkelData();
        pictures = new PiltData();

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
				replyWithSingleArtikkel(resp, idString);
			}  catch (Exception ex) { throw new RuntimeException(ex); }
			
		}
		else {resp.sendError(HttpServletResponse.SC_BAD_REQUEST); }
	}

	private void replyWithSingleArtikkel(HttpServletResponse resp,
			String idString) throws SQLException, Exception {
		int id = Integer.parseInt(idString);
		
		
		//pildi servletist
		//resp.getOutputStream().write(null);

		
		Artikkel artikkel = articles.findArtikkelById(id);
		try {
			resp.getWriter().write(gson.toJson(artikkel));
		
		
		}

			catch (Exception ex) {
				throw new RuntimeException(ex); }

	}
	

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		try {
			
			
			//Siia ka see conntectioni teema
			
			//Pildi osa
			//pildid peaksid andmebaasis olema unikaalse nimega, kui klient peaks küsima (ehk responce pildinime kaudu)
			InputStream pildistream = req.getPart("pilt").getInputStream();
			String nimi = req.getPart("pilt").getName();
           // String tyyp = req.getPart("pilt").getArtikkel();    ** ma ei tea kuidas selle peaks kätte saama




//*** kas see osa peaks mujal olema
            byte[] pildibaidid;
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();

            int read;
            byte[] data = new byte[16384];

            while ((read = pildistream.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, read);
            }

            pildibaidid = buffer.toByteArray();

 ////


            Pilt pilt = new Pilt("artikkel", pildibaidid, nimi);
            pictures.lisaPilt();



            Artikkel artikkel = gson.fromJson(req.getReader(), Artikkel.class);
			articles.lisaArtikkel(artikkel);

			
			
			String artikkelEcho = gson.toJson(artikkel);
			resp.setHeader("Content-Type", "application/json");
			resp.getWriter().write(artikkelEcho);

							

			ArtikkelSocketController.find(req.getServletContext()).broadcast(
					artikkelEcho);

		} catch (Exception ex) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
		}
	}


}
