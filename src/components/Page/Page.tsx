import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import {app} from "../../common/constants";

interface PageProps {
  description: string;
  elements?: React.ReactNode;
  keywords?: string;
  title: string;
}

export const Page = ({
  children,
  description,
  elements,
  keywords,
  title
}: React.PropsWithChildren<PageProps>): JSX.Element => (
  <HelmetProvider>
    <Helmet defaultTitle={app.name} titleTemplate={`${app.name} | %s`}>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <title>{title}</title>
      {elements}
    </Helmet>
     {children}
  </HelmetProvider>
);
