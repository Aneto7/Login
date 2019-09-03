/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.alianz.login.servlet;

import br.com.alianz.file.conexao.ConexaoMySQL;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.JOptionPane;

/**
 *
 * @author Antonio
 */
public class ServletGravarUsuario extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        StringBuilder sb = new StringBuilder();
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String usuario = request.getParameter("idusuario");
        int id = 0;
        String nome = "";
        String perfil = "";
        String empresa = "";
        String setor = "";
        String inicio = "";
        String file = "";
        String dashboard = "";
        String cliente = "";
        String servico = "";
        String fornecedor = "";
        String recibo = "";
        String fatura = "";
        String fechamento = "";
        String usuarios = "";
        int idempcliente = 0;
        String cnpjempcliente = "";
        int logoempcliente = 0;
        String senha = request.getParameter("idsenha");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = ConexaoMySQL.getConexaoMySQL();
            java.sql.Statement st = con.createStatement();

            st.executeQuery("SELECT * FROM `usuario` WHERE "
                    + "`USUARIO` LIKE '" + usuario
                    + "' AND `SENHA` LIKE '" + senha
                    + "'");
            ResultSet rs = st.getResultSet();
            if (rs.first() == false) {
                id = 0;
                usuario = "null";
                nome = "null";
                perfil = "null";
                empresa = "null";
                setor = "null";
                inicio = "null";
                file = "null";
                dashboard = "null";
                cliente = "null";
                servico = "null";
                fornecedor = "null";
                recibo = "null";
                fatura = "null";
                fechamento = "null";
                usuarios = "null";
                idempcliente = 0;
                cnpjempcliente = "";
                logoempcliente = 0;
            } else {
                id = rs.getInt("ID");
                usuario = rs.getString("USUARIO");
                nome = rs.getString("NOME");
                perfil = rs.getString("PERFIL");
                empresa = rs.getString("EMPRESA");
                setor = rs.getString("SETOR");
                inicio = rs.getString("INICIO");
                file = rs.getString("FILE");
                dashboard = rs.getString("DASHBOARD");
                cliente = rs.getString("CLIENTE");
                servico = rs.getString("SERVICO");
                fornecedor = rs.getString("FORNECEDOR");
                recibo = rs.getString("RECIBO");
                fatura = rs.getString("FATURA");
                fechamento = rs.getString("FECHAMENTO");
                usuarios = rs.getString("USUARIOS");
                idempcliente = rs.getInt("IDEMPCLIENTE");
                cnpjempcliente = rs.getString("CNPJEMPCLIENTE");
                logoempcliente = rs.getInt("LOGOEMPCLIENTE");
            }
            HttpSession session = request.getSession();
            session.setMaxInactiveInterval(30*60);
            
            session.setAttribute("idlog", id);
            session.setAttribute("usuariolog", usuario);
            session.setAttribute("nomelog", nome);
            session.setAttribute("perfillog", perfil);
            session.setAttribute("empresalog", empresa);
            session.setAttribute("setorlog", setor);
            session.setAttribute("iniciolog", inicio);
            session.setAttribute("filelog", file);
            session.setAttribute("dashboardlog", dashboard);
            session.setAttribute("clientelog", cliente);
            session.setAttribute("servicolog", servico);
            session.setAttribute("fornecedorlog", fornecedor);
            session.setAttribute("recibolog", recibo);
            session.setAttribute("faturalog", fatura);
            session.setAttribute("fechamentolog", fechamento);
            session.setAttribute("usuarioslog", usuarios);
            session.setAttribute("idempclientelog", idempcliente);
            session.setAttribute("cnpjempclientelog", cnpjempcliente);
            session.setAttribute("logoempclientelog", logoempcliente);
            sb.append(usuario + "%" + nome + "%" + perfil + "%" + empresa + "%" + setor + "%" + inicio + "%" + file + "%" + dashboard
                    + "%" + cliente + "%" + servico + "%" + fornecedor + "%" + recibo + "%" + fatura + "%" + fechamento + "%" + usuarios + ";");
            out.write(sb.toString());

            ConexaoMySQL.FecharConexao();
        } catch (SQLException | ClassNotFoundException e) {
            JOptionPane.showMessageDialog(null, e);
            ConexaoMySQL.FecharConexao();
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
