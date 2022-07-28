import React from 'react';
import { Link } from 'react-router-dom';

import { Page } from '../../components/Page/Page';
import {ROUTES} from "../../common/routes";

const pageNotFoundMeta = 'Page Not Found';
const PageNotFound = (): JSX.Element => {
  return (
    <Page description={pageNotFoundMeta} keywords={pageNotFoundMeta} title={pageNotFoundMeta}>
      <h3>
        Page not found
      </h3>
      <p>
        The page you are looking for might have been removed had its name changed or is temporary
        unavailable.
      </p>
      <Link to={ROUTES.HOME}>
        Go Back Home
      </Link>
    </Page>
  );
};

export default PageNotFound;
