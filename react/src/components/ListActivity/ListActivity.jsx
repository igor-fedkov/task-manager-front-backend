import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';

import s from './ListActivity.module.scss';

function ListActivity({ activity }) {
  const [isActivityShow, setIsActivityShow] = useState(false);

  const displayedActivity = isActivityShow ? activity : [];

  const onToggleShowActivity = useCallback(() => {
    setIsActivityShow(state => !state);
  }, []);
  
  return (
    <div className={s.container}>
      <p className={s.activityTitle}>
        <span className={`material-icons-outlined ${s.activityIcon}`}>
          timeline
        </span>
        Activity
        <Button
          onClick={onToggleShowActivity}
          className={s.btnToggleActivity}
          variant="link"
        >
          {isActivityShow ? 'Hide Details' : 'Show Details'}
        </Button>
      </p>
      <ul className={s.list}>
        {displayedActivity.map(({ id, userEmail, actionType, objTitle, pretext, endPointTitle, howLongAgo }) =>
          <li key={id} className={s.listItem}>
            <div className={s.logoAndActionContainer}>
              <div className={s.userLogo}>{userEmail[0].toUpperCase()}</div>
              <p className={s.action}>
                <span className={s.userEmail}>{userEmail}</span>
                <span>{actionType}</span>
                {objTitle && <span className={s.objTitle}>{objTitle}</span>}
                {pretext && <span className={s.pretext}>{pretext}</span>}
                {endPointTitle && <span className={s.endPointTitle}>{endPointTitle}</span>}            
              </p>
            </div>

            <p className={s.howLongAgo}>{howLongAgo}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ListActivity;