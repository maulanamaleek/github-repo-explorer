import IconExpand from '../../assets/expand.svg';
import './style.scss';

interface IAccordionProps {
  title: string;

  // TODO: define child type
  child: any[];
}

const Accordion = ({
  title,
  child
}: IAccordionProps) => {
  return (
    <div className="accordion">
      <span className="accordion__title">
        {title}
      </span>

      <img className="accordion__expand" src={IconExpand} alt="expand" />
    </div>
  )
}

export default Accordion