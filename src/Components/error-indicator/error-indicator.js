import React from 'react';

const ErrorIndicator = () => {
  return (
    <div>
      <span>
        Stop, evil shaman, the{' '}
        <a href='https://docs.github.com/en/rest/reference/search#rate-limit'>
          API
        </a>{' '}
        has a limit request per minute.
      </span>
    </div>
  );
};

export default ErrorIndicator;
