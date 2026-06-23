import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainLayout from "../layouts/MainLayout";

// Lazy-loaded pages
const HomePage = lazy(() => import("../../features/home/pages/HomePage"));
const AboutPage = lazy(() => import("../../features/home/pages/AboutPage"));
const ProductsPage = lazy(() => import("../../features/products/pages/ProductsPage"));
const MediaPage = lazy(() => import("../../features/support/pages/MediaPage"));
const WeatherPage = lazy(() => import("../../features/weather/pages/WeatherPage"));
const SchemesPage = lazy(() => import("../../features/schemes/pages/SchemesPage"));
const SchemeDetailPage = lazy(() => import("../../features/schemes/pages/SchemeDetailPage"));
const FaqPage = lazy(() => import("../../features/support/pages/FaqPage"));
const ConnectPage = lazy(() => import("../../features/support/pages/ConnectPage"));

interface TranslatedSuspenseProps {
  children: React.ReactNode;
  fallbackKey: string;
}

const TranslatedSuspense: React.FC<TranslatedSuspenseProps> = ({ children, fallbackKey }) => {
  const { t } = useTranslation("common");
  return (
    <Suspense fallback={<div className="panel">{t(fallbackKey)}</div>}>
      {children}
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <TranslatedSuspense fallbackKey="loadingHome">
            <HomePage />
          </TranslatedSuspense>
        ),
      },
      {
        path: "about",
        element: (
          <TranslatedSuspense fallbackKey="loadingAbout">
            <AboutPage />
          </TranslatedSuspense>
        ),
      },
      {
        path: "products",
        element: (
          <TranslatedSuspense fallbackKey="loadingProducts">
            <ProductsPage />
          </TranslatedSuspense>
        ),
      },
      {
        path: "media",
        element: (
          <TranslatedSuspense fallbackKey="loadingMedia">
            <MediaPage />
          </TranslatedSuspense>
        ),
      },
      {
        path: "weather",
        element: (
          <TranslatedSuspense fallbackKey="loadingWeather">
            <WeatherPage />
          </TranslatedSuspense>
        ),
      },
      {
        path: "schemes",
        element: (
          <TranslatedSuspense fallbackKey="loadingSchemes">
            <SchemesPage />
          </TranslatedSuspense>
        ),
      },
      {
        path: "schemes/:slug",
        element: (
          <TranslatedSuspense fallbackKey="loadingSchemeDetail">
            <SchemeDetailPage />
          </TranslatedSuspense>
        ),
      },
      {
        path: "faq",
        element: (
          <TranslatedSuspense fallbackKey="loadingFaq">
            <FaqPage />
          </TranslatedSuspense>
        ),
      },
      {
        path: "contact",
        element: (
          <TranslatedSuspense fallbackKey="loadingContact">
            <ConnectPage />
          </TranslatedSuspense>
        ),
      },
    ],
  },
]);

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};
export default AppRoutes;
