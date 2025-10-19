import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Skeleton } from "@/shared/components/ui/skeleton.tsx";
import { Layout } from "./Layout.tsx";

const AuthRoutes = lazy(() => import("../modules/auth/routes/index.tsx"));
const DashboardRoutes = lazy(() =>
  import("../modules/dashboard/routes/index.tsx")
);
const EmployeeRoutes = lazy(() =>
  import("../modules/employees/routes/index.tsx")
);
const TimesheetRoutes = lazy(() =>
  import("../modules/timesheets/routes/index.tsx")
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/auth/*"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full w-full">
                    <div className="flex flex-col space-y-3 ">
                      <Skeleton className="h-[225px] w-[400px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-10 w-[400px]" />
                        <Skeleton className="h-10 w-[250px]" />
                      </div>
                    </div>
                  </div>
                }
              >
                <AuthRoutes />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full w-full">
                    <div className="flex flex-col space-y-3 ">
                      <Skeleton className="h-[225px] w-[400px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-10 w-[400px]" />
                        <Skeleton className="h-10 w-[250px]" />
                      </div>
                    </div>
                  </div>
                }
              >
                <DashboardRoutes />
              </Suspense>
            }
          />
          <Route
            path="employees/*"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full w-full">
                    <div className="flex flex-col space-y-3 ">
                      <Skeleton className="h-[225px] w-[400px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-10 w-[400px]" />
                        <Skeleton className="h-10 w-[250px]" />
                      </div>
                    </div>
                  </div>
                }
              >
                <EmployeeRoutes />
              </Suspense>
            }
          />
          <Route
            path="timesheets/*"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full w-full">
                    <div className="flex flex-col space-y-3 ">
                      <Skeleton className="h-[225px] w-[400px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-10 w-[400px]" />
                        <Skeleton className="h-10 w-[250px]" />
                      </div>
                    </div>
                  </div>
                }
              >
                <TimesheetRoutes />
              </Suspense>
            }
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
