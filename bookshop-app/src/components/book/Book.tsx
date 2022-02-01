import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router';

const RemoteApp = React.lazy(() => import("app2/App"));

function Book() {

  let { bookId } = useParams();

  return (
    <div>
      <Suspense fallback={"loading..."}>
        <RemoteApp bookId={bookId} />
      </Suspense>
    </div>
  );
}

export default Book;