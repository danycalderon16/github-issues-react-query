import { Link, useNavigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { useIssue } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';

export const IssueView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {id = 0} = params;	
  const {issueQuery, commentsQuery} = useIssue(+id);

  if(issueQuery.isLoading){
    return (<LoadingIcon/>)
  }

  if(issueQuery.data === undefined){
    navigate("/");
  }
  
  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list'>Go Back</Link>
      </div>

      <IssueComment issue={ issueQuery.data! } />

{
  commentsQuery.isLoading && <LoadingIcon/>
}
      {
        commentsQuery.data?.map(comment => (
          <IssueComment issue={comment} key={comment.id}/>
        ))
      }
    </div>
  )
}
