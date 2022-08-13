import { useEffect, useState } from 'react';

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

const getDateDiff = timestamp => {
  const now = Date.now();
  const elapsed = (timestamp - now) / 1000;
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit);
      return { value, unit };
    }
  }
};

const useTimeAgo = timestamp => {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiff(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getDateDiff(timestamp));
    }, 5000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' });
  const { value, unit } = timeAgo;
  return rtf.format(value, unit);
};

export default useTimeAgo;
