package ee.ut.math.vl.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;

import ee.ut.math.vl.data.Artikkel;
import ee.ut.math.vl.datastore.artikkel.ArtikkelData;
import ee.ut.math.vl.datastore.artikkel.ArtikkelDataProvider;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@WebServlet(value = "/commented")
public class TopCommentController extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Gson gson;
	private ArtikkelDataProvider datastore;

	@Override
	public void init() throws ServletException {
		super.init();
		gson = new Gson();
		datastore = new ArtikkelData();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");
	
		try {
			replyCommented(resp);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
			
	}

	private void replyCommented(HttpServletResponse resp
			) throws SQLException, Exception {
		
		
		List<Artikkel> artiklid = datastore.findCommentedArtiklit();
		resp.getWriter().write(gson.toJson(artiklid));

	}
}