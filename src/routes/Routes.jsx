import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Home";

// AUTH
import Login from "../Pages/auth/Login";

// WORK VISA
import WorkVisa from "../Pages/work-visa/WorkVisa";
import WpGreece from "../Pages/work-visa/WpGreece";
import WpNorthMacedonia from "../Pages/work-visa/WpNorthMacedonia";
import WpPortugal from "../Pages/work-visa/WpPortugal";
import WpPoland from "../Pages/work-visa/WpPoland";
import WpSerbia from "../Pages/work-visa/WpSerbia";
import WpMontenegro from "../Pages/work-visa/WpMontenegro";
import WpCroatia from "../Pages/work-visa/WpCroatia";

// STUDENT VISA
import StudentVisa from "../Pages/student-visa/StudentVisa";
import StvAustralia from "../Pages/student-visa/StvAustralia";
import StvNewZealand from "../Pages/student-visa/StvNewZealand";
import StvUK from "../Pages/student-visa/StvUK";
import StvUSA from "../Pages/student-visa/StvUSA";
import StvCanada from "../Pages/student-visa/StvCanada";
import StvMalaysia from "../Pages/student-visa/StvMalaysia";

// STUDENT VISA EUROPE
import StvItaly from "../Pages/student-visa/europe/StvItaly";
import StvMalta from "../Pages/student-visa/europe/StvMalta";
import StvHungary from "../Pages/student-visa/europe/StvHungary";
import StvDenmark from "../Pages/student-visa/europe/StvDenmark";
import StvEstonia from "../Pages/student-visa/europe/StvEstonia";
import StvFrance from "../Pages/student-visa/europe/StvFrance";
import StvNetherlands from "../Pages/student-visa/europe/StvNetherlands";
import StvLithuania from "../Pages/student-visa/europe/StvLithuania";
import StvPoland from "../Pages/student-visa/europe/StvPoland";
import StvRomania from "../Pages/student-visa/europe/StvRomania";
import StvSweden from "../Pages/student-visa/europe/StvSweden";
import StvGermany from "../Pages/student-visa/europe/StvGermany";

