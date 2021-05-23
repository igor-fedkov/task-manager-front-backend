import s from './CommentsList.module.scss';

function CommentsList({ comments }) {

  return (
    <ul className={s.list}>
      {comments.map(({ id, owner: { email }, text }) =>
        <li key={id} className={s.listItem}>
          <div className={s.userLogo}>{email[0].toUpperCase()}</div>
          <p className={s.comment}>{text}</p>
        </li>
      )}
    </ul>
  )
}

export default CommentsList;