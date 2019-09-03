<!DOCTYPE html>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.sql.*;" %>
<%@page import="javax.servlet.*;" %>
<html>

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <title>Alianz - Sistema Receptivo</title>
        <!-- Favicon-->
        <link rel="icon" href="../favicon.ico" type="image/x-icon">

        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

        <!-- Bootstrap Core Css -->
        <link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

        <!-- Waves Effect Css -->
        <link href="../plugins/node-waves/waves.css" rel="stylesheet" />

        <!-- Animation Css -->
        <link href="../plugins/animate-css/animate.css" rel="stylesheet" />

        <!-- JQuery DataTable Css -->
        <link href="../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">

        <!-- Colorpicker Css -->
        <link href="../plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.css" rel="stylesheet" />

        <!-- Dropzone Css -->
        <link href="../plugins/dropzone/dropzone.css" rel="stylesheet">

        <!-- Multi Select Css -->
        <link href="../plugins/multi-select/css/multi-select.css" rel="stylesheet">

        <!-- Bootstrap Spinner Css -->
        <link href="../plugins/jquery-spinner/css/bootstrap-spinner.css" rel="stylesheet">

        <!-- Bootstrap Tagsinput Css -->
        <link href="../plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet">

        <!-- Bootstrap Material Datetime Picker Css -->
        <link href="../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />

        <!-- Wait Me Css -->
        <link href="../plugins/waitme/waitMe.css" rel="stylesheet" />

        <!-- Bootstrap Select Css -->
        <link href="../plugins/bootstrap-select/css/bootstrap-select.css" rel="stylesheet" />

        <!-- noUISlider Css -->
        <link href="../plugins/nouislider/nouislider.min.css" rel="stylesheet" />

        <!-- Morris Chart Css-->
        <link href="../plugins/morrisjs/morris.css" rel="stylesheet" />

        <!-- Custom Css -->
        <link href="../css/style.css" rel="stylesheet">

        <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
        <link href="../css/themes/all-themes.css" rel="stylesheet" />
    </head>

    <body class="theme-blue-grey">
        <!-- Page Loader -->
        <div class="page-loader-wrapper">
            <div class="loader">
                <div class="preloader">
                    <div class="spinner-layer pl-red">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
                <%
                String ativo = "";
                    if(session.getAttribute("idlog") == null){
                        response.sendRedirect("../index.jsp");
                    } else {
                    
                    int idlog = (Integer) session.getAttribute("idlog");
                    String usuariolog = (String) session.getAttribute("usuariolog");
                    String nomelog = (String) session.getAttribute("nomelog");
                    String perfillog = (String) session.getAttribute("perfillog");
                    String empresalog = (String) session.getAttribute("empresalog");
                    String setorlog = (String) session.getAttribute("setorlog");
                    String iniciolog = (String) session.getAttribute("iniciolog");
                    String filelog = (String) session.getAttribute("filelog");
                    String dashboardlog = (String) session.getAttribute("dashboardlog");
                    String clientelog = (String) session.getAttribute("clientelog");
                    String servicolog = (String) session.getAttribute("servicolog");
                    String fornecedorlog = (String) session.getAttribute("fornecedorlog");
                    String recibolog = (String) session.getAttribute("recibolog");
                    String faturalog = (String) session.getAttribute("faturalog");
                    String fechamentolog = (String) session.getAttribute("fechamentolog");
                    String usuarioslog = (String) session.getAttribute("usuarioslog");
                    if (iniciolog.equals("false")){
                        response.sendRedirect("../pages/inicio.jsp");
                    }
                %>
                <p><%=nomelog%></p>
                <p>Por favor aguarde...</p>
            </div>
        </div>
        <!-- #END# Page Loader -->
        <!-- Overlay For Sidebars -->
        <div class="overlay"></div>
        <!-- #END# Overlay For Sidebars -->
        <!-- Top Bar -->
        <nav class="navbar">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                    <a href="javascript:void(0);" class="bars"></a>
                    <a class="navbar-brand" href="../pages/inicio.jsp">ALIANZ - Sistema Receptivo</a>
                </div>
            </div>
        </nav>
        <!-- #Top Bar -->
        <section>
            <!-- Left Sidebar -->
            <aside id="leftsidebar" class="sidebar">
                <!-- User Info -->
                <div class="user-info">
                    <div class="image">
                        <img src="../images/image001.png" width="48" height="48" alt="User" />
                    </div>
                    <div class="info-container">
                        <div class="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><%=nomelog%></div>
                        <div class="email"> <%=usuariolog%></div>
                        <div class="btn-group user-helper-dropdown">
                            <i class="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>
                            <ul class="dropdown-menu pull-right">
                                <li id="logout" name="logout"><a href="logout.jsp"><i class="material-icons">input</i>Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- #User Info -->
                <!-- Menu -->
                <div class="menu">
                    <ul class="list">
                        <li class="header">MENU PRINCIPAL</li>
                        <li class="active">
                            <a href="../pages/inicio.jsp">
                                <i class="material-icons">home</i>
                                <span>Início</span>
                            </a>
                        </li>
                        <%if (filelog.equals("false")){%>
                        <li <%=" hidden"%>>
                            <%}%>
                            <a href="javascript:void(0);" class="menu-toggle">
                                <i class="material-icons">folder</i>
                                <span>File</span>
                            </a>
                            <ul class="ml-menu">
                                <%if (filelog.equals("false")){%>
                                <li<%=" hidden"%>>
                                    <%}%>
                                    <a href="../pages/fileinserir.jsp">Inserir</a>
                                </li>
                                <%if (filelog.equals("false")){%>
                                <li<%=" hidden"%>>
                                    <%}%>
                                    <a href="../pages/filebuscar.jsp">Buscar</a>
                                </li>
                                <%if (filelog.equals("false")){%>
                                <li<%=" hidden"%>>
                                    <%}%>
                                    <a href="../pages/file.jsp">Lançamentos</a>
                                </li>
                            </ul>
                        </li>
                        <%if (dashboardlog.equals("false")){%>
                        <li<%=" hidden"%>>
                            <%}%>
                            <a href="../pages/dashboard.jsp">
                                <i class="material-icons">show_chart</i>
                                <span>Relatórios</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" class="menu-toggle">
                                <i class="material-icons">assignment</i>
                                <span>Cadastro</span>
                            </a>
                            <ul class="ml-menu">
                                <%if (clientelog.equals("false")){%>
                                <li<%=" hidden"%>>
                                    <%}%>
                                    <a href="../pages/cliente.jsp">Cliente</a>
                                </li>
                                <%if (servicolog.equals("false")){%>
                                <li<%=" hidden"%>>
                                    <%}%>
                                    <a href="../pages/servicos.jsp">Serviços</a>
                                </li>
                                <%if (fornecedorlog.equals("false")){%>
                                <li<%=" hidden"%>>
                                    <%}%>
                                    <a href="../pages/fornecedores.jsp">Fornecedores</a>
                                </li>
                                <%if (!perfillog.equals("Administrador")){%>
                                <li<%=" hidden"%>>
                                    <%}%>
                                    <a href="../pages/noticias.jsp">Notícias/Links</a>
                                </li>
                                <%if (filelog.equals("false")){%>
                                <li<%=" hidden"%>>
                                    <%}%>
                                    <a href="../pages/transfer.jsp">Transfer</a>
                                </li>
                            </ul>
                        </li>
                        <li hidden>
                            <a href="javascript:void(0);" class="menu-toggle">
                                <i class="material-icons">assignment_returned</i>
                                <span>Comprovante</span>
                            </a>
                            <ul class="ml-menu">
                                <%if (recibolog.equals("false")){%>
                                <li<%=" hidden"%>>
                                    <%}%>
                                    <a href="../pages/recibo.jsp">Recibo</a>
                                </li>
                                <%if (faturalog.equals("false")){%>
                                <li<%=" hidden"%>>
                                    <%}%>
                                    <a href="../pages/fatura.jsp">Fatura</a>
                                </li>
                            </ul>
                        </li>
                        <%if (fechamentolog.equals("false")){%>
                        <li<%=" hidden"%>>
                            <%}%>
                            <a href="../pages/fechamento.jsp">
                                <i class="material-icons">attach_money</i>
                                <span>Fechamento</span>
                            </a>
                        </li>
                        <%if (usuarioslog.equals("false")){%>
                        <li<%=" hidden"%>>
                            <%}%>
                            <a href="../pages/usuarios.jsp">
                                <i class="material-icons">people</i>
                                <span>Usuários</span>
                            </a>
                        </li>
                        <li hidden>
                            <a href="../pages/quadro.jsp">
                                <i class="material-icons">queue_play_next</i>
                                <span>Tela Operacional</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- #Menu -->
                <!-- Footer -->
                <div class="legal">
                    <div class="copyright">
                        &copy; 2017 <a href="https://www.linkedin.com/in/adm-antonioneto/">Antonio Neto</a>.
                    </div>
                    <div class="version">
                        <b>Version: </b> 2.1.0
                    </div>
                </div>
                <!-- #Footer -->
            </aside>
            <!-- #END# Left Sidebar -->
        </section>
        <section class="content">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <a href="../pages/fileinserir.jsp">
                                <div class="info-box-4 hover-zoom-effect">
                                    <div class="icon">
                                        <i class="material-icons col-light-blue">create_new_folder</i>
                                    </div>
                                    <div class="content">
                                        <div class="text">Novo File</div>
                                        <div class="number"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <a href="../pages/filebuscar.jsp">
                                <div class="info-box-4 hover-zoom-effect">
                                    <div class="icon">
                                        <i class="material-icons col-light-blue">search</i>
                                    </div>
                                    <div class="content">
                                        <div class="text">Buscar File</div>
                                        <div class="number"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <a href="../pages/dashboard.jsp">
                                <div class="info-box-4 hover-zoom-effect">
                                    <div class="icon">
                                        <i class="material-icons col-light-blue">multiline_chart</i>
                                    </div>
                                    <div class="content">
                                        <div class="text">Relatório</div>
                                        <div class="number"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <a id="link1" href="../pages/dashboard.jsp" target="_blank">
                            </a>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <a id="link2" href="../pages/dashboard.jsp" target="_blank">
                            </a>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <a id="link3" href="../pages/dashboard.jsp" target="_blank">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="card">
                                <div class="header">
                                    <h3 id="dolar" title="Cotação do Dólar Americano Hoje" name="dolar" class="align-center"></h3>
                                    <h2 id="cotdolar" title="Cotação do Dólar Americano Hoje" name="dolar" class="align-center"></h2>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="card">
                                <div class="header">
                                    <h3 id="dolart" title="Cotação do Dólar Americano Hoje" name="dolar" class="align-center"></h3>
                                    <h2 id="cotdolart" title="Cotação do Dólar Americano Hoje" name="dolar" class="align-center"></h2>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="card">
                                <div class="header">
                                    <h3 id="euro" title="Cotação do Dólar Americano Hoje" name="dolar" class="align-center"></h3>
                                    <h2 id="coteuro" title="Cotação do Dólar Americano Hoje" name="dolar" class="align-center"></h2>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="card">
                                <div class="header">
                                    <h3 id="cad" title="Cotação do Dólar Americano Hoje" name="dolar" class="align-center"></h3>
                                    <h2 id="cotcad" title="Cotação do Dólar Americano Hoje" name="dolar" class="align-center"></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" hidden>
                <div class="card">
                    <div class="header">
                        <h3>ÚLTIMAS NOTÍCIAS</h3>
                    </div>
                    <div class="header" id="noticia1">
                        <a href="" target="_blank">
                            <h2>Aguardando notícia</h2>
                        </a>
                    </div>
                    <div class="header" id="noticia2">
                        <a href="" target="_blank">
                            <h2>O que está acontecendo de interessante?</h2>
                        </a>
                    </div>
                    <div class="header" id="noticia3">
                        <a href="" target="_blank">
                            <h2>Cadastre uma notícia</h2>
                        </a>
                    </div>
                    <div class="header" id="noticia4">
                        <a href="" target="_blank">
                            <h2>Envie informações</h2>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid row clearfix" hidden>
            <form id="formservico" onsubmit="return false;">
                <div class="card">
                    <div class="row clearfix">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="col-md-12">    
                                <h5>Cadastro de Notícias</h5>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="form-line" >
                                        <input id="noticia" name="noticia" registro="" type="text" class="form-control" placeholder="Inserir título" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="form-line" >
                                        <input id="linkurl" name="linkurl" type="text" class="form-control" placeholder="Inserir o link" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <%if (!perfillog.equals("Administrador")){%>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" <%=" hidden"%>>
                            <%}%>
                            <div class="form-line form-inline align-center js-sweetalert" >
                                <button id="" type="submit" class="btn waves-effect bg-blue-grey" data-type="" onclick="inserirNoticia()">
                                    <i class="material-icons">save</i>
                                    <span>Inserir</span>
                                </button>
                                <button id="" type="button" class="btn waves-effect bg-blue-grey" data-type="" onclick="window.location.href = '../pages/noticias.jsp'">
                                    <i class="material-icons">assignment</i>
                                    <span>Cadastro</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="body">
                    <div class="table-responsive">
                        <table id="tabelainicio" name="tabelainicio" class="table table-bordered table-striped table-hover dataTable js-exportable nowrap">
                            <thead>
                                <tr class="bg-blue-grey">
                                    <th>File</th>
                                    <th>Data In</th>
                                    <th>Serviço</th>
                                    <th>Cliente</th>
                                    <th>Item</th>
                                    <th>Fornecedor</th>
                                    <th>Status</th>
                                    <th>Pendente</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr class="bg-blue-grey">
                                    <th>File</th>
                                    <th>Data In</th>
                                    <th>Serviço</th>
                                    <th>Cliente</th>
                                    <th>Item</th>
                                    <th>Fornecedor</th>
                                    <th>Status</th>
                                    <th>Pendente</th>
                                </tr>
                            </tfoot>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <%}%>
    </section>

    <!-- Jquery Core Js -->
    <script src="../plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="../plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Select Plugin Js -->
    <script src="../plugins/bootstrap-select/js/bootstrap-select.js"></script>

    <!-- Slimscroll Plugin Js -->
    <script src="../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>

    <!-- Bootstrap Colorpicker Js -->
    <script src="../plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js"></script>

    <!-- Dropzone Plugin Js -->
    <script src="../plugins/dropzone/dropzone.js"></script>

    <!-- Input Mask Plugin Js -->
    <script src="../plugins/jquery-inputmask/jquery.inputmask.bundle.js"></script>

    <!-- Multi Select Plugin Js -->
    <script src="../plugins/multi-select/js/jquery.multi-select.js"></script>

    <!-- Jquery Spinner Plugin Js -->
    <script src="../plugins/jquery-spinner/js/jquery.spinner.js"></script>

    <!-- Bootstrap Tags Input Plugin Js -->
    <script src="../plugins/bootstrap-tagsinput/bootstrap-tagsinput.js"></script>

    <!-- noUISlider Plugin Js -->
    <script src="../plugins/nouislider/nouislider.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="../plugins/node-waves/waves.js"></script>

    <!-- SweetAlert Plugin Js -->
    <script src="../plugins/sweetalert/sweetalert.min.js"></script>

    <!-- Jquery DataTable Plugin Js -->
    <script src="../plugins/jquery-datatable/jquery.dataTables.js"></script>
    <script src="../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
    <script src="../plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
    <script src="../plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
    <script src="../plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
    <script src="../plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
    <script src="../plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
    <script src="../plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
    <script src="../plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>

    <!-- Jquery CountTo Plugin Js -->
    <script src="../plugins/jquery-countto/jquery.countTo.js"></script>

    <!-- Morris Plugin Js -->
    <script src="../plugins/raphael/raphael.min.js"></script>
    <script src="../plugins/morrisjs/morris.js"></script>

    <!-- ChartJs -->
    <script src="../plugins/chartjs/Chart.bundle.js"></script>

    <!-- Flot Charts Plugin Js -->
    <script src="../plugins/flot-charts/jquery.flot.js"></script>
    <script src="../plugins/flot-charts/jquery.flot.resize.js"></script>
    <script src="../plugins/flot-charts/jquery.flot.pie.js"></script>
    <script src="../plugins/flot-charts/jquery.flot.categories.js"></script>
    <script src="../plugins/flot-charts/jquery.flot.time.js"></script>

    <!-- Autosize Plugin Js -->
    <script src="../plugins/autosize/autosize.js"></script>

    <!-- Moment Plugin Js -->
    <script src="../plugins/momentjs/moment.js"></script>

    <!-- Bootstrap Material Datetime Picker Plugin Js -->
    <script src="../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>

    <!-- Sparkline Chart Plugin Js -->
    <script src="../plugins/jquery-sparkline/jquery.sparkline.js"></script>

    <!-- Custom Js -->
    <script src="../js/pages/inicio.js"></script>
    <script src="../js/admin.js"></script>
    <script src="../js/pages/index.js"></script>

    <!-- Demo Js -->
    <script src="../js/demo.js"></script>
</body>

</html>