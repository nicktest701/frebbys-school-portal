import React from "react";

import { Chart, registerables } from "chart.js";
import Root from "./pages/layouts/Root";
import ThemeProvider from "./theme";
import StudentProvider from "./context/providers/StudentProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SchoolSessionProvider from "./context/providers/SchoolSessionProvider";
import Scrollbars from "react-custom-scrollbars";
import TeacherProvider from "./context/providers/TeacherProvider";

Chart.register(...registerables);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        networkMode: "offlineFirst",
      },
      queries: {
        networkMode: "offlineFirst",
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SchoolSessionProvider>
          <TeacherProvider>
            <StudentProvider>
              <Scrollbars>
                <Root />
              </Scrollbars>
            </StudentProvider>
          </TeacherProvider>
        </SchoolSessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
