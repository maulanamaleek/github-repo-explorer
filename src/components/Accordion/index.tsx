import { useState } from 'react';

import IconExpand from '../../assets/expand.svg';
import IconStar from '../../assets/star.svg';
import { IRepo } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';
import { truncateChar } from '../../utils';
import { getRepo } from '../../utils/api';
import ErrorBox from '../ErrorBox';
import './style.scss';

interface IAccordionProps {
  title: string;
  repoUrl: string;
}

const Accordion = ({
  title,
  repoUrl,
}: IAccordionProps) => {
  const [showChildren, setShowChildren] = useState(false);
  const {
    data: repoData,
    isSuccess,
    error,
    isLoading
  } = useQuery<IRepo[]>({
    queryKey: [QUERY_KEY.GITHUB_REPO, repoUrl],
    queryFn: () => getRepo(repoUrl)
  })

  const handleArrowClick = () => {
    return setShowChildren((prev) => !prev)
  }

  const handleRepoNavigation = (name: string, url: string) => {
    if (confirm(`Navigate to ${name} github repository?`)) {
      window.open(url, '_blank');
    }
  }

  const childrenElem = (() => {
    if (isSuccess && !isLoading) {
      const repoListElem = repoData.map((repo) => (
        <div
          onClick={() => handleRepoNavigation(repo.full_name, repo.html_url)}
          className="children__item"
          key={repo.id}
        >
          <div className="children__item__header">
            <h5>{repo.name}</h5>

            <div className="children__item__star-container">
              <img
                src={IconStar}
                className="children__item__star-img"
                alt="star"
              />

              <span>{repo.stargazers_count}</span>
            </div>
          </div>

          {/* Limit to 300 char max */}
          <p>{truncateChar(repo.description, 300)}</p>
        </div>
      ))

      return (
        <div
          data-testid="accordion-children"
          className="children"
        >
          {repoData.length ?
            repoListElem
            : (
              <ErrorBox customMessage={`No repository found for user: ${title}`} />
            )
          }
        </div>
      )
    }

    return <ErrorBox error={error} />
  })()


  return (
    <>
      <div data-testid="accordion" className="accordion">
        <span className="accordion__title">
          {title}
        </span>

        <img
          data-testid="accordion-icon"
          onClick={handleArrowClick}
          className={`accordion__icon ${showChildren ? 'rotated' : ''}`}
          src={IconExpand}
          alt="expand"
        />
      </div>

      {showChildren && childrenElem}
    </>
  )
}

export default Accordion