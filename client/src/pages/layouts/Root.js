import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalAlert from "../../components/alerts/GlobalAlert";
import QuickMessage from "../../components/modals/QuickMessage";
import Loader from "../../config/Loader";
import ExamsHome from "../examination/ExamsHome";
import ExamsLevel from "../examination/ExamsLevel";
import FeeNew from "../fees/FeeNew";
import AddSession from "../session/AddSession";
import SMSHome from "../sms/SMSHome";
import SMSNew from "../sms/SMSNew";
import User from "../user";
import UserHome from "../user/UserHome";
// import Assessment from "../Assessment";

const Fees = lazy(() => import("../fees"));
const Examination = lazy(() => import("../examination"));
const Student = lazy(() => import("../student"));
const Teacher = lazy(() => import("../teacher"));
const Report = lazy(() => import("../report"));
const Dashboard = lazy(() => import("../Dashboard"));
const SMS = lazy(() => import("../sms"));
//
const StudentHome = lazy(() => import("../student/StudentHome"));
const StudentAdd = lazy(() => import("../student/StudentAdd"));
const StudentEdit = lazy(() => import("../student/StudentEdit"));
const StudentView = lazy(() => import("../student/StudentView"));

const TeacherHome = lazy(() => import("../teacher/TeacherHome"));
const About = lazy(() => import("../About"));
const Settings = lazy(() => import("../Settings"));
const PageNotFound = lazy(() => import("../404"));
const SchoolSession = lazy(() => import("../SchoolSession"));
const StudentAcademicsReport = lazy(() =>
  import("../student/StudentAcademicsReport")
);
const StudentFeesReport = lazy(() => import("../student/StudentFeesReport"));
const PrintPage = lazy(() => import("../print"));
const FeesReportPrintPage = lazy(() => import("../print/FeesReportPrintPage"));
const Session = lazy(() => import("../session"));
const FeeHome = lazy(() => import("../fees/FeeHome"));
const FeeMakePayment = lazy(() => import("../fees/FeeMakePayment"));
const FeeHistory = lazy(() => import("../fees/FeeHistory"));
const FeeSettings = lazy(() => import("../fees/FeeSettings"));
const Level = lazy(() => import("../level"));
const LevelDashboard = lazy(() => import("../level/LevelDashboard"));
//const AddStudentModal = lazy(() => import("../level/AddStudentModal"));
const CurrentLevel = lazy(() => import("../level/CurrentLevel"));
const StudentProfileReport = lazy(() =>
  import("../student/StudentProfileReport")
);

const Root = () => {
  return (
    <>
      <GlobalAlert />
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <SchoolSession />
            </Suspense>
          }
          path="/school-session"
        />
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Session />
            </Suspense>
          }
          path="/session"
        />

        {/* Class and Subjects */}
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Level />
            </Suspense>
          }
          path="level"
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <LevelDashboard />
              </Suspense>
            }
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <CurrentLevel />
              </Suspense>
            }
            path="current/:id/:type"
          />
          {/* <Route
          element={
            <Suspense fallback={<Loader />}>
              <AddStudentModal />
            </Suspense>
          }
          path="student/new"
        /> */}
        </Route>

        {/* Student */}
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Student />
            </Suspense>
          }
          path="/student"
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <StudentHome />
              </Suspense>
            }
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <StudentAdd />
              </Suspense>
            }
            path="new"
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <StudentEdit />
              </Suspense>
            }
            path="edit"
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <StudentView />
              </Suspense>
            }
            path="view"
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <StudentProfileReport />
              </Suspense>
            }
            path="profile/:id/:type/:studentId"
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <StudentAcademicsReport />
              </Suspense>
            }
            path="exam/:examsId"
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <StudentFeesReport />
              </Suspense>
            }
            path="fee/:studentId"
          />
        </Route>

        {/* Teacher */}
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Teacher />
            </Suspense>
          }
          path="/teacher"
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <TeacherHome />
              </Suspense>
            }
          />
        </Route>

        {/* Fees */}
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Fees />
            </Suspense>
          }
          path="/fee"
        >
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <FeeHome />
              </Suspense>
            }
            index
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <FeeNew />
              </Suspense>
            }
            path="new"
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <FeeMakePayment />
              </Suspense>
            }
            path="payment"
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <FeeHistory />
              </Suspense>
            }
            path="history"
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <FeeSettings />
              </Suspense>
            }
            path="settings"
          />
        </Route>
        {/* <Route element={<Suspense><Assessment /></Suspense>} path="/assessment" /> */}
        {/* Examination */}
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Examination />
            </Suspense>
          }
          path="/examination"
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <ExamsHome />
              </Suspense>
            }
          />

          <Route path="level/:levelId" element={<ExamsLevel />} />
        </Route>
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Report />
            </Suspense>
          }
          path="/report"
        />

        {/* printing */}
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <PrintPage />
            </Suspense>
          }
          path="/print"
        >
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <FeesReportPrintPage />
              </Suspense>
            }
            path="fees"
          />
        </Route>

        <Route
          element={
            <Suspense fallback={<Loader />}>
              <SMS />
            </Suspense>
          }
          path="/sms"
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <SMSHome />
              </Suspense>
            }
          />
          <Route
            path="new"
            element={
              <Suspense fallback={<Loader />}>
                <SMSNew />
              </Suspense>
            }
          />
        </Route>

        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Settings />
            </Suspense>
          }
          path="/settings"
        />

        <Route
          element={
            <Suspense fallback={<Loader />}>
              <User />
            </Suspense>
          }
          path="/users"
        >
          <Route index element={<UserHome />} />
        </Route>
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <About />
            </Suspense>
          }
          path="/about"
        />

        <Route
          element={
            <Suspense fallback={<Loader />}>
              <PageNotFound />
            </Suspense>
          }
          path="*"
        />
      </Routes>
      <QuickMessage />
      <AddSession />
    </>
  );
};

export default Root;