// VISIT VISA
import VisitVisa from "../Pages/visit-visa/VisitVisa";
import VisitUSA from "../Pages/visit-visa/VisitUSA";
import VisitCanada from "../Pages/visit-visa/VisitCanada";
import VisitAustralia from "../Pages/visit-visa/VisitAustralia";
import VisitNewZealand from "../Pages/visit-visa/VisitNewZealand";
import VisitFrance from "../Pages/visit-visa/VisitFrance";
import VisitGermany from "../Pages/visit-visa/VisitGermany";
import VisitGreece from "../Pages/visit-visa/VisitGreece";
import VisitItaly from "../Pages/visit-visa/VisitItaly";
import VisitNetherlands from "../Pages/visit-visa/VisitNetherlands";
import VisitSwitzerland from "../Pages/visit-visa/VisitSwitzerland";
import VisitAustria from "../Pages/visit-visa/VisitAustria";
import VisitTurkey from "../Pages/visit-visa/VisitTurkey";
import VisitUK from "../Pages/visit-visa/VisitUK";
import VisitSpain from "../Pages/visit-visa/VisitSPain";
import PrivateRoute from "../Pages/auth/PrivateRoute";
import WpBulgaria from "../Pages/work-visa/WpBulgaria";
import WpCyprus from "../Pages/work-visa/WpCyprus";
import ClientForm from "../components/forms/ClientForm";
import PaymentTerms from "../Pages/visit-visa/PaymentTerms";
import ClientInfo from "../components/forms/ClientInfo";
import ClientDetails from "../components/forms/ClientDetails";
import EditClient from "../components/forms/EditClient";
import AddVisitor from "../Pages/visitor/AddVisitor";
import VisitorList from "../Pages/visitor/VisitorList";
import Dashboard from "../components/layout/Dashboard";
import AdminRoute from "../Pages/auth/AdminRoute";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // Protected Home
      { index: true, element: <PrivateRoute><Home /></PrivateRoute> },

      // Login page (public)
      { path: "login", element: <Login /> },

      // Work Visa
      { path: "work-visa", element: <PrivateRoute><WorkVisa /></PrivateRoute> },
      { path: "work-visa/greece", element: <PrivateRoute><WpGreece /></PrivateRoute> },
      { path: "work-visa/portugal", element: <PrivateRoute><WpPortugal /></PrivateRoute> },
      { path: "work-visa/poland", element: <PrivateRoute><WpPoland /></PrivateRoute> },
      { path: "work-visa/cyprus", element: <PrivateRoute><WpCyprus /></PrivateRoute> },
      { path: "work-visa/serbia", element: <PrivateRoute><WpSerbia /></PrivateRoute> },
      { path: "work-visa/north-macedonia", element: <PrivateRoute><WpNorthMacedonia /></PrivateRoute> },
      { path: "work-visa/montenegro", element: <PrivateRoute><WpMontenegro /></PrivateRoute> },
      { path: "work-visa/croatia", element: <PrivateRoute><WpCroatia /></PrivateRoute> },
      { path: "work-visa/bulgaria", element: <PrivateRoute><WpBulgaria /></PrivateRoute> },

      // Student Visa
      // { path: "student-visa", element: <PrivateRoute><StudentVisa /></PrivateRoute> },
      { path: "student-visa", element: <PrivateRoute><StudentVisa /></PrivateRoute> },
      { path: "student-visa/australia", element: <PrivateRoute><StvAustralia /></PrivateRoute> },
      { path: "student-visa/new-zealand", element: <PrivateRoute><StvNewZealand /></PrivateRoute> },
      { path: "student-visa/uk", element: <PrivateRoute><StvUK /></PrivateRoute> },
      { path: "student-visa/usa", element: <PrivateRoute><StvUSA /></PrivateRoute> },
      { path: "student-visa/canada", element: <PrivateRoute><StvCanada /></PrivateRoute> },
      { path: "student-visa/malaysia", element: <PrivateRoute><StvMalaysia /></PrivateRoute> },

      // Student Visa Europe
      { path: "student-visa/italy", element: <PrivateRoute><StvItaly /></PrivateRoute> },
      { path: "student-visa/malta", element: <PrivateRoute><StvMalta /></PrivateRoute> },
      { path: "student-visa/hungary", element: <PrivateRoute><StvHungary /></PrivateRoute> },
      { path: "student-visa/denmark", element: <PrivateRoute><StvDenmark /></PrivateRoute> },
      { path: "student-visa/estonia", element: <PrivateRoute><StvEstonia /></PrivateRoute> },
      { path: "student-visa/france", element: <PrivateRoute><StvFrance /></PrivateRoute> },
      { path: "student-visa/germany", element: <PrivateRoute><StvGermany /></PrivateRoute> },
      { path: "student-visa/lithuania", element: <PrivateRoute><StvLithuania /></PrivateRoute> },
      { path: "student-visa/netherlands", element: <PrivateRoute><StvNetherlands /></PrivateRoute> },
      { path: "student-visa/poland", element: <PrivateRoute><StvPoland /></PrivateRoute> },
      { path: "student-visa/romania", element: <PrivateRoute><StvRomania /></PrivateRoute> },
      { path: "student-visa/sweden", element: <PrivateRoute><StvSweden /></PrivateRoute> },

      // Visit Visa
      { path: "visit-visa/payment-terms", element: <PrivateRoute><PaymentTerms /></PrivateRoute> },
      { path: "visit-visa", element: <PrivateRoute><VisitVisa /></PrivateRoute> },
      { path: "visit-visa/usa", element: <PrivateRoute><VisitUSA /></PrivateRoute> },
      { path: "visit-visa/canada", element: <PrivateRoute><VisitCanada /></PrivateRoute> },
      { path: "visit-visa/australia", element: <PrivateRoute><VisitAustralia /></PrivateRoute> },
      { path: "visit-visa/new-zealand", element: <PrivateRoute><VisitNewZealand /></PrivateRoute> },
      { path: "visit-visa/france", element: <PrivateRoute><VisitFrance /></PrivateRoute> },
      { path: "visit-visa/germany", element: <PrivateRoute><VisitGermany /></PrivateRoute> },
      { path: "visit-visa/greece", element: <PrivateRoute><VisitGreece /></PrivateRoute> },
      { path: "visit-visa/italy", element: <PrivateRoute><VisitItaly /></PrivateRoute> },
      { path: "visit-visa/netherlands", element: <PrivateRoute><VisitNetherlands /></PrivateRoute> },
      { path: "visit-visa/spain", element: <PrivateRoute><VisitSpain /></PrivateRoute> },
      { path: "visit-visa/switzerland", element: <PrivateRoute><VisitSwitzerland /></PrivateRoute> },
      { path: "visit-visa/austria", element: <PrivateRoute><VisitAustria /></PrivateRoute> },
      { path: "visit-visa/turkey", element: <PrivateRoute><VisitTurkey /></PrivateRoute> },
      { path: "visit-visa/uk", element: <PrivateRoute><VisitUK /></PrivateRoute> },

      // // FORMS
      { path: "client-form", element: <PrivateRoute><ClientForm /></PrivateRoute> },
      { path: "client-info", element: <PrivateRoute> <ClientInfo /></PrivateRoute> },
      { path: "client-details/:id", element: <PrivateRoute><ClientDetails /></PrivateRoute> },
      { path: "edit-client/:id", element: <PrivateRoute><EditClient /></PrivateRoute> },
      { path: "add-new-visitor", element: <PrivateRoute><AddVisitor /></PrivateRoute> },
      { path: "visitor-list", element: <PrivateRoute><VisitorList /></PrivateRoute> },
      // CHECK 

      // DASHBOARD
      { path: "dashboard", element: <AdminRoute><Dashboard /></AdminRoute> },




    ],
  },
]);

export default router; 