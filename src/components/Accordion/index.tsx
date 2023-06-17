import { useState } from 'react';
import IconExpand from '../../assets/expand.svg';
import IconStar from '../../assets/star.svg';
import { EError, IRepo } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';
import './style.scss';
import { truncateChar } from '../../utils';
import { handleApiRateLimit } from '../../utils/api';
import ErrorBox from '../ErrorBox';

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
    queryFn: async () => {
      const res = await fetch(repoUrl);
      const data = await res.json();

      if (!data) {
        throw new Error(EError.FETCH_ERROR)
      }

      handleApiRateLimit(data, () => {
        throw new Error(EError.RATE_LIMIT)
      })
      return data;
    }
  })

  const handleArrowClick = () => {
    return setShowChildren((prev) => !prev)
  }

  const childrenElem = (() => {
    if (isSuccess && !isLoading) {
      return (
        <div className="children">
          {repoData.map((repo) => (
            <div className="children__item" key={repo.id}>
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
          ))}
        </div>
      )
    }

    return <ErrorBox error={error} />
  })()


  return (
    <>
      <div className="accordion">
        <span className="accordion__title">
          {title}
        </span>

        <img
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