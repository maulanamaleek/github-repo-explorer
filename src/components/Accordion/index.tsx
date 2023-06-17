import { useState } from 'react';
import IconExpand from '../../assets/expand.svg';
import IconStar from '../../assets/star.svg';
import { IRepo } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';
import './style.scss';
import { truncateChar } from '../../utils';
import { handleApiRateLimit } from '../../utils/api';

interface IAccordionProps {
  title: string;
  repoUrl: string;
}

const Accordion = ({
  title,
  repoUrl,
}: IAccordionProps) => {
  const {
    data: repoData,
    isError,
    error,
    isLoading
  } = useQuery<IRepo[]>({
    queryKey: [QUERY_KEY.GITHUB_REPO, repoUrl],
    queryFn: async () => {
      const res = await fetch(repoUrl);
      const data = await res.json();

      if (!data) {
        throw new Error('Request Failed');
      }

      handleApiRateLimit(data, () => {
        throw new Error('Rate Limited')
      })
      return data;
    }
  })
  const [showChildren, setShowChildren] = useState(false);

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>{`${error}`}</h1>
  }


  return (
    <>
      <div className="accordion">
        <span className="accordion__title">
          {title}
        </span>

        <img
          onClick={() => setShowChildren((prev) => !prev)}
          className="accordion__expand"
          src={IconExpand}
          alt="expand"
        />
      </div>

      {showChildren && (
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
      )}
    </>
  )
}

export default Accordion