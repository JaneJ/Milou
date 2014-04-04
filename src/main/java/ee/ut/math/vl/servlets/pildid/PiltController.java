package ee.ut.math.vl.servlets.pildid;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;





import ee.ut.math.vl.data.Pilt;
import ee.ut.math.vl.datastore.pilt.PiltData;
import ee.ut.math.vl.datastore.pilt.PiltDataProvider;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.SQLException;

@WebServlet(value = "/pilt")
public class PiltController extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Gson gson;
	private PiltDataProvider datastore;

	@Override
	public void init() throws ServletException {
		super.init();
		gson = new Gson();
		datastore = new PiltData();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setHeader("Content-Type", "application/json");

		String idArtikkel = req.getParameter("pilt");   //ma ei tea kas see on õige
		
		try {
			Pilt pilt = datastore.findPiltById(1);   //pane tähele et nr 1 asemel peab midagi olema
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}    


	}

	private void replyPilt(HttpServletResponse resp,
			String idString) throws SQLException, Exception {	
		
		try {
		
			resp.getOutputStream().write(null);           // annab baidivoo
		} catch (IOException e) {
			
			e.printStackTrace();
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
	
		
		
		
		
		
			
			
		// järgnevad näited selle kohta kuidas image fail lahti võtta
			
		
			// <input type="text" name="title" />
	//        String title = req.getParameter("title");
	       
	        // @MultipartConfig
	        // <form ... enctype="mingi data asi">     - form peab ka teadama, et faile saab saata
	        // <input type="file" name="mingipilt" />
	//        String fileName = req.getPart("mingipilt").getName();
			
			
			Pilt pilt = gson.fromJson(req.getReader(), Pilt.class);
			

			// echo the same object back for convenience and debugging
			// also it now contains the generated id of the bid
			String artikkelEcho = gson.toJson(pilt);
			resp.setHeader("Content-Type", "application/json");
			resp.getWriter().write(artikkelEcho);

			// actually this is a bad place to send the broadcast.
			// better: attach sockets as eventlisteners to the datastore
			// even better: use message queues for servlet-datastore events

			PiltSocketController.find(req.getServletContext()).broadcast(
					artikkelEcho);

	
	}


}
